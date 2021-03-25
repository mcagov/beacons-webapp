import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  Redirect,
} from "next";
import { FormJSON, FormManager } from "./form/formManager";
import { CacheEntry } from "./formCache";
import {
  BeaconsContext,
  getCache,
  parseFormData,
  updateFormCache,
  withCookieRedirect,
} from "./middleware";
import { Registration } from "./registration/registration";

type TransformCallback = (formData: CacheEntry) => CacheEntry;

type SuccessfulPostCallback = (
  formData: CacheEntry
) => { redirect: Partial<Redirect> };

export type FormManagerFactory = (formData: CacheEntry) => FormManager;

export interface FormPageProps {
  form: FormJSON;
  showCookieBanner?: boolean;
  submissionId?: string;
}

export const handlePageRequest = (
  destinationIfValid: string,
  formManagerFactory: FormManagerFactory,
  transformCallback: TransformCallback = (formData: CacheEntry) => formData,
  onSuccessfulPostCallback: SuccessfulPostCallback = () => {
    return { redirect: { status: 303, destination: destinationIfValid } };
  }
): GetServerSideProps =>
  withCookieRedirect(async (context: GetServerSidePropsContext) => {
    const userDidSubmitForm = context.req.method === "POST";

    if (userDidSubmitForm) {
      return handlePostRequest(
        context,
        formManagerFactory,
        transformCallback,
        onSuccessfulPostCallback
      );
    }

    return handleGetRequest(context, formManagerFactory);
  });

const handleGetRequest = (
  context: BeaconsContext,
  formManagerFactory: FormManagerFactory
): GetServerSidePropsResult<FormPageProps> => {
  const registration: Registration = getCache(context.submissionId);
  const flattenedRegistration = registration.getFlattenedRegistration({
    useIndex: parseInt(context.query.useIndex as string),
  });
  const formManager = formManagerFactory(flattenedRegistration);

  return {
    props: {
      form: formManager.serialise(),
      showCookieBanner: context.showCookieBanner,
      submissionId: context.submissionId,
    },
  };
};

const handlePostRequest = async (
  context: BeaconsContext,
  formManagerFactory: FormManagerFactory,
  transformCallback: TransformCallback = (formData) => formData,
  onSuccessfulFormPostCallback
): Promise<GetServerSidePropsResult<FormPageProps>> => {
  const transformedFormData = transformCallback(
    await parseFormData(context.req)
  );
  updateFormCache(context.req.cookies, transformedFormData);

  const formManager = formManagerFactory(transformedFormData);
  formManager.markAsDirty();
  const formIsValid = !formManager.hasErrors();

  if (formIsValid) {
    return onSuccessfulFormPostCallback(transformedFormData);
  }

  return {
    props: {
      form: formManager.serialise(),
      showCookieBanner: context.showCookieBanner,
      submissionId: context.submissionId,
    },
  };
};

function successfulRedirectCallback(destinationIfValid: string) {
  return {
    redirect: {
      statusCode: 303,
      destination: destinationIfValid,
    },
  };
}
