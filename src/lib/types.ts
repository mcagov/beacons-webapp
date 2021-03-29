export enum HttpMethod {
  POST = "POST",
  PUT = "PUT",
}

export enum BeaconIntent {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  CHANGE_OWNERSHIP = "CHANGE_OWNERSHIP",
  WITHDRAW = "WITHDRAW",
  OTHER = "OTHER",
}

export enum Activity {
  MOTOR = "MOTOR",
  SAILING = "SAILING",
  ROWING = "ROWING",
  SMALL_UNPOWERED = "SMALL_UNPOWERED",
  OTHER = "OTHER",

  FISHING_VESSEL = "FISHING_VESSEL",
  MERCHANT_VESSEL = "MERCHANT_VESSEL",
  COMMERCIAL_SAILING_VESSEL = "COMMERCIAL_SAILING_VESSEL",
  COMMERCIAL_MOTOR_PLEASURE_VESSEL = "COMMERCIAL_MOTOR_PLEASURE_VESSEL",
  FLOATING_PLATFORM = "FLOATING_PLATFORM",
  OFFSHORE_WINDFARM = "OFFSHORE_WINDFARM",
  OFFSHORE_RIG_PLATFORM = "OFFSHORE_RIG_PLATFORM",
}

export enum VesselCommunication {
  VHF_RADIO = "VHF_RADIO",
  FIXED_VHF_RADIO = "FIXED_VHF_RADIO",
  PORTABLE_VHF_RADIO = "PORTABLE_VHF_RADIO",
  SATELLITE_TELEPHONE = "SATELLITE_TELEPHONE",
  MOBILE_TELEPHONE = "MOBILE_TELEPHONE",
}

export enum Environment {
  MARITIME = "MARITIME",
  AVIATION = "AVIATION",
  LAND = "LAND",
  OTHER = "OTHER",
}

export enum Purpose {
  PLEASURE = "PLEASURE",
  COMMERCIAL = "COMMERCIAL",
}

export interface Vessel {
  maxCapacity: string;
  vesselName: string;
  beaconLocation: string;
  portLetterNumber: string;
  homeport: string;
  areaOfOperation: string;
  imoNumber: string;
  ssrNumber: string;
  officialNumber: string;
  rigPlatformLocation: string;
  moreDetails: string;
}

export interface Aircraft {
  maxCapacity: string;
  aircraftManufacturer: string;
  principalAirport: string;
  secondaryAirport: string;
  registrationMark: string;
  hexAddress: string;
  cnOrMsnNumber: string;
  dongle: string;
  beaconPosition: string;
}

export const formSubmissionCookieId = "submissionId";
export const acceptRejectCookieId = "acceptRejectId";
