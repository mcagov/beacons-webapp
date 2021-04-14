import { BeaconsApiGateway } from "../gateways/beaconsApiGateway";
import {
  IRegistration,
  SerializedRegistration,
} from "../lib/registration/types";

export class CreateRegistration {
  private readonly registrationsEndpoint = "registrations/register";
  private apiGateway: BeaconsApiGateway;

  constructor(apiGateway: BeaconsApiGateway) {
    this.apiGateway = apiGateway;
  }

  public async execute(registration: IRegistration): Promise<boolean> {
    const registrationJson = this.serialiseToAPI(registration);

    return this.apiGateway.post(this.registrationsEndpoint, registrationJson);
  }

  public serialiseToAPI(registration: IRegistration): SerializedRegistration {
    const beacon = this._serialiseBeacon(registration);
    const owner = this._serialiseOwner(registration);
    const emergencyContacts = this._serialiseEmergencyContacts(registration);
    const uses = registration.uses;

    return {
      beacons: [{ ...beacon, owner, emergencyContacts, uses }],
    };
  }

  private _serialiseBeacon(registration: IRegistration) {
    return {
      manufacturer: registration.manufacturer,
      model: registration.model,
      hexId: registration.hexId,
      referenceNumber: registration.referenceNumber,
      manufacturerSerialNumber: registration.manufacturerSerialNumber,
      chkCode: registration.chkCode,
      batteryExpiryDate: registration.batteryExpiryDate,
      lastServicedDate: registration.lastServicedDate,
    };
  }

  private _serialiseOwner(registration: IRegistration) {
    return {
      fullName: registration.ownerFullName,
      email: registration.ownerEmail,
      telephoneNumber: registration.ownerTelephoneNumber,
      alternativeTelephoneNumber: registration.ownerAlternativeTelephoneNumber,
      addressLine1: registration.ownerAddressLine1,
      addressLine2: registration.ownerAddressLine2,
      townOrCity: registration.ownerTownOrCity,
      county: registration.ownerCounty,
      postcode: registration.ownerPostcode,
    };
  }

  private _serialiseEmergencyContacts(registration: IRegistration) {
    const emergencyContacts = [];

    if (
      !!registration.emergencyContact1FullName ||
      !!registration.emergencyContact1TelephoneNumber ||
      !!registration.emergencyContact1AlternativeTelephoneNumber
    ) {
      emergencyContacts.push({
        fullName: registration.emergencyContact1FullName,
        telephoneNumber: registration.emergencyContact1TelephoneNumber,
        alternativeTelephoneNumber:
          registration.emergencyContact1AlternativeTelephoneNumber,
      });
    }

    if (
      !!registration.emergencyContact2FullName ||
      !!registration.emergencyContact2TelephoneNumber ||
      !!registration.emergencyContact2AlternativeTelephoneNumber
    ) {
      emergencyContacts.push({
        fullName: registration.emergencyContact2FullName,
        telephoneNumber: registration.emergencyContact2TelephoneNumber,
        alternativeTelephoneNumber:
          registration.emergencyContact2AlternativeTelephoneNumber,
      });
    }

    if (
      !!registration.emergencyContact3FullName ||
      !!registration.emergencyContact3TelephoneNumber ||
      !!registration.emergencyContact3AlternativeTelephoneNumber
    ) {
      emergencyContacts.push({
        fullName: registration.emergencyContact3FullName,
        telephoneNumber: registration.emergencyContact3TelephoneNumber,
        alternativeTelephoneNumber:
          registration.emergencyContact3AlternativeTelephoneNumber,
      });
    }

    return emergencyContacts;
  }
}
