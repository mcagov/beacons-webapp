import { render } from "@testing-library/react";
import React from "react";
import ApplicationCompletePage, {
  getServerSideProps,
} from "../../../src/pages/register-a-beacon/application-complete";
import { CreateRegistration } from "../../../src/useCases/createRegistration";
import { SendGovNotifyEmail } from "../../../src/useCases/sendGovNotifyEmail";

jest.mock("../../../src/lib/middleware", () => ({
  _esModule: true,
  withCookieRedirect: jest.fn().mockImplementation((callback) => {
    return async (context) => {
      return callback(context);
    };
  }),
  decorateGetServerSidePropsContext: jest.fn().mockImplementation(() => ({
    registration: {
      registration: {
        referenceNumber: "",
      },
    },
  })),
}));
jest.mock("../../../src/gateways/beaconsApiGateway");
jest.mock("../../../src/gateways/govNotifyApiGateway");
jest.mock("../../../src/useCases/sendGovNotifyEmail");
jest.mock("../../../src/useCases/createRegistration");

describe("ApplicationCompletePage", () => {
  it("should render correctly", () => {
    render(<ApplicationCompletePage showCookieBanner={false} />);
  });

  describe("getServerSideProps function", () => {
    let context;

    beforeEach(() => {
      (CreateRegistration as any).execute.mockImplementation(() => true);
      (SendGovNotifyEmail as any).execute.mockImplementation(() => true);
      context = {};
    });

    it("should not have a refernece number if creating the registration is unsuccessful", async () => {
      const props = await getServerSideProps(context);

      expect(props.reference).toBeUndefined();
    });

    it("should create the registration, send the email via gov notify and return the reference number", async () => {
      const props = await getServerSideProps(context);

      expect(props.reference.length).toBe(7);
    });
  });
});
