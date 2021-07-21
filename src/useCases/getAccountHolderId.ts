import { IAppContainer } from "../lib/appContainer";
import { BeaconsGetServerSidePropsContext } from "../lib/container";

export type GetAccountHolderIdFn = (
  context: BeaconsGetServerSidePropsContext
) => Promise<string>;

export const getAccountHolderId =
  ({
    getSession,
    beaconsApiAuthGateway,
    accountHolderApiGateway,
  }: IAppContainer): GetAccountHolderIdFn =>
  async (context: BeaconsGetServerSidePropsContext) => {
    const session = await getSession(context);

    return await accountHolderApiGateway.getAccountHolderId(
      session.user.authId,
      await beaconsApiAuthGateway.getAccessToken()
    );
  };
