import axios from "axios";
import { IRegistrationRequestBody } from "../lib/registration/registrationRequestBody";
import { IRegistration } from "../lib/registration/types";

export interface IDeleteBeaconRequest {
  beaconId: string;
  accountHolderId: string;
  reason: string;
}

export interface IBeaconsApiGateway {
  sendRegistration: (
    json: IRegistrationRequestBody,
    accessToken: string
  ) => Promise<boolean>;

  deleteBeacon: (
    json: IDeleteBeaconRequest,
    accessToken: string
  ) => Promise<boolean>;
}

export class BeaconsApiGateway implements IBeaconsApiGateway {
  private readonly apiUrl: string;
  private readonly registrationsEndpoint = "registrations/register";

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  public async sendRegistration(
    json: IRegistrationRequestBody,
    accessToken: string
  ): Promise<boolean> {
    const url = `${this.apiUrl}/${this.registrationsEndpoint}`;

    try {
      await axios.post(url, json, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  public async deleteBeacon(
    json: IDeleteBeaconRequest,
    accessToken: string
  ): Promise<boolean> {
    const url = `${this.apiUrl}/beacons/${json.beaconId}/delete`;
    const data = {
      beaconId: json.beaconId,
      userId: json.accountHolderId,
      reason: json.reason,
    };

    try {
      await axios.patch(url, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const registrationToRequestBody = (
  registration: IRegistration
): IRegistrationRequestBody => ({});
