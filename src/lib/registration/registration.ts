import { CacheEntry } from "../formCache";
import { initBeacon } from "./registrationUtils";
import { IRegistration } from "./types";

/**
 * A class that represents a registration of beacons.
 */
export class Registration {
  public registration: IRegistration;
  private _keyMask: string[] = ["uses"];

  constructor() {
    this.registration = initBeacon();
  }

  public update(formData: CacheEntry): void {
    formData = formData || {};
    this._updateBeacon(formData);
  }

  private _updateBeacon(formData: CacheEntry): void {
    Object.keys(formData)
      .filter((key: string) => !this._keyMask.includes(key))
      .forEach((key: string) => {
        if (key in this.registration) {
          const value = formData[key];
          this.registration[key] = value;
        }
      });
  }
}
