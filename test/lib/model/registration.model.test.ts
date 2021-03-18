import { Registration } from "../../../src/lib/model/registration.model";

describe("The Registration object", () => {
  let registration;

  beforeEach(() => {
    registration = new Registration();
  });

  it("can be instantiated with no arguments so data can be added as the user progresses", () => {
    expect(() => new Registration()).not.toThrowError();
  });

  describe("Registration > Owner", () => {
    it("can add some owner's details", () => {
      const owner = {
        beaconOwnerFullName: "Admiral Sir Lord Horatio Nelson RN",
        beaconOwnerEmail: "nelson@royalnavy.mod.uk",
      };

      registration.updateOwner(owner);

      expect(registration.owner()).toEqual(owner);
    });

    it("can overwrite existing owner's details", () => {
      const existingOwnerDetails = {
        beaconOwnerFullName: "Admiral Sir Lord Horatio Nelson RN",
        beaconOwnerEmail: "nelson@royalnavy.mod.uk",
      };
      registration.updateOwner(existingOwnerDetails);
      const newOwnerDetails = {
        beaconOwnerFullName: "Blackbeard",
        beaconOwnerEmail: "blackbeard@iloverum.com",
      };

      registration.updateOwner(newOwnerDetails);

      expect(registration.owner()).toEqual(newOwnerDetails);
    });

    it("can add more owner details as the user progresses", () => {
      const ownerDetails = {
        beaconOwnerFullName: "Admiral Sir Lord Horatio Nelson RN",
        beaconOwnerEmail: "nelson@royalnavy.mod.uk",
      };
      registration.updateOwner(ownerDetails);
      const moreOwnerDetails = {
        beaconOwnerTelephoneNumber: "01203 129837",
      };
      registration.updateOwner(moreOwnerDetails);

      const receivedOwner = registration.owner();

      expect(receivedOwner).toEqual({
        ...ownerDetails,
        ...moreOwnerDetails,
      });
    });
  });

  describe("Registration > Beacons", () => {
    it("can add one partial beacon", () => {
      const beacon = {
        manufacturer: "Raleigh",
        model: "Chopper",
      };

      registration.addBeacon(beacon);

      expect(registration.beacon(1)).toEqual(beacon);
    });

    it("can update a partial beacon", () => {
      const initialBeacon = {
        manufacturer: "Raleigh",
        model: "Chopper",
      };
      const moreBeaconData = {
        hexId: "1D0EA08C52FFBFF",
      };
      registration.addBeacon(initialBeacon);

      registration.updateBeacon(1, moreBeaconData);

      expect(registration.beacon(1)).toEqual({
        ...initialBeacon,
        ...moreBeaconData,
      });
    });

    it("can add two beacons", () => {
      const beacon1 = {
        manufacturer: "Raleigh",
        model: "Chopper",
      };
      const beacon2 = {
        manufacturer: "Giant",
        model: "TCR",
      };

      registration.addBeacon(beacon1);
      registration.addBeacon(beacon2);

      expect(registration.beacon(1)).toEqual(beacon1);
      expect(registration.beacon(2)).toEqual(beacon2);
    });

    it("can update the second beacon", () => {
      const beacon1 = {
        manufacturer: "Raleigh",
        model: "Chopper",
      };
      const beacon2 = {
        manufacturer: "Giant",
        model: "TCR",
      };
      const moreBeacon2Data = {
        hexId: "1D0EA08C52FFBFF",
      };
      registration.addBeacon(beacon1);
      registration.addBeacon(beacon2);

      registration.updateBeacon(2, moreBeacon2Data);

      expect(registration.beacon(1)).toEqual(beacon1);
      expect(registration.beacon(2)).toEqual({
        ...beacon2,
        ...moreBeacon2Data,
      });
    });
  });
});
