// Mock module dependencies in getServerSideProps for testing handlePageRequest()
import { handlePageRequest } from "../../src/lib/handlePageRequest";

jest.mock("../../src/lib/middleware", () => ({
  __esModule: true,
  parseFormData: jest.fn().mockReturnValue({}),
  updateFormCache: jest.fn(),
  getCache: jest.fn().mockReturnValue({
    getFlattenedRegistration: jest.fn(),
  }),
  withCookieRedirect: jest.fn().mockImplementation((callback) => {
    return async (context) => {
      return callback(context);
    };
  }),
  decorateGetServerSidePropsContext: jest.fn().mockImplementation((context) => {
    context.submissionId = "id";

    return context;
  }),
}));

describe("handlePageRequest()", () => {
  let getFormGroup;
  let context;
  let formJSON;

  beforeEach(() => {
    getFormGroup = () => {
      return {
        markAsDirty: jest.fn(),
        hasErrors: jest.fn().mockReturnValue(false),
      };
    };

    formJSON = {
      hasErrors: false,
      errorSummary: [],
      fields: { hexId: { value: "1234", errorMessages: [] } },
    };

    context = {
      req: {
        method: "POST",
        cookies: {},
      },
      query: {},
    };
  });

  it("should should set the showCookieBanner to false if this is the value on the context object", async () => {
    context.req.method = "GET";
    context.showCookieBanner = false;
    getFormGroup = () => {
      return {
        serialise: jest.fn().mockReturnValue(formJSON),
      };
    };

    const response = await handlePageRequest("/", getFormGroup)(context);

    expect(response).toStrictEqual({
      props: {
        form: formJSON,
        showCookieBanner: false,
        submissionId: "id",
      },
    });
  });

  it("should redirect user to given next page on valid form submission", async () => {
    const nextPagePath = "/page-to-redirect-to-if-form-data-is-valid";
    const response = await handlePageRequest(
      nextPagePath,
      getFormGroup
    )(context);

    expect(response).toStrictEqual({
      redirect: {
        statusCode: 303,
        destination: nextPagePath,
      },
    });
  });

  it("should return the serialized form data on invalid form submission", async () => {
    context.showCookieBanner = true;
    getFormGroup = () => {
      return {
        markAsDirty: jest.fn(),
        hasErrors: jest.fn().mockReturnValue(true),
        serialise: jest.fn().mockReturnValue(formJSON),
      };
    };

    const response = await handlePageRequest("/", getFormGroup)(context);

    expect(response).toStrictEqual({
      props: {
        form: formJSON,
        showCookieBanner: true,
        submissionId: "id",
      },
    });
  });

  it("should return the cached formJSON when it receives a GET request", async () => {
    context.req.method = "GET";
    const nextPagePath = "/irrelevant";
    context.showCookieBanner = true;
    getFormGroup = () => {
      return {
        serialise: jest.fn().mockReturnValue(formJSON),
      };
    };
    const response = await handlePageRequest(
      nextPagePath,
      getFormGroup
    )(context);

    expect(response).toStrictEqual({
      props: {
        form: formJSON,
        showCookieBanner: true,
        submissionId: "id",
      },
    });
  });
});
