import { ValidatorFunction, emptyRequiredField } from "./validatorFunctions";

interface FieldRule {
  validatorFunction: ValidatorFunction;
  errorMessage: string;
}

export class FieldValidator {
  _name: string;
  _value: string;
  _rules: Array<FieldRule>;

  constructor(name: string, value: string) {
    this._name = name;
    this._value = value;
    this._rules = [];
  }

  get value(): string {
    return this.value;
  }

  hasError(): boolean {
    return this._rules
      .map((rule) => rule.validatorFunction(this.value))
      .includes(true);
  }

  errorMessages(): Array<string> {
    return this._rules
      .filter((rule) => rule.validatorFunction(this.value))
      .map((rule) => rule.errorMessage);
  }

  // Declarative matcher-type syntax starts here -- possibly extract?
  should(): FieldValidator {
    return this;
  }

  containANonEmptyString(): FieldValidator {
    const rule = {
      validatorFunction: emptyRequiredField,
      errorMessage: "",
    };
    this._rules.push(rule);
    return this;
  }

  withErrorMessage(message): FieldValidator {
    const ruleWithMessage = (this._rules.pop().errorMessage = message);
    this._rules.push(ruleWithMessage);
    return this;
  }
}
