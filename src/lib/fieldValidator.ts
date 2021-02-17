import {
  ValidatorFunction,
  emptyRequiredField,
  isNot15CharactersLong,
} from "./validatorFunctions";

export interface IFieldValidator {
  validate(value: string): boolean;
  errorMessages(value: string): string[];
}

export interface IFieldRule {
  validatorFunction: ValidatorFunction;
  errorMessage: string;
}

export class FieldValidator implements IFieldValidator {
  private _rules: IFieldRule[];

  constructor(...rules: IFieldRule[]) {
    this._rules = rules;
  }

  public validate(value: string): boolean {
    if (this._rules.length === 0) return true;
    return this._rules.some((rule) => !rule.validatorFunction(value));
  }

  public errorMessages(value: string): string[] {
    return this._rules
      .filter((rule) => rule.validatorFunction(value))
      .map((rule) => rule.errorMessage);
  }

  // Declarative matcher-type syntax starts here -- possibly extract?
  public should(): FieldValidator {
    return this;
  }

  public containANonEmptyString(): FieldValidator {
    const rule = {
      validatorFunction: emptyRequiredField,
      errorMessage: "",
    };
    this._rules.push(rule);
    return this;
  }

  public beExactly15Characters(): FieldValidator {
    const rule = {
      validatorFunction: isNot15CharactersLong,
      errorMessage: "",
    };
    this._rules.push(rule);
    return this;
  }

  public withErrorMessage(message: string): FieldValidator {
    this._rules[this._rules.length - 1].errorMessage = message;
    return this;
  }
}
