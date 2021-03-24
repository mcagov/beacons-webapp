import { CacheEntry } from "../formCache";
import { initBeacon } from "./registrationUtils";
import { Registration } from "./types";

export class BeaconRegistration {
  private _registration: Registration;
  private _beaconKeyMask: string[] = ["uses"];

  constructor() {
    this._registration = initBeacon();
  }

  public get registration(): Registration {
    return this._registration;
  }

  public update(formData: CacheEntry): void {
    Object.keys(this._registration)
      .filter((key: string) => this._beaconKeyMask.includes(key))
      .forEach((key: string) => {});
  }
}
