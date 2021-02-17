import { FieldValidator } from "../../src/lib/fieldValidator";

describe("FieldValidator", () => {
  describe("validate()", () => {
    it("when given a valid string should return true", () => {
      const field = new FieldValidator();
      field.should().containANonEmptyString();

      const valid = field.validate("valid string");

      expect(valid).toBe(true);
    });

    it("when given an invalid string should return false", () => {
      const field = new FieldValidator();
      field.should().containANonEmptyString();

      const valid = field.validate("");

      expect(valid).toBe(false);
    });

    it("when no conditions are set should still return true", () => {
      const field = new FieldValidator();

      const valid = field.validate("string with no conditions attached");

      expect(valid).toBe(true);
    });
  });

  describe("errorMessages()", () => {
    it("when string is too long returns a suitable error message", () => {
      const suitableErrorMessage = "Field should be exactly 15 characters";
      const field = new FieldValidator();
      field
        .should()
        .beExactly15Characters()
        .withErrorMessage("Field should be exactly 15 characters");

      const errorMessages = field.errorMessages(
        "String less than 15 characters"
      );

      expect(errorMessages).toEqual([suitableErrorMessage]);
    });
  });
});
