import { Person } from "../../../src/lib/models/person.model";

describe("Owner model", () => {
  xdescribe("serialize/deserialize", () => {
    it("deserializes an empty object", () => {
      const owner = new Person({});

      const deserialized = owner.deserialize();

      expect(deserialized).toEqual({
        name: "",
        email: "",
        telephoneNumber: "",
        altTelephoneNumber: "",
        address: {
          line1: "",
          line2: "",
          townOrCity: "",
          county: "",
          postcode: "",
        },
      });
    });

    it("deserializes an object with the Owner's name", () => {
      const owner = new Person({
        beaconOwnerFullName: "Maverick",
      });

      const deserialized = owner.deserialize();

      expect(deserialized).toEqual({
        name: "Maverick",
        email: "",
        telephoneNumber: "",
        altTelephoneNumber: "",
        address: {
          line1: "",
          line2: "",
          townOrCity: "",
          county: "",
          postcode: "",
        },
      });
    });
  });
});
