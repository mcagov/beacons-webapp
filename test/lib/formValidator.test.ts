import { FormValidator } from "../../src/lib/formValidator";
import { FieldValidator } from "../../src/lib/fieldValidator"; // Imported only for Jest auto-mocking

describe("FormValidator", () => {
  const createMockFieldValidator = (fieldId, hasError, initialValue = "") => {
    jest.mock("../../src/lib/fieldValidator");

    const fieldValidator = new FieldValidator(fieldId);

    fieldValidator.hasError = jest.fn().mockReturnValue(hasError);
    fieldValidator.value = initialValue;

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

  describe("field()", () => {
    it("retrieves a constituent FieldValidator object", () => {
      const mockFieldValidator1 = createMockFieldValidator("fieldOne", false);
      const mockFieldValidator2 = createMockFieldValidator("fieldTwo", false);
      const formValidator = new FormValidator(
        mockFieldValidator1,
        mockFieldValidator2
      );

      const firstField = formValidator.field("fieldOne");
      const secondField = formValidator.field("fieldTwo");

      expect(firstField).toBe(mockFieldValidator1);
      expect(secondField).toBe(mockFieldValidator2);
    });

    it("raises an exception if a non-existent FieldValidator is requested", () => {
      const mockFieldValidator1 = createMockFieldValidator("fieldOne", false);
      const mockFieldValidator2 = createMockFieldValidator("fieldTwo", false);
      const formValidator = new FormValidator(
        mockFieldValidator1,
        mockFieldValidator2
      );

      const requestNonExistentFieldValidator = () =>
        formValidator.field("doesNotExist");

      expect(requestNonExistentFieldValidator).toThrow(ReferenceError);
    });
  });

  describe("updateValues()", () => {
    it("updates one child field value", () => {
      const mockFieldValidator = createMockFieldValidator("mockFieldId", false);
      const formValidator = new FormValidator(mockFieldValidator);
      const newValues = {
        mockFieldId: "new field value",
      };

      formValidator.updateValues(newValues);
      const updatedValue = formValidator.field("mockFieldId").value;

      expect(updatedValue).toBe("new field value");
    });

    it("updates two child field values", () => {
      const mockFieldValidator1 = createMockFieldValidator("mockField1", false);
      const mockFieldValidator2 = createMockFieldValidator("mockField2", false);
      const formValidator = new FormValidator(
        mockFieldValidator1,
        mockFieldValidator2
      );
      const newValues = {
        mockField1: "first new field value",
        mockField2: "second new field value",
      };

      formValidator.updateValues(newValues);
      const updatedValue1 = formValidator.field("mockField1").value;
      const updatedValue2 = formValidator.field("mockField2").value;

      expect(updatedValue1).toBe("first new field value");
      expect(updatedValue2).toBe("second new field value");
    });

    it("updates one of two child field values", () => {
      const mockFieldValidator1 = createMockFieldValidator(
        "mockField1",
        false,
        "this field is updated"
      );
      const mockFieldValidator2 = createMockFieldValidator(
        "mockField2",
        false,
        "this field stays the same"
      );
      const formValidator = new FormValidator(
        mockFieldValidator1,
        mockFieldValidator2
      );
      const newValues = {
        mockField1: "only new field value, other field is untouched",
      };

      formValidator.updateValues(newValues);
      const updatedValue = formValidator.field("mockField1").value;
      const existingValue = formValidator.field("mockField2").value;

      expect(updatedValue).toBe(
        "only new field value, other field is untouched"
      );
      expect(existingValue).toBe("this field stays the same");
    });

    it("doesn't update when passed an empty {}", () => {
      const mockFieldValidator1 = createMockFieldValidator(
        "mockField1",
        false,
        "doesn't change"
      );
      const mockFieldValidator2 = createMockFieldValidator(
        "mockField2",
        false,
        "doesn't change"
      );
      const formValidator = new FormValidator(
        mockFieldValidator1,
        mockFieldValidator2
      );
      const newValues = {};

      formValidator.updateValues(newValues);
      const updatedValue1 = formValidator.field("mockField1").value;
      const updatedValue2 = formValidator.field("mockField2").value;

      expect(updatedValue1).toBe("doesn't change");
      expect(updatedValue2).toBe("doesn't change");
    });

    it("raises an exception when passed an invalid fieldId", () => {
      const formValidator = new FormValidator();
      const newValues = {
        invalidField: "Attempt to update a fieldId that doesn't exist",
      };

      const attemptToUpdateWithInvalidValues = () =>
        formValidator.updateValues(newValues);

      expect(attemptToUpdateWithInvalidValues).toThrowError(ReferenceError);
    });
  });

  describe("errors()", () => {
    it("returns an array of FormErrors", () => {
      const idOfFormElementWithError = "htmlIdRenderedInDOM";
      const mockFieldValidatorWithError = createMockFieldValidator(
        idOfFormElementWithError,
        true
      );
      mockFieldValidatorWithError.errorMessages = jest
        .fn()
        .mockReturnValue(["Test error messages"]);

      const formValidator = new FormValidator(mockFieldValidatorWithError);

      const errors = formValidator.errors();

      expect(errors).toEqual([
        {
          linkedFieldId: idOfFormElementWithError,
          messages: ["Test error messages"],
        },
      ]);
    });
  });
});
