import { Registration } from "./registration";
import {
  Aircraft,
  Beacon,
  BeaconInformation,
  BeaconUse,
  EmergencyContacts,
  Owner,
  Vessel,
  VesselCommunications,
} from "./types";

type BeaconModel = Beacon &
  BeaconInformation &
  Owner &
  Vessel &
  VesselCommunications &
  Aircraft &
  EmergencyContacts &
  BeaconUse;

// Convenience type
export type CacheEntry = Record<string, any>;

export interface IFormCache {
  init(id: string);

  update(id: string, formData: CacheEntry): void;

  get(id: string): CacheEntry;
}

export class FormCacheFactory {
  private static _state: FormCache = null;

  public static getCache(): FormCache {
    if (this._state === null) {
      this._state = new FormCache();
    }

    return this._state;
  }
}

class FormCache implements IFormCache {
  private _byId: Record<string, CacheEntry> = {};

  private _byIdToRegistration: Record<string, Registration> = {};

  public init(id: string): void {
    this._byId[id] = {};
    this._byIdToRegistration[id] = new Registration();
  }

  public update(id: string, formData: CacheEntry): void {
    formData = formData || {};
    const cache = this._byId[id];
    Object.assign(cache, formData);

    this.updateUse(cache, formData);
  }

  private updateUse(cache: CacheEntry, formData: CacheEntry): void {
    const useIndex = formData.useIndex;

    if (useIndex >= 0) {
      cache.uses = cache.uses || [];

      let use = cache.uses[useIndex] || {};
      Object.assign(use, formData);
    }
  }

  public get(id: string): CacheEntry {
    return this._byId[id] || {};
  }
}
