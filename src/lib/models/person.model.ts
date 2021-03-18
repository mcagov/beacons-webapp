export class Person {
  private readonly structure = {
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
  };
  private values;

  constructor(ownerJson) {
    this.values = {
      name: ownerJson.beaconOwnerFullName ? ownerJson.beaconOwnerFullName : "",
      email: ownerJson.beaconOwnerEmail ? ownerJson.beaconOwnerEmail : "",
      telephoneNumber: ownerJson.beaconOwnerTelephoneNumber
        ? ownerJson.beaconOwnerTelephoneNumber
        : "",
      altTelephoneNumber: ownerJson.beaconOwnerAlternativeTelephoneNumber
        ? ownerJson.beaconOwnerAlternativeTelephoneNumber
        : "",
      address: {
        line1: ownerJson.beaconOwnerAddressLine1
          ? ownerJson.beaconOwnerAddressLine1
          : "",
        line2: ownerJson.beaconOwnerAddressLine2
          ? ownerJson.beaconOwnerAddressLine2
          : "",
        townOrCity: ownerJson.beaconOwnerTownOrCity
          ? ownerJson.beaconOwnerTownOrCity
          : "",
        county: ownerJson.beaconOwnerCounty ? ownerJson.beaconOwnerCounty : "",
        postcode: ownerJson.beaconOwnerPostcode
          ? ownerJson.beaconOwnerPostcode
          : "",
      },
    };
  }

  public deserialize() {
    return this.values;
  }
}
