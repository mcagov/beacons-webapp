import { FormManager } from "./form/formManager";
import { CacheEntry } from "./formCache";

export interface Registration {
  manufacturer: string;
  model: string;
  hexId: string;

  manufacturerSerialNumber: string;
  chkCode: string;
  batteryExpiryDate: string;
  batteryExpiryDateMonth: string;
  batteryExpiryDateYear: string;
  lastServicedDate: string;
  lastServicedDateMonth: string;
  lastServicedDateYear: string;

  uses: BeaconUse[];
}

export interface BeaconUse {
  environment: string;
  purpose: string;
  activity: string;
}

export enum BeaconEnvionment {
  MARITIME = "MARITIME",
  AVIATION = "AVIATION",
  LAND = "LAND",
  OTHER = "OTHER",
}

export class Registration {
  // A form representation for a beacon registration.
  private beacon: Record<string, any> = getBeaconForm();

  constructor() {}

  /**
   * Public getter for the form this registration object manages.
   */
  public get form(): FormManager {
    return this._form;
  }

  public updateBeacon(formData: CacheEntry): void {
    this.form.updateValue(formData);

    const useIndex = formData.useIndex as number;

    if (useIndex) {
      this.updateUse(formData, useIndex);
    }
  }

  private updateUse(formData: CacheEntry, useIndex: number): void {
    // Handles creating the correct use type, if it does not already exist and updates the values.
  }

  public markAsPristine(): void {
    // Marks the form as `pristine` => resetting the form object this registration class manages.
  }

  public hasErrors(): void {}
}
