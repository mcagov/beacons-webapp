export interface errorIf {
  (fieldValue: string): boolean;
}

export interface IFieldRule {
  errorMessage: string;
  errorIf: errorIf;
}

export interface IFunctionalValidator {
  rules: IFieldRule[];
  applyRulesIf?: IFieldCondition[];
}

export interface IFieldCondition {
  fieldName: string;
  meetsConditions: ((value: string) => boolean)[];
}

export const requiredFieldHasNoValue: errorIf = (value) => !value;

export const isNot15CharactersLong: errorIf = (value) =>
  !value || value.length !== 15;

export const isNotHexadecimalString: errorIf = (value) =>
  value.match(/^[a-f0-9]+$/i) === null;
