import { Domain } from "node:domain";

// export class Registration {
//   constructor(registrationJson) {}

//   public deserialize() {
//     return {
//       owner: {
//         name: "",
//         email: "",
//         telephoneNumber: "",
//         altTelephoneNumber: "",
//         address: {
//           line1: "",
//           line2: "",
//           townOrCity: "",
//           county: "",
//           postcode: "",
//         },
//       },
//       beacons: [],
//       emergencyContacts: [],
//     };
//   }

//   public update(registrationJson) {
//     // TODO take flat object and update internal structured data
//     // E.g. user adds a beacon, create a new Beacon object and add to Registration
//   }
// }

interface Registration {
  beacons: Beacon[];
  owner: Person;
}

interface Beacon {
  manufacturer: string;
  model: string;
  hexId: string;
  manufacturerSerialNumber: string;
  uses: BeaconUse[];

  chkCode: string;
  batteryExpiryDate: string;
  batteryExpiryDateMonth: string;
  batteryExpiryDateYear: string;
  lastServicedDate: string;
  lastServicedDateMonth: string;
  lastServicedDateYear: string;
}

interface BeaconUse {
  domain: Domain;
}

interface Emplacement {
  name: string;
  maxCapacity: string;
  baseLocation: string;
  beaconLocation: string;
  moreDetails: string;
}

interface Vessel extends Emplacement {
  mmsiNumber: string;
  pln: string;
}

interface Aircraft extends Emplacement {
  manufacturer: string;
}

interface Vessel {
  maxCapacity: string;
  name: string;
  homeport: string;
  areaOfOperation: string;
  beaconLocation: string;
  moreVesselDetails: string;
  maritimePleasureVesselUse: string;
  otherPleasureVesselText: string;
}

interface Land {
  name: string;
}

interface Other {
  maxCapacity: string;
  vesselName: string;
  homeport: string;
  areaOfOperation: string;
  beaconLocation: string;
  moreVesselDetails: string;
  maritimePleasureVesselUse: string;
  otherPleasureVesselText: string;
}

interface Person {
  name: string;
}
