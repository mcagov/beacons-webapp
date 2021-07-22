import axios from "axios";
import {
  IEmergencyContactRequestBody,
  IRegistrationRequestBody,
  IUseRequestBody,
} from "../lib/registration/registrationRequestBody";
import { IRegistration } from "../lib/registration/types";
import { stringToBoolean } from "../lib/writingStyle";

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
): IRegistrationRequestBody => ({
  beacons: [
    {
      batteryExpiryDate: registration.batteryExpiryDate,
      chkCode: registration.chkCode,
      referenceNumber: registration.referenceNumber,
      hexId: registration.hexId,
      lastServicedDate: registration.lastServicedDate,
      manufacturer: registration.manufacturer,
      manufacturerSerialNumber: registration.manufacturerSerialNumber,
      model: registration.model,
      owner: {
        addressLine1: registration.ownerAddressLine1,
        addressLine2: registration.ownerAddressLine2,
        alternativeTelephoneNumber:
          registration.ownerAlternativeTelephoneNumber,
        county: registration.ownerCounty,
        email: registration.ownerEmail,
        fullName: registration.ownerFullName,
        postcode: registration.ownerPostcode,
        telephoneNumber: registration.ownerTelephoneNumber,
        townOrCity: registration.ownerTownOrCity,
      },
      emergencyContacts: emergencyContacts(registration),
      uses: uses(registration),
    },
  ],
});

const emergencyContacts = (
  registration: IRegistration
): IEmergencyContactRequestBody[] => [
  {
    fullName: registration.emergencyContact1FullName,
    telephoneNumber: registration.emergencyContact1TelephoneNumber,
    alternativeTelephoneNumber:
      registration.emergencyContact1AlternativeTelephoneNumber,
  },
  {
    fullName: registration.emergencyContact2FullName,
    telephoneNumber: registration.emergencyContact2TelephoneNumber,
    alternativeTelephoneNumber:
      registration.emergencyContact2AlternativeTelephoneNumber,
  },
  {
    fullName: registration.emergencyContact3FullName,
    telephoneNumber: registration.emergencyContact3TelephoneNumber,
    alternativeTelephoneNumber:
      registration.emergencyContact3AlternativeTelephoneNumber,
  },
];

const uses = (registration: IRegistration): IUseRequestBody[] =>
  registration.uses.map((use, index) => ({
    environment: use.environment,
    purpose: use.purpose,
    activity: use.activity,
    otherActivity: use.otherActivityText,
    callSign: use.callSign,
    vhfRadio: stringToBoolean(use.vhfRadio),
    fixedVhfRadio: stringToBoolean(use.fixedVhfRadio),
    fixedVhfRadioValue: use.fixedVhfRadioInput,
    portableVhfRadio: stringToBoolean(use.portableVhfRadio),
    portableVhfRadioValue: use.portableVhfRadioInput,
    satelliteTelephone: stringToBoolean(use.satelliteTelephone),
    satelliteTelephoneValue: use.satelliteTelephoneInput,
    mobileTelephone: stringToBoolean(use.mobileTelephone),
    mobileTelephone1: use.mobileTelephoneInput1,
    mobileTelephone2: use.mobileTelephoneInput2,
    otherCommunication: stringToBoolean(use.otherCommunication),
    otherCommunicationValue: use.otherCommunicationInput,
    vesselName: use.vesselName,
    portLetterNumber: use.portLetterNumber,
    homeport: use.homeport,
    areaOfOperation: use.areaOfOperation,
    beaconLocation: use.beaconLocation,
    imoNumber: use.imoNumber,
    ssrNumber: use.ssrNumber,
    rssNumber: use.rssNumber,
    officialNumber: use.officialNumber,
    rigPlatformLocation: use.rigPlatformLocation,
    mainUse: index === 0,
    aircraftManufacturer: use.aircraftManufacturer,
    principalAirport: use.principalAirport,
    secondaryAirport: use.secondaryAirport,
    registrationMark: use.registrationMark,
    hexAddress: use.hexAddress,
    cnOrMsnNumber: use.cnOrMsnNumber,
    dongle: stringToBoolean(use.dongle),
    beaconPosition: use.beaconPosition,
    workingRemotelyLocation: use.workingRemotelyLocation,
    workingRemotelyPeopleCount: use.workingRemotelyPeopleCount,
    windfarmLocation: use.windfarmLocation,
    windfarmPeopleCount: use.windfarmPeopleCount,
    otherActivityLocation: use.otherActivityLocation,
    otherActivityPeopleCount: use.otherActivityPeopleCount,
    moreDetails: use.moreDetails,
    maxCapacity: parseInt(use.maxCapacity),
  }));
