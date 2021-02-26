import { fieldValidatorLookup } from "./field-validators";
import {
  IFieldRule,
  IFieldValidationResponse,
  IFieldValidator,
} from "./fieldValidator";

export interface IFormError {
  fieldName: string;
  errorMessages: string[];
}

export type Validator = IFieldValidator | IFieldRule[];

export class FormValidator {
  private static defaultResponseIfFieldNameNotInFormData: IFieldValidationResponse = {
    value: "",
    valid: true,
    invalid: false,
    errorMessages: [],
  };

  public static validate(
    formData: Record<string, string>,
    validatorLookup: Record<string, Validator> = fieldValidatorLookup
  ): Record<string, IFieldValidationResponse> {
    const fields = this.getFields(validatorLookup, formData);

    return this.applyValidators(fields, validatorLookup);
  }

  public static errorSummary(
    formData: Record<string, string>,
    validatorLookup: Record<string, Validator> = fieldValidatorLookup
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
    validatorLookup: Record<string, Validator> = fieldValidatorLookup
  ): boolean {
    return this.errorSummary(formData, validatorLookup).length > 0;
  }

  private static getFields(
    validatorLookup: Record<string, Validator>,
    formData: Record<string, string>
  ) {
    return Object.keys(validatorLookup).map((fieldName) => [
      fieldName,
      fieldName in formData ? formData[fieldName] : "",
    ]);
  }

  private static applyValidators(
    fields: string[][],
    validatorLookup: Record<string, Validator>
  ) {
    return fields.reduce((validatorResponse, [fieldName, value]) => {
      validatorResponse[fieldName] = {
        ...(fieldName in validatorLookup
          ? this.validateField(validatorLookup, fieldName, value)
          : this.defaultResponseIfFieldNameNotInFormData),
      };

      return validatorResponse;
    }, {});
  }

  private static validateField(
    // TODO: Change `any` for `IFieldRule[]` when type guard removed
    validatorLookup: Record<string, any>,
    fieldName: string,
    value: string
  ) {
    if ("validate" in validatorLookup[fieldName]) {
      // TODO: Remove type guard when class-based validators are superseded
      return { ...validatorLookup[fieldName].validate(value) };
    }

    const rules = validatorLookup[fieldName];

    return {
      value: value,
      valid: !rules.some((rule) => rule.errorIf(value)),
      invalid: rules.some((rule) => rule.errorIf(value)),
      errorMessages: rules
        .filter((rule) => rule.errorIf(value))
        .map((rule) => rule.errorMessage),
    };
  }

  private FormValidator() {
    // Prevent external instantiation.
  }
}
