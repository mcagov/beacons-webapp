export interface IRegistration {
  manufacturer: string;
  model: string;
  hexId: string;

  manufacturerSerialNumber: string;
  chkCode: string;
  batteryExpiryDate: string;
  batteryExpiryDateMonth: string;
  batteryExpiryDateYear: string;
  lastServicedDate: string;
  lastServicedDateMonth: string;
  lastServicedDateYear: string;

  ownerFullName: string;
  ownerEmail: string;
  ownerTelephoneNumber: string;
  ownerAlternativeTelephoneNumber: string;
  ownerAddressLine1: string;
  ownerAddressLine2: string;
  ownerTownOrCity: string;
  ownerCounty: string;
  ownerPostcode: string;

  emergencyContact1FullName: string;
  emergencyContact1TelephoneNumber: string;
  emergencyContact1AlternativeTelephoneNumber: string;
  emergencyContact2FullName: string;
  emergencyContact2TelephoneNumber: string;
  emergencyContact2AlternativeTelephoneNumber: string;
  emergencyContact3FullName: string;
  emergencyContact3TelephoneNumber: string;
  emergencyContact3AlternativeTelephoneNumber: string;

  uses: BeaconUse[];
}

export interface BeaconUse {
  environment: BeaconEnvionment;
  purpose: string;
  activity: string;
}

export enum BeaconEnvionment {
  MARITIME = "MARITIME",
  AVIATION = "AVIATION",
  LAND = "LAND",
  OTHER = "OTHER",
}

export interface VesselCommunications {
  callSign: string;
  vhfRadio: VesselCommunication;
  fixedVhfRadio: string;
  fixedVhfRadioInput: string;
  portableVhfRadio: VesselCommunication;
  portableVhfRadioInput: string;
  satelliteTelephone: VesselCommunication;
  satelliteTelephoneInput: string;
  mobileTelephone: VesselCommunication;
  mobileTelephoneInput1: string;
  mobileTelephoneInput2: string;
}

export enum VesselCommunication {
  VHF_RADIO = "VHF_RADIO",
  FIXED_VHF_RADIO = "FIXED_VHF_RADIO",
  PORTABLE_VHF_RADIO = "PORTABLE_VHF_RADIO",
  SATELLITE_TELEPHONE = "SATELLITE_TELEPHONE",
  MOBILE_TELEPHONE = "MOBILE_TELEPHONE",
}
