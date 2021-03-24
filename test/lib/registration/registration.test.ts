import { Registration } from "../../../src/lib/registration/registration";
import { initBeacon } from "../../../src/lib/registration/registrationUtils";

describe("Registration", () => {
  let registration: Registration;

  beforeEach(() => {
    registration = new Registration();
  });

  it("should handle null form data", () => {
    registration.update(null);
    expect(registration.registration).toStrictEqual(initBeacon());
  });

  it("should handle undefined form data", () => {
    registration.update(undefined);
    expect(registration.registration).toStrictEqual(initBeacon());
  });

  it("should update the values within the form data", () => {
    const formData = { hexId: "Hex" };
    registration.update(formData);
    expect(registration.registration.hexId).toBe("Hex");
  });

  it("should not update the registration with fields that are not valid keys for a beacon registration", () => {
    const formData = { hexId: "Hex", foo: "bar" };
    registration.update(formData);
    expect(registration.registration["foo"]).toBeUndefined();
  });

  it("should not write over the uses array", () => {
    const formData = { uses: "Is not an array" };
    registration.update(formData);
    expect(registration.registration.uses).toStrictEqual([]);
  });

  xit("should create the correct beacon use based on the type", () => {});
});
