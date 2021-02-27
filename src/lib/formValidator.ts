import { fieldValidatorLookup } from "./field-validators";
import {
  IClassBasedValidator,
  IFieldValidationResponse,
} from "./fieldValidator";
import { IFunctionalValidator } from "./validatorFunctions";

export interface IFormError {
  fieldName: string;
  errorMessages: string[];
}

export type Validator = Partial<IClassBasedValidator & IFunctionalValidator>;

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
    return Object.keys(validatorLookup).reduce((fields, fieldName) => {
      fields[fieldName] = fieldName in formData ? formData[fieldName] : "";
      return fields;
    }, {});
  }

  private static applyValidators(
    fields: Record<string, string>,
    validatorLookup: Record<string, Validator>
  ) {
    return Object.entries(fields).reduce(
      (validatorResponse, [fieldName, value]) => {
        validatorResponse[fieldName] = {
          ...(fieldName in validatorLookup &&
          this.shouldValidate(fieldName, validatorLookup, fields)
            ? this.validateField(validatorLookup, fieldName, value)
            : this.defaultResponseIfFieldNameNotInFormData),
        };

        return validatorResponse;
      },
      {}
    );
  }

  private static shouldValidate(
    fieldName,
    validatorLookup: Record<string, Validator>,
    fields: Record<string, string>
  ) {
    if (this.hasCondition(fieldName, validatorLookup)) {
      const fieldConditions = validatorLookup[fieldName].applyRulesIf;

      return fieldConditions.every((condition) => {
        const dependentFieldValue = fields[condition.fieldName];
        return condition.meetsConditions.every((rule) =>
          rule(dependentFieldValue)
        );
      });
    }

    return true;
  }

  private static hasCondition(fieldName, validatorLookup) {
    return (
      fieldName in validatorLookup &&
      "applyRulesIf" in validatorLookup[fieldName]
    );
  }

  private static validateField(
    // TODO: Change `any` for `IFieldRule[]` when type guard removed
    validatorLookup: Record<string, Validator>,
    fieldName: string,
    value: string
  ) {
    if ("validate" in validatorLookup[fieldName]) {
      // TODO: Remove type guard when class-based validators are superseded
      return { ...validatorLookup[fieldName].validate(value) };
    }

    const rules = validatorLookup[fieldName].rules;

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
