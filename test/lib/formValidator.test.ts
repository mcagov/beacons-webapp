import { FormValidator } from "../../src/lib/formValidator";
import { FieldValidator } from "../../src/lib/fieldValidator";

describe("FormValidator", () => {
  const createMockFieldValidator = (fieldId, hasError) => {
    jest.mock("../../src/lib/fieldValidator");

    const fieldValidator = new FieldValidator(fieldId);
    fieldValidator.hasError = jest.fn().mockReturnValue(hasError);

    return fieldValidator;
  };

  describe("hasError()", () => {
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

    it("should return true if more than one of the child fields contain an error", () => {
      const mockFieldValidatorWithError1 = createMockFieldValidator(
        "fieldWithOneError1",
        true
      );
      const mockFieldValidatorWithError2 = createMockFieldValidator(
        "fieldWithOneError2",
        true
      );
      const mockFieldValidatorWithNoError = createMockFieldValidator(
        "fieldWithNoError",
        false
      );

      const formWithOneField = new FormValidator(
        mockFieldValidatorWithError1,
        mockFieldValidatorWithError2,
        mockFieldValidatorWithNoError
      );

      const hasError = formWithOneField.hasError();

      expect(hasError).toBe(true);
    });
  });
});
