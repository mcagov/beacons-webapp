import { CacheEntry } from "../formCache";
import { IRegistration } from "./types";
import { initBeacon } from "./utils";

export class Registration {
  private _beacon: IRegistration;

  constructor() {
    this._beacon = initBeacon();
  }

  public update(formData: CacheEntry): void {}
}
