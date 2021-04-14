import { Registration } from "../../../src/lib/registration/registration";
import {
  initBeacon,
  initBeaconUse,
} from "../../../src/lib/registration/registrationInitialisation";
import { Environment } from "../../../src/lib/registration/types";

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
        environment: "",
        otherEnvironment: "",
        purpose: null,
        activity: "",
        otherActivity: "",
        callSign: "",
        vhfRadio: "",
        fixedVhfRadio: "",
        fixedVhfRadioValue: "",
        portableVhfRadio: "",
        portableVhfRadioValue: "",
        satelliteTelephone: "",
        satelliteTelephoneValue: "",
        mobileTelephone: "",
        mobileTelephone1: "",
        mobileTelephone2: "",
        otherCommunication: "",
        otherCommunicationValue: "",
        maxCapacity: "",
        vesselName: "",
        portLetterNumber: "",
        homeport: "",
        areaOfOperation: "",
        beaconLocation: "",
        imoNumber: "",
        ssrNumber: "",
        officialNumber: "",
        rigPlatformLocation: "",
        mainUse: true,
        aircraftManufacturer: "",
        principalAirport: "",
        secondaryAirport: "",
        registrationMark: "",
        hexAddress: "",
        cnOrMsnNumber: "",
        dongle: "",
        beaconPosition: "",
        workingRemotelyLocation: "",
        workingRemotelyPeopleCount: "",
        windfarmLocation: "",
        windfarmPeopleCount: "",
        otherActivityLocation: "",
        otherActivityPeopleCount: "",
        moreDetails: "",
      };

      owner = {
        fullName: "",
        email: "",
        telephoneNumber: "",
        alternativeTelephoneNumber: "",
        townOrCity: "",
        county: "",
        postcode: "",
      };

      registration.update(beacon);
    });

    it("should serialise the registration for sending to the API", () => {
      const expected = {
        beacons: [{ ...beacon, owner: { ...owner }, emergencyContacts: [] }],
      };
      const json = registration.serialiseToAPI();

      expect(json).toMatchObject(expected);
      expect(json.beacons[0].uses.length).toBe(1);
      expect(json.beacons[0].emergencyContacts.length).toBe(0);
    });

    it("should serialise the use", () => {
      const json = registration.serialiseToAPI();
      expect(json.beacons[0].uses[0]).toStrictEqual(use);
    });

    it("should serialise multiple uses", () => {
      registration.createUse();
      const json = registration.serialiseToAPI();

      expect(json.beacons[0].uses.length).toBe(2);
    });

    it("should serialise an emergency contact if the values are defined", () => {
      const emergencyContacts = {
        emergencyContact1FullName: "Mrs Beacon",
        emergencyContact1TelephoneNumber: "0117823456",
        emergencyContact1AlternativeTelephoneNumber: "0117823456",
      };
      registration.update(emergencyContacts);

      const json = registration.serialiseToAPI();
      expect(json.beacons[0].emergencyContacts.length).toBe(1);
    });

    it("should serialise all emergency contacts if the values are defined", () => {
      const emergencyContacts = {
        emergencyContact1FullName: "Mrs Beacon",
        emergencyContact1TelephoneNumber: "0117823456",
        emergencyContact1AlternativeTelephoneNumber: "0117823456",
        emergencyContact2FullName: "Mr Beacon",
        emergencyContact2TelephoneNumber: "0117823456",
        emergencyContact2AlternativeTelephoneNumber: "0117823456",
        emergencyContact3FullName: "Beacon",
        emergencyContact3TelephoneNumber: "0117823456",
        emergencyContact3AlternativeTelephoneNumber: "0117823456",
      };
      registration.update(emergencyContacts);

      const json = registration.serialiseToAPI();
      expect(json.beacons[0].emergencyContacts.length).toBe(3);
    });
  });
});
