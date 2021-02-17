import { FieldValidator } from "./fieldValidator";

export class FormValidator {
  private _fields: FieldValidator[];

  constructor(...fields: FieldValidator[]) {
    this._fields = fields;
  }

  hasError(): boolean {
    return this._fields.some((field) => {
      return field.hasError();
    });
  }

  getField(fieldId: string): FieldValidator {
    return this._fields.find((field) => field.fieldId === fieldId);
  }
}
