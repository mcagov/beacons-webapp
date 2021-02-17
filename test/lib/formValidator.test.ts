import { FormValidator } from "../../src/lib/formValidator";
import { FieldValidator } from "../../src/lib/fieldValidator";

describe("FormValidator", () => {
  describe("hasError()", () => {
    const createMockFieldValidator = (fieldId, hasError) => {
      jest.mock("../../src/lib/fieldValidator");

      const mockHasErrorMethod = jest.fn();
      mockHasErrorMethod.mockReturnValue(hasError);
      FieldValidator.prototype.hasError = mockHasErrorMethod;

      return new FieldValidator(fieldId);
    };

    it("should return false if there are no child fields", () => {
      const formWithNoFields = new FormValidator();

      const hasError = formWithNoFields.hasError();

      expect(hasError).toBe(false);
    });

    it("should return false if none of the child fields contain an error", () => {
      const mockFieldValidatorWithNoError = createMockFieldValidator(
        "fieldWithNoError",
        false
      );

      const formWithOneField = new FormValidator(mockFieldValidatorWithNoError);

      const hasError = formWithOneField.hasError();

      expect(hasError).toBe(false);
    });

    it("should return true if one of the child fields contain an error", () => {
      const mockFieldValidatorWithError = createMockFieldValidator(
        "fieldWithOneError",
        true
      );

      const formWithOneField = new FormValidator(mockFieldValidatorWithError);

      const hasError = formWithOneField.hasError();

      expect(hasError).toBe(true);
    });
  });
});
