import { BeaconEnvionment, IRegistration } from "./types";

/**
 * Convenience function for returning an `empty` instance of a beacon registration.
 *
 * @returns {Registration}   JSON instance of a beacon registration
 */
export const initBeacon = (): IRegistration => {
  return {
    manufacturer: "",
    model: "",
    hexId: "",

    manufacturerSerialNumber: "",
    chkCode: "",
    batteryExpiryDate: "",
    batteryExpiryDateMonth: "",
    batteryExpiryDateYear: "",
    lastServicedDate: "",
    lastServicedDateMonth: "",
    lastServicedDateYear: "",

    ownerFullName: "",
    ownerEmail: "",
    ownerTelephoneNumber: "",
    ownerAlternativeTelephoneNumber: "",
    ownerAddressLine1: "",
    ownerAddressLine2: "",
    ownerTownOrCity: "",
    ownerCounty: "",
    ownerPostcode: "",

    emergencyContact1FullName: "",
    emergencyContact1TelephoneNumber: "",
    emergencyContact1AlternativeTelephoneNumber: "",
    emergencyContact2FullName: "",
    emergencyContact2TelephoneNumber: "",
    emergencyContact2AlternativeTelephoneNumber: "",
    emergencyContact3FullName: "",
    emergencyContact3TelephoneNumber: "",
    emergencyContact3AlternativeTelephoneNumber: "",

    uses: [],
  };
};

/**
 * Convenience function for returning the typed instance a beacon use, given the provided environment.
 *
 * @param environment {BeaconEnvironment}   An environment for which the beacon will be used
 * @returns           {any}                 The concrete beacon use
 */
export const initBeaconUse = (environment: BeaconEnvionment): any => {
  switch (environment) {
    case BeaconEnvionment.MARITIME:
      return {
        environment: BeaconEnvionment.MARITIME,
        purpose: "",
        activity: "",
      };

    case BeaconEnvionment.AVIATION:
      return {
        environment: BeaconEnvionment.AVIATION,
        purpose: "",
        activity: "",
      };

    case BeaconEnvionment.LAND:
      return {
        environment: BeaconEnvionment.LAND,
      };

    case BeaconEnvionment.OTHER:
      return {
        environment: BeaconEnvionment.OTHER,
      };

    default:
      return null;
  }
};
