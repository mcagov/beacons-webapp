import { FieldValidator } from "../../src/lib/FieldValidator";

describe("FieldValidator", () => {
  describe("hasError()", () => {
    it("should return false when its only validator function says the field is valid", () => {
      const value = "This is a valid form field input value";
      const fieldRuleMock = {
        validatorFunction: jest.fn().mockReturnValue(false),
        errorMessage: "Form input should not be invalid",
      };
      const fieldValidator = new FieldValidator(value, [fieldRuleMock]);

      const hasError = fieldValidator.hasError();

      expect(hasError).toBe(false);
    });

    it("should return true when its only validator function says the field is invalid", () => {
      const value = "This is an invalid form field input value";
      const fieldRuleMock = {
        validatorFunction: jest.fn().mockReturnValue(true),
        errorMessage: "Form input should not be invalid",
      };
      const fieldValidator = new FieldValidator(value, [fieldRuleMock]);

      const hasError = fieldValidator.hasError();

      expect(hasError).toBe(true);
    });

    it("should return true when one of several validator functions says the field is invalid", () => {
      const value = "This is an invalid form field input value";
      const fieldRuleMocks = [
        {
          validatorFunction: jest.fn().mockReturnValue(false),
          errorMessage: "Form input is invalid because X",
        },
        {
          validatorFunction: jest.fn().mockReturnValue(true),
          errorMessage: "Form input is invalid because Y",
        },
      ];
      const fieldValidator = new FieldValidator(value, fieldRuleMocks);

      const hasError = fieldValidator.hasError();

      expect(hasError).toBe(true);
    });
  });
});
