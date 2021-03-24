/* eslint-disable @typescript-eslint/no-explicit-any */

import { Registration } from "./registration/registration";
import { IRegistration } from "./registration/types";

type Indexes = { beaconIndex: number; useIndex: number };

// Convenience type
export type CacheEntry = Partial<IRegistration & Indexes>;

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

  private _byIdToRegistration: Record<string, Registration> = {};

  public update(id: string, formData: CacheEntry = {}): void {
    this._byId[id] = this._byId[id] || {};
    Object.assign(this._byId[id], formData);

    this._byIdToRegistration[id] =
      this._byIdToRegistration[id] || new Registration();

    this._byIdToRegistration[id].update(formData);
  }

  public get(id: string): CacheEntry {
    return this._byId[id] || {};
  }
}
