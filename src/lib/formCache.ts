import { Registration } from "./model/registration.model";
import {
  Beacon,
  BeaconInformation,
  BeaconIntent,
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
  EmergencyContacts;

// Convenience type
export type CacheEntry = Partial<BeaconModel> & {
  beaconIntent?: BeaconIntent;
  registration?: Registration;
};

export interface IFormCache {
  update(id: string, formData?: CacheEntry): void;

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

  public update(
    id: string,
    formData: CacheEntry = { registration: new Registration() }
  ): void {
    this._byId[id] = this._byId[id] || { registration: new Registration() };
    Object.assign(this._byId[id], formData);
    console.log("just saved to cache: ", this._byId[id]);
  }

  public get(id: string): CacheEntry {
    console.log("just retrieved from cache: ", this._byId[id]);
    return this._byId[id] || {};
  }
}
