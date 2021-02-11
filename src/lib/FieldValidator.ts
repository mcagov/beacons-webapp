import { ValidatorFunction } from "./validatorFunctions";

interface FieldRule {
  validatorFunction: ValidatorFunction;
  errorMessage: string;
}

export class FieldValidator {
  value: string;
  rules: Array<FieldRule>;

  constructor(fieldValue: string, rules: Array<FieldRule>) {
    this.value = fieldValue;
    this.rules = rules;
  }

  hasError(): boolean {
    return this.rules
      .map((rule) => rule.validatorFunction(this.value))
      .includes(true);
  }

  errorMessages(): Array<string> {
    return this.rules
      .filter((rule) => rule.validatorFunction(this.value))
      .map((rule) => rule.errorMessage);
  }
}
