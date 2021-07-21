import { appContainer, IAppContainer } from "../lib/appContainer";
import { BeaconsGetServerSidePropsContext } from "../lib/container";

export type GetAccountHolderIdFn = (
  context: BeaconsGetServerSidePropsContext
) => Promise<string>;

export const getAccountHolderId =
  ({
    userSessionGateway,
    beaconsApiAuthGateway,
    accountHolderApiGateway,
  }: Partial<IAppContainer> = appContainer): GetAccountHolderIdFn =>
  async (context: BeaconsGetServerSidePropsContext) => {
    const session = await userSessionGateway.getSession(context);

    return await accountHolderApiGateway.getAccountHolderId(
      session.user.authId,
      await beaconsApiAuthGateway.getAccessToken()
    );
  };
