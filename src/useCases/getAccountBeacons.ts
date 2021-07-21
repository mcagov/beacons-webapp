import { IBeacon } from "../entities/beacon";
import { IAppContainer } from "../lib/appContainer";

export type GetBeaconsByAccountHolderIdFn = (
  accountId: string
) => Promise<IBeacon[]>;

export const getBeaconsByAccountHolderId =
  ({
    beaconsApiAuthGateway,
    accountHolderApiGateway,
  }: IAppContainer): GetBeaconsByAccountHolderIdFn =>
  async (accountId: string) => {
    return await accountHolderApiGateway.getAccountBeacons(
      accountId,
      await beaconsApiAuthGateway.getAccessToken()
    );
  };
