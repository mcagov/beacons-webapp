import { IRegistration } from "../../src/lib/registration/types";
import { getMockUse } from "../mocks";

export const registrationFixture: IRegistration = {
  manufacturer: "manufacturer",
  model: "model",
  hexId: "hexId",
  referenceNumber: "referenceNumber",
  accountHolderId: "accountHolderId",

  manufacturerSerialNumber: "manufacturerSerialNumber",
  chkCode: "chkCode",
  batteryExpiryDate: "batteryExpiryDate",
  batteryExpiryDateMonth: "batteryExpiryDateMonth",
  batteryExpiryDateYear: "batteryExpiryDateYear",
  lastServicedDate: "lastServicedDate",
  lastServicedDateMonth: "lastServicedDateMonth",
  lastServicedDateYear: "lastServicedDateYear",

  ownerFullName: "ownerFullName",
  ownerEmail: "ownerEmail",
  ownerTelephoneNumber: "ownerTelephoneNumber",
  ownerAlternativeTelephoneNumber: "ownerAlternativeTelephoneNumber",
  ownerAddressLine1: "ownerAddressLine1",
  ownerAddressLine2: "ownerAddressLine2",
  ownerTownOrCity: "ownerTownOrCity",
  ownerCounty: "ownerCounty",
  ownerPostcode: "ownerPostcode",

  emergencyContact1FullName: "emergencyContact1FullName",
  emergencyContact1TelephoneNumber: "emergencyContact1TelephoneNumber",
  emergencyContact1AlternativeTelephoneNumber:
    "emergencyContact1AlternativeTelephoneNumber",
  emergencyContact2FullName: "emergencyContact2FullName",
  emergencyContact2TelephoneNumber: "emergencyContact2TelephoneNumber",
  emergencyContact2AlternativeTelephoneNumber:
    "emergencyContact2AlternativeTelephoneNumber",
  emergencyContact3FullName: "emergencyContact3FullName",
  emergencyContact3TelephoneNumber: "emergencyContact3TelephoneNumber",
  emergencyContact3AlternativeTelephoneNumber:
    "emergencyContact3AlternativeTelephoneNumber",

  uses: [getMockUse()],
};
