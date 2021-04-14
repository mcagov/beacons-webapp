import { BeaconUse, IRegistration } from "./types";

/**
 * Convenience function for returning an `empty` instance of a beacon registration.
 *
 * @returns {IRegistration}   JSON representation of a beacon registration
 */
export const initBeacon = (): IRegistration => {
  return {
    manufacturer: "",
    model: "",
    hexId: "",

    referenceNumber: "",

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

    additionalBeaconUse: "false",
    uses: [initBeaconUse(true)],
  };
};

/**
 * Convenience function for returning an `empty` instance of a beacon use.
 *
 * @param mainUse {boolean}     Whether the use is the main use for a beacon; defaults to false
 * @returns       {BeaconUse}   JSON representation of a beacon use
 */
export const initBeaconUse = (mainUse = false): BeaconUse => {
  return {
    environment: null,
    otherEnvironment: null,
    purpose: null,
    activity: null,
    otherActivity: null,
    otherCommunication: null,
    otherCommunicationValue: null,

    // Communications
    callSign: null,
    vhfRadio: null,
    fixedVhfRadio: null,
    fixedVhfRadioValue: null,
    portableVhfRadio: null,
    portableVhfRadioValue: null,
    satelliteTelephone: null,
    satelliteTelephoneValue: null,
    mobileTelephone: null,
    mobileTelephone1: null,
    mobileTelephone2: null,

    // Vessel info
    maxCapacity: null,
    vesselName: null,
    portLetterNumber: null,
    homeport: null,
    areaOfOperation: null,
    beaconLocation: null,
    imoNumber: null,
    ssrNumber: null,
    officialNumber: null,
    rigPlatformLocation: null,

    // Aircraft info
    aircraftManufacturer: null,
    principalAirport: null,
    secondaryAirport: null,
    registrationMark: null,
    hexAddress: null,
    cnOrMsnNumber: null,
    dongle: null,
    beaconPosition: null,

    // Land environment
    driving: null,
    cycling: null,
    climbingMountaineering: null,
    skiing: null,
    walkingHiking: null,
    workingRemotely: null,
    workingRemotelyLocation: null,
    workingRemotelyPeopleCount: null,
    windfarm: null,
    windfarmLocation: null,
    windfarmPeopleCount: null,
    otherActivityDescription: null,
    otherActivityLocation: null,
    otherActivityPeopleCount: null,

    moreDetails: "",
    mainUse,
  };
};
