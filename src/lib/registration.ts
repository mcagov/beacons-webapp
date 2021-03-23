export interface Registration {
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

  uses: BeaconUse[];
}

export interface BeaconUse {
  environment: string;
  purpose: string;
  activity: string;
}

export enum BeaconEnvionment {
  MARITIME = "MARITIME",
  AVIATION = "AVIATION",
  LAND = "LAND",
  OTHER = "OTHER",
}
