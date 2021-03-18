import { Beacon, Owner } from "../types";

export class Registration {
  private _owner = {};
  private _beacons = [];

  public updateOwner(record: Partial<Owner>): void {
    Object.assign(this._owner, record);
  }

  public addBeacon(record: Partial<Beacon>): void {
    this._beacons.push(record);
  }

  public updateBeacon(number: number, record: Partial<Beacon>): void {
    Object.assign(this.beacon(number), record);
  }

  public owner(): Partial<Owner> {
    return this._owner;
  }

  public beacon(number: number): Partial<Beacon> {
    return this._beacons[number - 1];
  }
}
