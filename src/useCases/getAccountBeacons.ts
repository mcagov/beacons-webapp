import { IBeacon } from "../entities/beacon";
import { appContainer, IAppContainer } from "../lib/appContainer";

export const getBeaconsByAccountHolderId =
  ({
    beaconsApiAuthGateway,
    accountHolderApiGateway,
  }: Partial<IAppContainer> = appContainer) =>
  async (accountId: string): Promise<IBeacon[]> => {
    return await accountHolderApiGateway.getAccountBeacons(
      accountId,
      await beaconsApiAuthGateway.getAccessToken()
    );
  };
