import { FieldValidator } from "../../src/lib/FieldValidator";

describe("FieldValidator", () => {
  describe("hasError()", () => {
    it("should return false when field is valid", () => {
      const value = "This is a valid form field input value";
      const fieldRuleMock = {
        validatorFunction: jest.fn().mockReturnValue(false),
        errorMessage: "Form input should not be invalid",
      };
      const fieldValidator = new FieldValidator(value, [fieldRuleMock]);

      const hasError = fieldValidator.hasError();

      expect(hasError).toBe(false);
    });
  });
});
