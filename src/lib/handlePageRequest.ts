import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { FormJSON, FormManager } from "./form/formManager";
import { CacheEntry } from "./formCache";
import {
  getCache,
  parseFormData,
  updateFormCache,
  withCookieRedirect,
} from "./middleware";
import { acceptRejectCookieId, formSubmissionCookieId } from "./types";

type TransformCallback = (formData: CacheEntry) => CacheEntry;

export type FormManagerFactory = (formData: CacheEntry) => FormManager;

export interface FormPageProps {
  form: FormJSON;
  showCookieBanner?: boolean;
  submissionId?: string;
}

export const handlePageRequest = (
  destinationIfValid: string,
  formManagerFactory: FormManagerFactory,
  transformCallback: TransformCallback = (formData: CacheEntry) => formData
): GetServerSideProps =>
  withCookieRedirect(async (context: GetServerSidePropsContext) => {
    const userDidSubmitForm = context.req.method === "POST";

    if (userDidSubmitForm) {
      return handlePostRequest(
        context,
        destinationIfValid,
        formManagerFactory,
        transformCallback
      );
    }

    return handleGetRequest(context, formManagerFactory);
  });

const handleGetRequest = (
  context: GetServerSidePropsContext,
  defineFormRulesCallback: FormManagerFactory
): GetServerSidePropsResult<FormPageProps> => {
  const submissionId = context.req.cookies[formSubmissionCookieId];
  const formManager = defineFormRulesCallback(getCache(submissionId));
  const showCookieBanner = !context.req.cookies[acceptRejectCookieId];

  return {
    props: {
      form: formManager.serialise(),
      showCookieBanner,
      submissionId,
    },
  };
};

const handlePostRequest = async (
  context: GetServerSidePropsContext,
  destinationIfValid: string,
  formManagerFactory: FormManagerFactory,
  transformCallback: TransformCallback = (formData) => formData
): Promise<GetServerSidePropsResult<FormPageProps>> => {
  const transformedFormData = transformCallback(
    await parseFormData(context.req)
  );

  updateFormCache(context.req.cookies, transformedFormData);

  const formManager = formManagerFactory(transformedFormData);
  formManager.markAsDirty();
  const formIsValid = !formManager.hasErrors();

  if (formIsValid) {
    return {
      redirect: {
        statusCode: 303,
        destination: destinationIfValid,
      },
    };
  }

  const showCookieBanner = !context.req.cookies[acceptRejectCookieId];
  const submissionId = context.req.cookies[formSubmissionCookieId];

  return {
    props: {
      form: formManager.serialise(),
      showCookieBanner,
      submissionId,
    },
  };
};
