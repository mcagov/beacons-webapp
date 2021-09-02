import { rest } from "msw";
import { setupServer } from "msw/node";
import { v4 } from "uuid";
import { BeaconsApiAccountHolderGateway } from "../../../src/gateways/BeaconsApiAccountHolderGateway";
import { AuthGateway } from "../../../src/gateways/interfaces/AuthGateway";
import { getAppContainer } from "../../../src/lib/appContainer";
import { IAppContainer } from "../../../src/lib/IAppContainer";
import { BeaconsGetServerSidePropsContext } from "../../../src/lib/middleware/BeaconsGetServerSidePropsContext";
import { formSubmissionCookieId } from "../../../src/lib/types";
import { getServerSideProps } from "../../../src/pages/account/your-beacon-registry-account";
import { accountHolderFixture } from "../../fixtures/accountHolder.fixture";
import {
  accountDetailsResponseJson,
  accountIdFromAuthIdResponseJson,
} from "../../fixtures/accountResponses.fixture";
import { beaconFixtures } from "../../fixtures/beacons.fixture";
import { manyBeaconsApiResponseFixture } from "../../fixtures/manyBeaconsApiResponse.fixture";

describe("YourBeaconRegistryAccount", () => {
  const mockAuthGateway: AuthGateway = {
    getAccessToken: jest.fn().mockResolvedValue(v4()),
  };
  const mockSessionGateway = {
    getSession: jest.fn().mockReturnValue({ user: { authId: "a-session-id" } }),
  };
  const mocks: Partial<IAppContainer> = {
    accountHolderGateway: new BeaconsApiAccountHolderGateway(
      process.env.API_URL,
      mockAuthGateway
    ),
    sessionGateway: mockSessionGateway as any,
  };

  describe("GetServerSideProps for user with full account details", () => {
    const server = setupServer(
      rest.get("*/account-holder/auth-id/:authId", (req, res, ctx) => {
        return res(ctx.json({ ...accountIdFromAuthIdResponseJson }));
      }),
      rest.get("*/account-holder/:accountId", (req, res, ctx) => {
        return res(
          ctx.json({ ...accountDetailsResponseJson("Testy McTestface") })
        );
      }),
      rest.get("*/account-holder/:accountId/beacons", (req, res, ctx) => {
        return res(ctx.json({ ...manyBeaconsApiResponseFixture }));
      })
    );

    beforeAll(() => {
      server.listen();
    });
    afterAll(() => {
      server.close();
    });

    it("should contain correct account details for a given user", async () => {
      const container = getAppContainer(mocks as IAppContainer);
      const context: Partial<BeaconsGetServerSidePropsContext> = {
        container: container as IAppContainer,
        session: { user: { authId: "a-session-id" } },
        req: {
          cookies: {
            [formSubmissionCookieId]: "set",
          },
          method: "GET",
        } as any,
      };

      const result = await getServerSideProps(
        context as BeaconsGetServerSidePropsContext
      );

      expect(result["props"]["accountHolderDetails"]).toEqual(
        accountHolderFixture
      );
      expect(result["props"]["beacons"]).toEqual(beaconFixtures);
    });
  });

  describe("GetServerSideProps for user with account detail missing", () => {
    const server = setupServer(
      rest.get("*/account-holder/auth-id/:authId", (req, res, ctx) => {
        return res(ctx.json({ ...accountIdFromAuthIdResponseJson }));
      }),
      rest.get("*/account-holder/:accountId", (req, res, ctx) => {
        return res(ctx.json({ ...accountDetailsResponseJson("") }));
      }),
      rest.get("*/account-holder/:accountId/beacons", (req, res, ctx) => {
        return res(ctx.json({ ...manyBeaconsApiResponseFixture }));
      })
    );

    beforeAll(() => {
      server.listen();
    });
    afterAll(() => {
      server.close();
    });

    it("should redirect to account updates if account details are invalid", async () => {
      const container = getAppContainer(mocks as IAppContainer);
      const context: Partial<BeaconsGetServerSidePropsContext> = {
        container,
        session: { user: { authId: "a-session-id" } },
        req: {
          cookies: {
            [formSubmissionCookieId]: "set",
          },
          method: "GET",
        } as any,
      };

      const result = (await getServerSideProps(
        context as BeaconsGetServerSidePropsContext
      )) as any;

      expect(result.redirect.destination).toEqual("/account/update-account");
    });
  });
});
