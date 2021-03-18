export class Registration {
  constructor(registrationJson) {}

  public deserialize() {
    return {
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
    };
  }

  public update(registrationJson) {
    // TODO take flat object and update internal structured data
    // E.g. user adds a beacon, create a new Beacon object and add to Registration
  }
}
