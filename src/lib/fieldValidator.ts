export interface IFieldValidator {
  validate(value: string): IFieldValidationResponse;
}

export interface IFieldValidationResponse {
  value: string;
  errorMessages: string[];
  valid: boolean;
  invalid: boolean;
}

export interface IFieldRule {
  errorMessage: string;
  errorIf: (valueToValidate: string) => boolean;
}

export abstract class FieldValidator implements IFieldValidator {
  protected _rules: IFieldRule[];

  validate(value: string): IFieldValidationResponse {
    return {
      value: value,
      valid: this.isValid(value),
      invalid: !this.isValid(value),
      errorMessages: this.errorMessages(value),
    };
  }

  static valueViolatesRule(value: string, rule: IFieldRule): boolean {
    return rule.errorIf(value);
  }

  private isValid(value: string): boolean {
    return !this._rules.some((rule) =>
      FieldValidator.valueViolatesRule(value, rule)
    );
  }

  private errorMessages(value: string): string[] {
    return this._rules
      .filter((rule) => FieldValidator.valueViolatesRule(value, rule))
      .map((rule) => rule.errorMessage);
  }
}
