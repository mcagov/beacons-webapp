import { fieldValidatorLookup } from "./field-validators";
import { IFieldValidationResponse, IFieldValidator } from "./fieldValidator";

export interface IFormError {
  fieldName: string;
  errorMessages: string[];
}

export class FormValidator {
  private static defaultResponseIfFieldNameNotInFormData: IFieldValidationResponse = {
    value: "",
    valid: true,
    invalid: false,
    errorMessages: [],
  };

  public static validate(
    formData: Record<string, string>,
    validatorLookup: Record<string, IFieldValidator> = fieldValidatorLookup
  ): Record<string, IFieldValidationResponse> {
    const fields = this.getFields(validatorLookup, formData);

    return this.applyValidatorsToFields(fields, validatorLookup);
  }

  public static errorSummary(
    formData: Record<string, string>,
    validatorLookup: Record<string, IFieldValidator> = fieldValidatorLookup
  ): IFormError[] {
    const validatedFields = Object.entries(
      this.validate(formData, validatorLookup)
    );

    return validatedFields
      .filter(([, fieldName]) => fieldName.invalid)
      .map(([fieldName, field]) => {
        return { fieldName: fieldName, errorMessages: field.errorMessages };
      });
  }

  public static hasErrors(
    formData: Record<string, string>,
    validatorLookup: Record<string, IFieldValidator> = fieldValidatorLookup
  ): boolean {
    return this.errorSummary(formData, validatorLookup).length > 0;
  }

  private static getFields(
    validatorLookup: Record<string, IFieldValidator>,
    formData: Record<string, string>
  ) {
    return Object.keys(validatorLookup).map((fieldName) => [
      fieldName,
      fieldName in formData ? formData[fieldName] : "",
    ]);
  }

  private static applyValidatorsToFields(
    fields: string[][],
    validatorLookup: Record<string, IFieldValidator>
  ) {
    return fields.reduce((validatorResponse, [fieldName, value]) => {
      validatorResponse[fieldName] = {
        ...(fieldName in validatorLookup
          ? { ...validatorLookup[fieldName].validate(value) }
          : this.defaultResponseIfFieldNameNotInFormData),
      };

      return validatorResponse;
    }, {});
  }

  private FormValidator() {
    // Prevent external instantiation.
  }
}
