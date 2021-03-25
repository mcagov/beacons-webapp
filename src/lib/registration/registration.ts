import { CacheEntry } from "../formCache";
import { initBeacon, initBeaconUse } from "./registrationUtils";
import { IRegistration } from "./types";

type Indexes = {
  useIndex: number;
};

export class Registration {
  private static readonly USES_KEY = "uses";

  public registration: IRegistration;

  constructor() {
    this.registration = initBeacon();
  }

  public getFlattenedRegistration(indexes: Indexes): CacheEntry {
    let flattenedRegistration = { ...this.registration };
    delete flattenedRegistration.uses;

    const useIndex = this._parseUseIndex(indexes?.useIndex);
    const use = this.registration.uses[useIndex];
    flattenedRegistration = { ...flattenedRegistration, ...use };

    return flattenedRegistration;
  }

  public update(formData: CacheEntry): void {
    formData = formData || {};
    this._updateBeacon(formData);
    this._updateUse(formData);
  }

  private _updateBeacon(formData: CacheEntry): void {
    Object.keys(formData)
      .filter((key: string) => !(key === Registration.USES_KEY))
      .forEach((key: string) => {
        if (key in this.registration) {
          const value = formData[key];
          this.registration[key] = value;
        }
      });
  }

  private _updateUse(formData: CacheEntry): void {
    const useIndex = this._parseUseIndex(formData.useIndex);

    let use = this.registration.uses[useIndex];

    if (!use) {
      use = initBeaconUse();
      this.registration.uses.splice(useIndex, 1, use);
    }

    this._updateKeysFor(formData, use);
  }

  private _parseUseIndex(useIndex: number): number {
    useIndex = useIndex || 0;
    const beaconUseLength = this.registration.uses.length - 1;
    return Math.min(useIndex, beaconUseLength);
  }

  private _updateKeysFor(
    formData: CacheEntry,
    toUpdate: Record<string, any>
  ): void {
    Object.keys(formData).forEach((key: string) => {
      if (key in toUpdate) {
        const value = formData[key];
        toUpdate[key] = value;
      }
    });
  }
}
