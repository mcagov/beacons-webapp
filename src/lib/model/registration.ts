import { Activity, Environment, Purpose } from "../registration/types";

export interface SerializedRegistration {
  beacons: Beacon[];
}

export interface Beacon {
  manufacturer: string;
  model: string;
  hexId: string;
  referenceNumber: string;
  manufacturerSerialNumber: string;
  chkCode: string;
  batteryExpiryDate: string;
  lastServicedDate: string;

  uses: Use[];
  owner: Contact;
  emergencyContacts: Contact[];
}

export interface Contact {
  fullName: string;
  telephoneNumber: string;
  alternativeTelephoneNumber: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  townOrCity: string;
  county: string;
  postcode: string;
}

export interface Use {
  environment: Environment;
  otherEnvironment?: string;
  purpose: Purpose;
  activity: Activity;
  otherActivity?: string;
  callSign: string;
  vhfRadio: boolean;
  fixedVhfRadio: boolean;
  fixedVhfRadioValue: string;
  portableVhfRadio: boolean;
  portableVhfRadioValue: string;
  satelliteTelephone: boolean;
  satelliteTelephoneValue: string;
  mobileTelephone: boolean;
  mobileTelephone1: string;
  mobileTelephone2: string;
  otherCommunication: boolean;
  otherCommunicationValue: string;
  maxCapacity: number;
  vesselName: string;
  portLetterNumber: string;
  homeport: string;
  areaOfOperation: string;
  beaconLocation: string;
  imoNumber: string;
  ssrNumber: string;
  officialNumber: string;
  rigPlatformLocation: string;
  mainUse: boolean;
  aircraftManufacturer: string;
  principalAirport: string;
  secondaryAirport: string;
  registrationMark: string;
  hexAddress: string;
  cnOrMsnNumber: string;
  dongle: boolean;
  beaconPosition: string;
  workingRemotelyLocation: string;
  workingRemotelyPeopleCount: string;
  windfarmLocation: string;
  windfarmPeopleCount: string;
  otherActivityLocation: string;
  otherActivityPeopleCount: string;
  moreDetails: string;
}
