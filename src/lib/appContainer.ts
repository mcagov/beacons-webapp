import { AadAuthGateway, IAuthGateway } from "../gateways/aadAuthGateway";
import {
  AccountHolderApiGateway,
  IAccountHolderApiGateway,
} from "../gateways/accountHolderApiGateway";
import {
  BasicAuthGateway,
  IBasicAuthGateway,
} from "../gateways/basicAuthGateway";
import {
  BeaconsApiGateway,
  IBeaconsApiGateway,
} from "../gateways/beaconsApiGateway";
import { CachedRegistrationGateway } from "../gateways/CachedRegistrationGateway";
import {
  GovNotifyGateway,
  IGovNotifyGateway,
} from "../gateways/govNotifyApiGateway";
import { RedisCachedRegistrationGateway } from "../gateways/RedisCachedRegistrationGateway";
import {
  IUserSessionGateway,
  UserSessionGateway,
} from "../gateways/userSessionGateway";
import { authenticateUser } from "../useCases/authenticateUser";
import { clearCachedRegistration } from "../useCases/clearCachedRegistration";
import { deleteCachedUse } from "../useCases/deleteCachedUse";
import { getBeaconsByAccountHolderId } from "../useCases/getAccountBeacons";
import { getAccountHolderId } from "../useCases/getAccountHolderId";
import { getCachedRegistration } from "../useCases/getCachedRegistration";
import { getOrCreateAccountHolder } from "../useCases/getOrCreateAccountHolder";
import { saveCachedRegistration } from "../useCases/saveCachedRegistration";
import { sendConfirmationEmail } from "../useCases/sendConfirmationEmail";
import { submitRegistration } from "../useCases/submitRegistration";

export interface IAppContainer {
  /* Use cases */
  authenticateUser;
  submitRegistration;
  sendConfirmationEmail;
  getCachedRegistration;
  saveCachedRegistration;
  clearCachedRegistration;
  deleteCachedUse;
  getOrCreateAccountHolder;
  getAccountHolderId;
  getBeaconsByAccountHolderId;

  /* Gateways */
  beaconsApiAuthGateway: IAuthGateway;
  basicAuthGateway: IBasicAuthGateway;
  beaconsApiGateway: IBeaconsApiGateway;
  govNotifyGateway: IGovNotifyGateway;
  accountHolderApiGateway: IAccountHolderApiGateway;
  userSessionGateway: IUserSessionGateway;
  cachedRegistrationGateway: CachedRegistrationGateway;
}

export const appContainer: IAppContainer = {
  /* Simple use cases */
  getCachedRegistration: getCachedRegistration,
  saveCachedRegistration: saveCachedRegistration,
  clearCachedRegistration: clearCachedRegistration,
  deleteCachedUse: deleteCachedUse,
  submitRegistration: submitRegistration,
  authenticateUser: authenticateUser,
  sendConfirmationEmail: sendConfirmationEmail,
  getOrCreateAccountHolder: getOrCreateAccountHolder,
  getAccountHolderId: getAccountHolderId,
  getBeaconsByAccountHolderId: getBeaconsByAccountHolderId,

  /* Gateways */
  get beaconsApiAuthGateway() {
    return new AadAuthGateway();
  },
  get basicAuthGateway() {
    return new BasicAuthGateway();
  },
  get beaconsApiGateway() {
    return new BeaconsApiGateway(process.env.API_URL);
  },
  get govNotifyGateway() {
    return new GovNotifyGateway(process.env.GOV_NOTIFY_API_KEY);
  },
  get accountHolderApiGateway() {
    return new AccountHolderApiGateway(process.env.API_URL);
  },
  get userSessionGateway() {
    return new UserSessionGateway();
  },
  get cachedRegistrationGateway() {
    return new RedisCachedRegistrationGateway();
  },
};
