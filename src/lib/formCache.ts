/* eslint-disable @typescript-eslint/no-explicit-any */
import { BeaconRegistration } from "./registration/registration";

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

  private _byIdToRegistration: Record<string, BeaconRegistration> = {};

  public init(id: string): void {
    this._byId[id] = {};
    this._byIdToRegistration[id] = new BeaconRegistration();
  }

  public update(id: string, formData: CacheEntry): void {
    formData = formData || {};
    const cache = this._byId[id];
    Object.assign(cache, formData);

    this._byIdToRegistration[id].update(formData);
  }

  public get(id: string): CacheEntry {
    return this._byId[id] || {};
  }
}
