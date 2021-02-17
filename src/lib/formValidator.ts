import { IFieldValidator } from "./fieldValidator";

export interface FormErrors {
  linkedFieldId: string;
  messages: string[];
}

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

  public isValid(): boolean {
    return !this.hasError();
  }

  public field(fieldId: string): IFieldValidator {
    const requestedField = this._fields.find((field) => field.id === fieldId);
    if (requestedField === undefined)
      throw new ReferenceError("Field does not exist in form");

    return requestedField;
  }

  public updateValues(newValues: Record<string, string>): void {
    Object.keys(newValues).forEach((fieldId) => {
      this.field(fieldId).value = newValues[fieldId];
    });
  }

  public errors(): FormErrors[] {
    return this._fields
      .filter((field) => field.hasError())
      .map((fieldWithError) => {
        return {
          linkedFieldId: fieldWithError.id,
          messages: fieldWithError.errorMessages(),
        };
      });
  }
}
