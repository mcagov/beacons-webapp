import { IRegistration } from "./types";

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

    uses: [initBeaconUse()],
  };
};

export const initBeaconUse = (): any => {
  return {
    environment: "",
    purpose: "",
    activity: "",
  };
};
