import {
  ValidatorFunction,
  emptyRequiredField,
  isNot15CharactersLong,
} from "./validatorFunctions";

export interface IFieldValidator {
  value: string;
  id: string;
  hasError(): boolean;
  errorMessages(): string[];
}

interface FieldRule {
  validatorFunction: ValidatorFunction;
  errorMessage: string;
}

export class FieldValidator implements IFieldValidator {
  private _id: string;
  private _value: string;
  private _rules: FieldRule[];

  constructor(fieldId: string) {
    this._id = fieldId;
    this._rules = [];
    this._value = "";
  }

  public get value(): string {
    return this._value;
  }

  public set value(value: string) {
    this._value = value;
  }

  public get id(): string {
    return this._id;
  }

  public hasError(): boolean {
    if (this._rules.length >= 1) {
      return this._rules
        .map((rule) => rule.validatorFunction(this.value))
        .includes(true);
    }
    return false;
  }

  public errorMessages(): string[] {
    return this._rules
      .filter((rule) => rule.validatorFunction(this.value))
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
