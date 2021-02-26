import { IFieldValidator } from "../../src/lib/fieldValidator";
import { FormValidator } from "../../src/lib/formValidator";

const mockValidFieldValidator = (): IFieldValidator => {
  return {
    validate: jest.fn(() => {
      return {
        valid: true,
        invalid: false,
        errorMessages: [],
      };
    }),
  };
};

const mockInvalidFieldValidator = (errors): IFieldValidator => {
  return {
    validate: jest.fn(() => {
      return {
        valid: false,
        invalid: true,
        errorMessages: errors,
      };
    }),
  };
};

describe("FormValidator", () => {
  describe("validate", () => {
    it("should return a 'valid' response when the only field is valid", () => {
      const formData = { testFieldName: "valid value" };
      const fieldValidatorLookup = {
        testFieldName: mockValidFieldValidator(),
      };

      const validationResponse = FormValidator.validate(
        formData,
        fieldValidatorLookup
      );

      expect(validationResponse).toEqual({
        testFieldName: {
          valid: true,
          invalid: false,
          errorMessages: [],
        },
      });
    });

    it("should return an 'invalid' response when the only field is invalid", () => {
      const formData = { anotherTestFieldName: "invalid value" };
      const fieldValidatorLookup = {
        anotherTestFieldName: mockInvalidFieldValidator(["TooLong"]),
      };

      const validationResponse = FormValidator.validate(
        formData,
        fieldValidatorLookup
      );

      expect(validationResponse).toEqual({
        anotherTestFieldName: {
          valid: false,
          invalid: true,
          errorMessages: ["TooLong"],
        },
      });
    });

    it("should return an 'invalid' response when one of two fields is invalid", () => {
      const formData = {
        firstTestFieldName: "invalid value",
        secondTestFieldName: "valid value",
      };
      const fieldValidatorLookup = {
        firstTestFieldName: mockInvalidFieldValidator(["Required"]),
        secondTestFieldName: mockValidFieldValidator(),
      };

      const validationResponse = FormValidator.validate(
        formData,
        fieldValidatorLookup
      );

      expect(validationResponse).toEqual({
        firstTestFieldName: {
          valid: false,
          invalid: true,
          errorMessages: ["Required"],
        },
        secondTestFieldName: {
          valid: true,
          invalid: false,
          errorMessages: [],
        },
      });
    });
  });

  describe("errorSummary", () => {
    it("should return a blank errorMessage summary when the only field is valid", () => {
      const formData = {
        validFieldName: "valid value",
      };
      const fieldValidatorLookup = {
        validFieldName: mockValidFieldValidator(),
      };

      const errorSummary = FormValidator.errorSummary(
        formData,
        fieldValidatorLookup
      );

      expect(errorSummary).toEqual([]);
    });

    it("should return a summary of one errorMessage when the only field is invalid", () => {
      const formData = {
        invalidFieldName: "invalid value",
      };
      const fieldValidatorLookup = {
        invalidFieldName: mockInvalidFieldValidator(["TooLong"]),
      };

      const errorSummary = FormValidator.errorSummary(
        formData,
        fieldValidatorLookup
      );

      expect(errorSummary).toEqual([
        { fieldName: "invalidFieldName", errorMessages: ["TooLong"] },
      ]);
    });

    it("should return a summary of two errorMessages when two fields are invalid", () => {
      const formData = {
        invalidFieldName1: "invalid value",
        invalidFieldName2: "invalid value",
        validFieldName: "valid value",
      };
      const fieldValidatorLookup = {
        invalidFieldName1: mockInvalidFieldValidator(["TooLong"]),
        invalidFieldName2: mockInvalidFieldValidator(["TooLong"]),
        validFieldName: mockValidFieldValidator(),
      };

      const errorSummary = FormValidator.errorSummary(
        formData,
        fieldValidatorLookup
      );

      expect(errorSummary).toEqual([
        { fieldName: "invalidFieldName1", errorMessages: ["TooLong"] },
        { fieldName: "invalidFieldName2", errorMessages: ["TooLong"] },
      ]);
    });
  });
});
