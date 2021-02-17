import { IFieldValidator } from "./fieldValidator";

export class FormValidator {
  private _fields: IFieldValidator[];

  constructor(...fields: IFieldValidator[]) {
    this._fields = fields;
  }

  hasError(): boolean {
    return this._fields.some((field) => {
      return field.hasError();
    });
  }

  getField(fieldId: string): IFieldValidator {
    return this._fields.find((field) => field.fieldId === fieldId);
  }
}
