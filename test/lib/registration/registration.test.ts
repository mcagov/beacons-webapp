import { Registration } from "../../../src/lib/registration/registration";
import {
  initBeacon,
  initBeaconUse,
} from "../../../src/lib/registration/registrationInitialisation";
import {
  Activity,
  Environment,
  Purpose,
} from "../../../src/lib/registration/types";

describe("Registration", () => {
  let registration: Registration;

  beforeEach(() => {
    registration = new Registration();
  });

  describe("updating beacon information", () => {
    it("should handle null form data", () => {
      registration.update(null);

      expect(registration.registration).toStrictEqual(initBeacon());
    });

    it("should handle undefined form data", () => {
      registration.update(undefined);

      expect(registration.registration).toStrictEqual(initBeacon());
    });

    it("should update the values from the form data", () => {
      const formData = { hexId: "Hex" };
      registration.update(formData);

      expect(registration.registration.hexId).toBe("Hex");
    });

    it("should not update the registration with fields that are not valid keys for a beacon registration", () => {
      const formData = {
        hexId: "Hex",
        foo: "bar",
      };
      registration.update(formData);

      expect(registration.registration["foo"]).toBeUndefined();
    });

    it("should not overwrite the beacon uses array", () => {
      const formData = { uses: "Is not an array" } as any;
      registration.update(formData);

      expect(registration.registration.uses).toBeInstanceOf(Array);
    });
  });

  describe("creating beacon uses", () => {
    it("should create an additional beacon use", () => {
      registration.createUse();
      expect(registration.registration.uses.length).toBe(2);
    });

    it("should not alter the existing beacon use", () => {
      const formData = { environment: Environment.MARITIME };
      registration.update(formData);
      registration.createUse();

      expect(registration.registration.uses[0].environment).toBe(
        Environment.MARITIME
      );
    });
  });

  describe("updating beacon uses", () => {
    it("should update a beacon use with the values provided at the given index", () => {
      const formData = { useIndex: 0, environment: Environment.MARITIME };
      registration.update(formData);

      expect(registration.registration.uses.length).toBe(1);
      expect(registration.registration.uses[0].environment).toBe(
        Environment.MARITIME
      );
    });

    it("should update the first beacon use if no index is provided and there are two beacon uses", () => {
      registration.registration.uses.push(initBeaconUse());
      const formData = { environment: Environment.MARITIME };
      registration.update(formData);

      expect(registration.registration.uses.length).toBe(2);
      expect(registration.registration.uses[0].environment).toBe(
        Environment.MARITIME
      );
    });

    it("should update the latest beacon use if the index is greater than the length of the beacon use array", () => {
      const formData = {
        useIndex: 100,
        environment: Environment.MARITIME,
      };
      registration.update(formData);

      expect(registration.registration.uses.length).toBe(1);
      expect(registration.registration.uses[0].environment).toBe(
        Environment.MARITIME
      );
    });
  });

  describe("flattening the registration object", () => {
    it("should flatten the registration and return the first use if no index is provided", () => {
      const formData = { environment: Environment.MARITIME };
      registration.update(formData);

      expect(
        registration.getFlattenedRegistration({ useIndex: null }).environment
      ).toBe(Environment.MARITIME);
    });

    it("should flatten the registration and return use objects as top level keys", () => {
      const formData = { useIndex: 0, environment: Environment.MARITIME };
      registration.update(formData);

      expect(
        registration.getFlattenedRegistration({ useIndex: 0 }).environment
      ).toBe(Environment.MARITIME);
    });

    it("should return the latest beacon use information if the index is greater than the length of the array", () => {
      registration.registration.uses.push(initBeaconUse());
      const formData = { useIndex: 1, environment: Environment.MARITIME };
      registration.update(formData);

      expect(
        registration.getFlattenedRegistration({ useIndex: 100 }).environment
      ).toBe(Environment.MARITIME);
    });

    it("should remove the uses key from the flattened object", () => {
      expect(
        registration.getFlattenedRegistration({ useIndex: 0 }).uses
      ).toBeUndefined();
    });
  });

  describe("serialising the registration for the API", () => {
    let beacon;
    let use;
    let owner;
    let emergencyContact;
    let formData;

    beforeEach(() => {
      beacon = {
        model: "Trousers",
        hexId: "1D0",
        manufacturer: "ASOS",
        referenceNumber: "ADBEFD",
        manufacturerSerialNumber: "1234",
        chkCode: "check",
        batteryExpiryDate: "2020-02-01",
        lastServicedDate: "2020-02-01",
      };
      use = {
        environment: Environment.MARITIME,
        otherEnvironment: "",
        activity: Activity.OTHER,
        otherActivity: "On my boat",
        callSign: "callSign",
        vhfRadio: false,
        fixedVhfRadio: false,
        fixedVhfRadioValue: "0117",
        portableVhfRadio: false,
        portableVhfRadioValue: "0118",
        satelliteTelephone: false,
        satelliteTelephoneValue: "0119",
        mobileTelephone: false,
        mobileTelephone1: "01178123456",
        mobileTelephone2: "01178123457",
        otherCommunication: false,
        otherCommunicationValue: "Via email",
        maxCapacity: 22,
        vesselName: "My lucky boat",
        portLetterNumber: "12345",
        homeport: "Bristol",
        areaOfOperation: "Newport",
        beaconLocation: "In my carry bag",
        imoNumber: "123456",
        ssrNumber: "123456",
        officialNumber: "123456",
        rigPlatformLocation: "On the rig",
        mainUse: true,
        aircraftManufacturer: "Boeing",
        principalAirport: "Bristol",
        secondaryAirport: "Cardiff",
        registrationMark: "Reg mark",
        hexAddress: "123456",
        cnOrMsnNumber: "123456",
        dongle: false,
        beaconPosition: "Carry bag",
        workingRemotelyLocation: "Bristol",
        workingRemotelyPeopleCount: "10",
        windfarmLocation: "10",
        windfarmPeopleCount: "10",
        otherActivityLocation: "Taunton",
        otherActivityPeopleCount: "10",
        moreDetails: "Blue boat, tracked in SafeTrx",
      };

      owner = {
        fullName: "Mrs Martha",
        email: "martha@mca.gov.uk",
        telephoneNumber: "0117892136545",
        alternativeTelephoneNumber: "0117892136545",
        addressLine1: "6",
        addressLine2: "Points West",
        townOrCity: "Bristol",
        county: "Bristol",
        postcode: "BS17YG",
      };

      emergencyContact = {
        fullName: "Mrs Beacon",
        telephoneNumber: "0117823456",
        alternativeTelephoneNumber: "0117823457",
      };

      formData = {
        ...beacon,
        ...use,
        fixedVhfRadioInput: use.fixedVhfRadioValue,
        portableVhfRadioInput: use.portableVhfRadioValue,
        otherCommunicationInput: use.otherCommunicationValue,
        satelliteTelephoneInput: use.satelliteTelephoneValue,
        mobileTelephoneInput1: use.mobileTelephone1,
        mobileTelephoneInput2: use.mobileTelephone2,
        otherActivityText: use.otherActivity,
        ownerFullName: owner.fullName,
        ownerEmail: owner.email,
        ownerTelephoneNumber: owner.telephoneNumber,
        ownerAlternativeTelephoneNumber: owner.alternativeTelephoneNumber,
        ownerAddressLine1: owner.addressLine1,
        ownerAddressLine2: owner.addressLine2,
        ownerTownOrCity: owner.townOrCity,
        ownerCounty: owner.county,
        ownerPostcode: owner.postcode,
        emergencyContact1FullName: emergencyContact.fullName,
        emergencyContact1TelephoneNumber: emergencyContact.telephoneNumber,
        emergencyContact1AlternativeTelephoneNumber:
          emergencyContact.alternativeTelephoneNumber,
        emergencyContact2FullName: emergencyContact.fullName,
        emergencyContact2TelephoneNumber: emergencyContact.telephoneNumber,
        emergencyContact2AlternativeTelephoneNumber:
          emergencyContact.alternativeTelephoneNumber,
        emergencyContact3FullName: emergencyContact.fullName,
        emergencyContact3TelephoneNumber: emergencyContact.telephoneNumber,
        emergencyContact3AlternativeTelephoneNumber:
          emergencyContact.alternativeTelephoneNumber,
      };

      registration.update(formData);
    });

    it("should serialise the registration for sending to the API", () => {
      const expected = {
        beacons: [
          {
            ...beacon,
            uses: [use],
            owner: { ...owner },
            emergencyContacts: [
              emergencyContact,
              emergencyContact,
              emergencyContact,
            ],
          },
        ],
      };
      const json = registration.serialiseToAPI();

      expect(json).toMatchObject(expected);
      expect(json.beacons[0].uses.length).toBe(1);
      expect(json.beacons[0].emergencyContacts.length).toBe(3);
    });

    it("should serialise a second use", () => {
      registration.createUse();
      registration.update({ useIndex: 1, ...formData });
      const json = registration.serialiseToAPI();
      use.mainUse = false;

      expect(json.beacons[0].uses.length).toBe(2);
      expect(json.beacons[0].uses[1]).toStrictEqual(use);
    });

    it("should serialise the purpose if it is defined", () => {
      registration.update({ purpose: Purpose.PLEASURE });
      use["purpose"] = Purpose.PLEASURE;
      const json = registration.serialiseToAPI();

      expect(json.beacons[0].uses[0]).toStrictEqual(use);
    });

    it("should not serialise the max capacity if it is not a number", () => {
      registration.update({ maxCapacity: "not a number" });
      delete use.maxCapacity;
      const json = registration.serialiseToAPI();

      expect(json.beacons[0].uses[0]).toStrictEqual(use);
    });

    it("should not serialise the max capacity if it is not a whole number", () => {
      registration.update({ maxCapacity: "0.112" });
      delete use.maxCapacity;
      const json = registration.serialiseToAPI();

      expect(json.beacons[0].uses[0]).toStrictEqual(use);
    });
  });
});
