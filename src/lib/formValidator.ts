import { IFieldValidator } from "./fieldValidator";

export class FormValidator {
  private _fields: IFieldValidator[];

  constructor(...fields: IFieldValidator[]) {
    this._fields = fields;
  }

  public hasError(): boolean {
    return this._fields.some((field) => {
      return field.hasError();
    });
  }

  public field(fieldId: string): IFieldValidator {
    const requestedField = this._fields.find((field) => field.id === fieldId);
    if (requestedField === undefined)
      throw new ReferenceError("Field does not exist in form");

    return requestedField;
  }
}
