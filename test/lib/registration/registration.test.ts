import { Registration } from "../../../src/lib/registration/registration";
import { initBeacon } from "../../../src/lib/registration/registrationUtils";
import { BeaconEnvionment } from "../../../src/lib/registration/types";

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

  it("should update the values from the form data", () => {
    const formData = { hexId: "Hex" };
    registration.update(formData);
    expect(registration.registration.hexId).toBe("Hex");
  });

  it("should not update the registration with fields that are not valid keys for a beacon registration", () => {
    const formData = { hexId: "Hex", foo: "bar" };
    registration.update(formData);
    expect(registration.registration["foo"]).toBeUndefined();
  });

  it("should not overwrite the beacon uses array", () => {
    const formData = { uses: "Is not an array" } as any;
    registration.update(formData);
    expect(registration.registration.uses).toStrictEqual([]);
  });

  it("should create a beacon use if none exists", () => {
    const formData = { useIndex: 0, environment: BeaconEnvionment.MARITIME };
    registration.update(formData);
    expect(registration.registration.uses.length).toBe(1);
  });

  it("should create a beacon use at the provided index if none exists", () => {
    const formData = { useIndex: 1, environment: BeaconEnvionment.MARITIME };
    registration.registration.uses.push({});
    registration.update(formData);
    expect(registration.registration.uses.length).toBe(2);
  });

  it("should not add a beacon use if the index is greater than the index provided", () => {
    const formData = { useIndex: 2, environment: BeaconEnvionment.MARITIME };
    registration.update(formData);
    expect(registration.registration.uses.length).toBe(1);
  });
});
