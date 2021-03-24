import { BeaconRegistration } from "../../../src/lib/registration/registration";
import { initBeacon } from "../../../src/lib/registration/registrationUtils";

describe("Registration", () => {
  let registration: BeaconRegistration;

  beforeEach(() => {
    registration = new BeaconRegistration();
  });

  it("should handle null form data", () => {
    registration.update(null);
    expect(registration.registration).toStrictEqual(initBeacon());
  });

  it("should handle undefined form data", () => {
    registration.update(undefined);
    expect(registration.registration).toStrictEqual(initBeacon());
  });
});
