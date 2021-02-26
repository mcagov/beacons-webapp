import {
  isNot15CharactersLong,
  requiredFieldHasNoValue,
} from "../../src/lib/validatorFunctions";

describe("emptyRequiredField", () => {
  it("should return true when field is an empty string", () => {
    expect(requiredFieldHasNoValue("")).toBe(true);
  });

  it("should return true when field is undefined", () => {
    expect(requiredFieldHasNoValue(undefined)).toBe(true);
  });

  it("should return true when field is null", () => {
    expect(requiredFieldHasNoValue(null)).toBe(true);
  });

  it("should return false when field is a string of one or more character", () => {
    expect(requiredFieldHasNoValue("Space")).toBe(false);
    expect(requiredFieldHasNoValue("Jam")).toBe(false);
  });

  it("should return false when field is a string of a number", () => {
    expect(requiredFieldHasNoValue("42")).toBe(false);
  });
});

describe("isNot15CharactersLong", () => {
  it("should return false when field is 15 characters long", () => {
    expect(isNot15CharactersLong("123456789012345")).toBe(false);
    expect(isNot15CharactersLong("abcdefghijklmno")).toBe(false);
  });

  it("should return true when field is not 15 characters long", () => {
    expect(isNot15CharactersLong("abc")).toBe(true);
    expect(isNot15CharactersLong("abcdefghijklmnoasdkjahskjdhad")).toBe(true);
  });

  it("should return true when field is falsy", () => {
    expect(isNot15CharactersLong("")).toBe(true);
    expect(isNot15CharactersLong(undefined)).toBe(true);
    expect(isNot15CharactersLong(null)).toBe(true);
  });
});
