import { appContainer, IAppContainer } from "../lib/appContainer";
import { BeaconsGetServerSidePropsContext } from "../lib/container";

export const getAccountHolderId =
  ({
    userSessionGateway,
    beaconsApiAuthGateway,
    accountHolderApiGateway,
  }: Partial<IAppContainer> = appContainer) =>
  async (context: BeaconsGetServerSidePropsContext): Promise<string> => {
    const session = await userSessionGateway.getSession(context);

    return await accountHolderApiGateway.getAccountHolderId(
      session.user.authId,
      await beaconsApiAuthGateway.getAccessToken()
    );
  };
