import { CacheEntry } from "../formCache";
import { initBeacon } from "./registrationUtils";
import { IRegistration } from "./types";

export class Registration {
  public registration: IRegistration;
  private _keyMask: string[] = ["uses"];

  constructor() {
    this.registration = initBeacon();
  }

  public update(formData: CacheEntry): void {
    formData = formData || {};
    this._updateBeacon(formData);
    this._updateUse(formData);
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

  private _updateUse(formData: CacheEntry): void {
    let useIndex = formData.useIndex;

    if (useIndex >= 0) {
      useIndex = Math.max(0, this.registration.uses.length);
      const use = this.registration.uses[useIndex];
    }
  }

  private _updateKeysFor(
    formData: CacheEntry,
    toUpdate: Record<string, string>
  ): void {
    Object.keys(formData).forEach((key: string) => {
      if (key in toUpdate) {
        const value = formData[key];
        toUpdate[key] = value;
      }
    });
  }
}
