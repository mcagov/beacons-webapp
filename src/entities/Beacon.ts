import { EmergencyContact } from "./EmergencyContact";
import { EntityLink } from "./EntityLink";
import { Owner } from "./Owner";
import { Use } from "./Use";

export interface Beacon {
  id: string;
  hexId: string;
  type: string;
  registeredDate: string;
  status: string;
  manufacturer: string;
  model: string;
  manufacturerSerialNumber: string;
  chkCode: string;
  protocolCode: string;
  codingMethod: string;
  batteryExpiryDate: string;
  lastServicedDate: string;
  uses: Use[];
  owners: Owner[];
  emergencyContacts: EmergencyContact[];
  entityLinks: EntityLink[];
}
