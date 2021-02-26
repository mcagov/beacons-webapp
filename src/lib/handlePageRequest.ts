import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { NextApiRequestCookies } from "next/dist/next-server/server/api-utils";
import { fieldValidatorLookup } from "./field-validators";
import { CacheEntry } from "./formCache";
import { FormValidator, Validator } from "./formValidator";
import {
  getCache,
  parseFormData,
  updateFormCache,
  withCookieRedirect,
} from "./middleware";

type TransformFunction = (formData: CacheEntry) => CacheEntry;

export interface FormPageProps {
  formData: CacheEntry;
  needsValidation: boolean;
}

export const handlePageRequest = (
  destinationIfValid: string,
  formRules: Record<string, Validator> = fieldValidatorLookup,
  transformFunction: TransformFunction = (formData) => formData
): GetServerSideProps =>
  withCookieRedirect(async (context: GetServerSidePropsContext) => {
    const userDidSubmitForm = context.req.method === "POST";

    if (userDidSubmitForm) {
      return handlePostRequest(
        context,
        destinationIfValid,
        transformFunction,
        formRules
      );
    }

    return handleGetRequest(context.req.cookies);
  });

const handleGetRequest = (
  cookies: NextApiRequestCookies
): GetServerSidePropsResult<FormPageProps> => {
  return {
    props: {
      formData: getCache(cookies),
      needsValidation: false,
    },
  };
};

export const handlePostRequest = async (
  context: GetServerSidePropsContext,
  destinationIfValid: string,
  transformFunction: TransformFunction = (formData) => formData,
  formRules: Record<string, Validator>
): Promise<GetServerSidePropsResult<FormPageProps>> => {
  const transformedFormData = transformFunction(
    await parseFormData(context.req)
  );

  updateFormCache(context.req.cookies, transformedFormData);

  const formIsValid = !FormValidator.hasErrors(transformedFormData, formRules);

  if (formIsValid) {
    return {
      redirect: {
        statusCode: 303,
        destination: destinationIfValid,
      },
    };
  }

  return {
    props: {
      formData: transformedFormData,
      needsValidation: true,
    },
  };
};
