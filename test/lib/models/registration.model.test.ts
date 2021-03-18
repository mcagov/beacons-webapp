import { Registration } from "../../../src/lib/models/registration.model";

describe("Registration model", () => {
  xdescribe("serialize/deserialize", () => {
    it("deserializes an empty object", () => {
      const registration = new Registration({});

      const deserialized = registration.deserialize();

      expect(deserialized).toEqual({
        owner: {
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
        },
        beacons: [],
        emergencyContacts: [],
      });
    });

    it("deserializes a partial owner object", () => {
      const flatOwnerObject = {
        name: "Maverick",
      };
      const registration = new Registration(flatOwnerObject);

      const deserialized = registration.deserialize();

      expect(deserialized).toEqual({
        owner: {
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
        },
        beacons: [],
        emergencyContacts: [],
      });
    });
  });
});
