import { IncomingMessage } from "http";
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
import {
  GovNotifyGateway,
  IGovNotifyGateway,
} from "../gateways/govNotifyApiGateway";
import {
  IUserSessionGateway,
  UserSessionGateway,
} from "../gateways/userSessionGateway";
import {
  authenticateUser,
  AuthenticateUserFn,
} from "../useCases/authenticateUser";
import {
  clearCachedRegistration,
  ClearCachedRegistrationFn,
} from "../useCases/clearCachedRegistration";
import { deleteBeacon, DeleteBeaconFn } from "../useCases/deleteBeacon";
import {
  deleteCachedUse,
  DeleteCachedUseFn,
} from "../useCases/deleteCachedUse";
import { getAccessToken, GetAccessTokenFn } from "../useCases/getAccessToken";
import {
  getBeaconsByAccountHolderId,
  GetBeaconsByAccountHolderIdFn,
} from "../useCases/getAccountBeacons";
import { getAccountHolderId } from "../useCases/getAccountHolderId";
import {
  getCachedRegistration,
  GetCachedRegistrationFn,
} from "../useCases/getCachedRegistration";
import {
  getOrCreateAccountHolder,
  GetOrCreateAccountHolderFn,
} from "../useCases/getOrCreateAccountHolder";
import {
  saveCachedRegistration,
  SaveCachedRegistrationFn,
} from "../useCases/saveCachedRegistration";
import {
  sendConfirmationEmail,
  SendConfirmationEmailFn,
} from "../useCases/sendConfirmationEmail";
import { submitRegistration } from "../useCases/submitRegistration";
import {
  updateAccountHolder,
  UpdateAccountHolderFn,
} from "../useCases/updateAccountHolder";
import { parseFormDataAs } from "./middleware";

export interface IAppContainer {
  /* Use cases */
  authenticateUser: AuthenticateUserFn;
  submitRegistration;
  sendConfirmationEmail: SendConfirmationEmailFn;
  getCachedRegistration: GetCachedRegistrationFn;
  saveCachedRegistration: SaveCachedRegistrationFn;
  clearCachedRegistration: ClearCachedRegistrationFn;
  deleteCachedUse: DeleteCachedUseFn;
  getAccessToken: GetAccessTokenFn;
  parseFormDataAs<T>(request: IncomingMessage): Promise<T>;
  getOrCreateAccountHolder: GetOrCreateAccountHolderFn;
  updateAccountHolder: UpdateAccountHolderFn;
  getAccountHolderId;
  getBeaconsByAccountHolderId: GetBeaconsByAccountHolderIdFn;
  deleteBeacon: DeleteBeaconFn;

  /* Gateways */
  beaconsApiAuthGateway: IAuthGateway;
  basicAuthGateway: IBasicAuthGateway;
  beaconsApiGateway: IBeaconsApiGateway;
  govNotifyGateway: IGovNotifyGateway;
  accountHolderApiGateway: IAccountHolderApiGateway;
  userSessionGateway: IUserSessionGateway;
}

// "overrides" is spread over the default appContainer at the bottom of this method to enable injecting mocks et al.
export const getAppContainer = (overrides?: IAppContainer): IAppContainer => {
  return {
    /* Simple use cases */
    getCachedRegistration: getCachedRegistration,
    saveCachedRegistration: saveCachedRegistration,
    clearCachedRegistration: clearCachedRegistration,
    deleteCachedUse: deleteCachedUse,

    /* Composite use cases requiring access to other use cases */
    get getAccessToken() {
      return getAccessToken(this);
    },
    get authenticateUser() {
      return authenticateUser(this);
    },
    get submitRegistration() {
      return submitRegistration(this);
    },
    get sendConfirmationEmail() {
      return sendConfirmationEmail(this);
    },
    get getOrCreateAccountHolder() {
      return getOrCreateAccountHolder(this);
    },
    get updateAccountHolder() {
      return updateAccountHolder(this);
    },
    get getAccountHolderId() {
      return getAccountHolderId(this);
    },
    get getBeaconsByAccountHolderId() {
      return getBeaconsByAccountHolderId(this);
    },
    get deleteBeacon() {
      return deleteBeacon(this);
    },

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

    /* Mockable utilities */
    parseFormDataAs: parseFormDataAs,

    /* Apply injected overrides */
    ...overrides,
  };
};

export const appContainer = getAppContainer();
