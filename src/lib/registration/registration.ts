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
    formData = formData || {};

    Object.keys(formData)
      .filter((key: string) => !this._beaconKeyMask.includes(key))
      .forEach((key: string) => {
        if (key in this._registration) {
          const value = formData[key];
          this._registration[key] = value;
        }
      });
  }
}
