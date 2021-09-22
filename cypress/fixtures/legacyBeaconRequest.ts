import { ILegacyBeaconRequest } from "../../src/gateways/interfaces/LegacyBeaconRequest";

export const legacyBeaconRequest: ILegacyBeaconRequest = {
  data: {
    type: "legacyBeacon",
    attributes: {
      beacon: {
        pkBeaconId: 6062,
        statusCode: "ACTIVE",
        isWithdrawn: "N",
        isPending: "N",
        departRefId: "1187/02",
        hexId: "9D0E1D1B8C00001",
        manufacturer: "ACR",
        beaconType: "EPIRB",
        model: "CSTA 107, RLB 32 Cat 2 (Serialised non-TAC)",
        protocol: "None",
        serialNumber: 1763,
        cospasSarsatNumber: 476899,
        manufacturerSerialNumber: "None",
        coding: "None",
        firstRegistrationDate: "2004-10-28 00:00:00",
        lastServiceDate: "None",
        batteryExpiryDate: "None",
        withdrawnReason: "None",
        isArchived: "N",
        createUserId: 2889,
        createdDate: "2020-08-01T21:33:13",
        updateUserId: 2889,
        lastModifiedDate: "2004-10-13T00:00:00",
        versioning: 0,
        note: "CHANGE OF ADDRESS/EMERGENCY DETAILS ADDED. 13/10/04\\r\\nKAYCEE",
      },
      uses: [
        {
          pkBeaconUsesId: 6057,
          fkBeaconId: 6062,
          vesselName: "KAYCEE",
          homePort: "None",
          maxPersons: 10,
          officialNumber: "None",
          rssSsrNumber: "None",
          callSign: "VQAS7",
          imoNumber: "None",
          mmsiNumber: 235007399,
          fishingVesselPln: "None",
          hullIdNumber: "None",
          cg66RefNumber: "None",
          aodSerialNumber: "None",
          principalAirport: "None",
          bit24AddressHex: "None",
          aircraftRegistrationMark: "None",
          areaOfUse: "None",
          tripInfo: "None",
          rigName: "None",
          beaconPosition: "None",
          position: "None",
          localManagementId: "None",
          beaconNsn: "None",
          beaconPartNumber: "None",
          notes: "None",
          pennantNumber: "None",
          aircraftDescription: "None",
          survivalCraftType: "None",
          communications: "VHF/DSC",
          isMain: "Y",
          createUserId: 2889,
          updateUserId: 2889,
          createdDate: "2020-08-01T21:33:13",
          lastModifiedDate: "2021-08-01T21:33:13",
          versioning: 0,
          useType: "Maritime",
          vesselType: "Pleasure",
          aircraftType: "None",
          landUse: "None",
          note: "Some notes",
        },
        {
          pkBeaconUsesId: 6058,
          fkBeaconId: 6062,
          vesselName: "KAKEE",
          homePort: "None",
          maxPersons: 10,
          officialNumber: "None",
          rssSsrNumber: "None",
          callSign: "VQAS7",
          imoNumber: "None",
          mmsiNumber: 235007399,
          fishingVesselPln: "None",
          hullIdNumber: "None",
          cg66RefNumber: "None",
          aodSerialNumber: "None",
          principalAirport: "None",
          bit24AddressHex: "None",
          aircraftRegistrationMark: "None",
          areaOfUse: "None",
          tripInfo: "None",
          rigName: "None",
          beaconPosition: "None",
          position: "None",
          localManagementId: "None",
          beaconNsn: "None",
          beaconPartNumber: "None",
          notes: "None",
          pennantNumber: "None",
          aircraftDescription: "None",
          survivalCraftType: "None",
          communications: "VHF/DSC",
          isMain: "N",
          createUserId: 2889,
          createdDate: "2020-08-01T21:33:13",
          updateUserId: 2889,
          lastModifiedDate: "2021-08-01T21:33:13",
          versioning: 0,
          useType: "Maritime",
          vesselType: "Pleasure",
          aircraftType: "None",
          landUse: "None",
          note: "Some more notes",
        },
      ],
      owner: {
        pkBeaconOwnerId: 231035,
        fkBeaconId: 6062,
        ownerName: "Mr Beacon",
        companyName: "Beacon house",
        careOf: "Sideshow beacon",
        address1: "Bristol",
        address2: "Beacons",
        address3: "Beek",
        address4: "Me",
        country: "UNITED KINGDOM",
        postCode: "BS9 6GF",
        phone1: "077123456786",
        phone2: "077123456787",
        mobile1: "077123456788",
        mobile2: "077123456789",
        fax: "Fax me",
        email: "matt.carr@madetech.com",
        isMain: "Y",
        createUserId: "3748",
        createdDate: "2021-07-27T17:15:24",
        updateUserId: "3748",
        lastModifiedDate: "2021-07-27T17:15:24",
        versioning: 0,
      },
      secondaryOwners: [
        {
          pkBeaconOwnerId: 231036,
          fkBeaconId: 6062,
          ownerName: "Dr Beacon",
          companyName: "Beacon house",
          careOf: "Sideshow beacon",
          address1: "Bristol",
          address2: "Beacons",
          address3: "Beek",
          address4: "Me",
          country: "UNITED KINGDOM",
          postCode: "BS9 6GF",
          phone1: "077123456786",
          phone2: "077123456787",
          mobile1: "077123456788",
          mobile2: "077123456789",
          fax: "Fax me",
          email: "beacons@beacons.com",
          isMain: "N",
          createUserId: "3748",
          createdDate: "2021-07-27T17:15:24",
          updateUserId: "3748",
          lastModifiedDate: "2021-07-27T17:15:24",
          versioning: 0,
        },
        {
          pkBeaconOwnerId: 231037,
          fkBeaconId: 6062,
          ownerName: "Mrs Beacon",
          companyName: "Beacon house",
          careOf: "Sideshow beacon",
          address1: "Bristol",
          address2: "Beacons",
          address3: "Beek",
          address4: "Me",
          country: "UNITED KINGDOM",
          postCode: "BS9 6GF",
          phone1: "077123456786",
          phone2: "077123456787",
          mobile1: "077123456788",
          mobile2: "077123456789",
          fax: "Fax me",
          email: "beacons@beacons.com",
          isMain: "N",
          createUserId: "3748",
          createdDate: "2021-07-27T17:15:24",
          updateUserId: "3748",
          lastModifiedDate: "2021-07-27T17:15:24",
          versioning: 0,
        },
      ],
      emergencyContact: {
        details:
          "MR BEACON BRIGHT, TEL: +33  608 635 542\n\nMATCOM F TEL: +870 635 681 852   FAX: +870 952 245 948\n\nVessel Email: beacon@my-beaconland.com",
      },
    },
  },
};
