import {
  ClientCredentialRequest,
  ConfidentialClientApplication,
  Configuration,
} from "@azure/msal-node";
import { appConfig } from "../appConfig";

export interface IAuthGateway {
  getAccessToken: (
    cca?: ConfidentialClientApplication,
    apiId?: string
  ) => Promise<string>;
}

export class AadAuthGateway implements IAuthGateway {
  private readonly ccaConfig: Configuration;
  private readonly apiId: string;

  public constructor(
    ccaConfig = appConfig.aadConfig,
    apiId = process.env.AAD_API_ID
  ) {
    this.ccaConfig = ccaConfig;
    this.apiId = apiId;
  }

  public async getAccessToken(
    cca = new ConfidentialClientApplication(this.ccaConfig)
  ): Promise<string> {
    try {
      const accessTokenRequest: ClientCredentialRequest = {
        scopes: [`api://${this.apiId}/.default`],
      };

      const authResult = await cca.acquireTokenByClientCredential(
        accessTokenRequest
      );
      return authResult.accessToken;
    } catch (error) {
      /* eslint-disable no-console */
      console.error(JSON.stringify(error));
      throw error;
    }
  }
}
