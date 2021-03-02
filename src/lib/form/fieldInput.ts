import { AbstractFormNode } from "./abstractFormNode";
import { ValidationRule } from "./validators";

/**
 * This class is responsible for managing the value of a form input and can run validation rules, and calculate status of the field input.
 */
export class FieldInput extends AbstractFormNode {
  constructor(value: string, validators: ValidationRule[] = []) {
    value = value ? value : "";
    super(value, validators);
  }

  /**
   * Public getter for the value this input manages.
   * @override
   */
  public get value(): string {
    return this._value as string;
  }

  /**
   * Validates this control against the validation rules.
   *
   * @returns {string[]}   The array of error messages
   */
  public errorMessages(): string[] {
    const validators = this.pristine ? [] : this.validators;

    return validators
      .filter((rule: ValidationRule) => rule.applies(this.value))
      .map((rule: ValidationRule) => rule.errorMessage);
  }

  /**
   * Determines if the control has any errors.
   */
  public hasErrors(): boolean {
    if (this.pristine) {
      return false;
    }

    return this.validators.some((rule: ValidationRule) =>
      rule.applies(this.value)
    );
  }
}
