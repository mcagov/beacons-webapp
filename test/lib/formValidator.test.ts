import { IClassBasedValidator } from "../../src/lib/fieldValidator";
import { FormValidator } from "../../src/lib/formValidator";

const mockValidFieldValidator = (value): IClassBasedValidator => {
  return {
    validate: jest.fn(() => {
      return {
        value: value,
        valid: true,
        invalid: false,
        errorMessages: [],
      };
    }),
  };
};

const mockInvalidFieldValidator = (value, errors): IClassBasedValidator => {
  return {
    validate: jest.fn(() => {
      return {
        value: value,
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
        testFieldName: mockValidFieldValidator("valid value"),
      };

      const validationResponse = FormValidator.validate(
        formData,
        fieldValidatorLookup
      );

      expect(validationResponse).toEqual({
        testFieldName: {
          value: "valid value",
          valid: true,
          invalid: false,
          errorMessages: [],
        },
      });
    });

    it("should return an 'invalid' response when the only field is invalid", () => {
      const formData = { anotherTestFieldName: "invalid value" };
      const fieldValidatorLookup = {
        anotherTestFieldName: mockInvalidFieldValidator("invalid value", [
          "TooLong",
        ]),
      };

      const validationResponse = FormValidator.validate(
        formData,
        fieldValidatorLookup
      );

      expect(validationResponse).toEqual({
        anotherTestFieldName: {
          value: "invalid value",
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
        firstTestFieldName: mockInvalidFieldValidator("invalid value", [
          "Required",
        ]),
        secondTestFieldName: mockValidFieldValidator("valid value"),
      };

      const validationResponse = FormValidator.validate(
        formData,
        fieldValidatorLookup
      );

      expect(validationResponse).toEqual({
        firstTestFieldName: {
          value: "invalid value",
          valid: false,
          invalid: true,
          errorMessages: ["Required"],
        },
        secondTestFieldName: {
          value: "valid value",
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
        validFieldName: mockValidFieldValidator("valid value"),
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
        invalidFieldName: mockInvalidFieldValidator("invalid value", [
          "TooLong",
        ]),
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
        invalidFieldName1: mockInvalidFieldValidator("invalid value", [
          "TooLong",
        ]),
        invalidFieldName2: mockInvalidFieldValidator("invalid value", [
          "TooLong",
        ]),
        validFieldName: mockValidFieldValidator("valid value"),
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

    describe("conditional validation", () => {
      it("should not validate textInput when radioButton condition is not met", () => {
        const mockInvalidValidatorFn = jest.fn().mockReturnValue(true);
        const formData = {
          radioButton: "MOTOR_VESSEL",
          textInput: "should not be validated because radioButton !== OTHER",
        };
        const formRules = {
          radioButton: { rules: [] },
          textInput: {
            rules: [
              {
                errorMessage:
                  "textInput is required if radioButton OTHER is selected",
                errorIf: mockInvalidValidatorFn,
              },
            ],
            applyRulesIf: [
              {
                fieldName: "radioButton",
                meetsConditions: [(value) => value === "OTHER"],
              },
            ],
          },
        };

        FormValidator.validate(formData, formRules);
        const errorSummary = FormValidator.errorSummary(formData, formRules);

        expect(mockInvalidValidatorFn).not.toBeCalled();
        expect(errorSummary.length).toBe(0);
      });

      it("should validate textInput when radioButton condition is met", () => {
        const mockInvalidValidatorFn = jest.fn().mockReturnValue(true);
        const formData = {
          radioButton: "OTHER",
          textInput: "should be validated because radioButton === OTHER",
        };
        const formRules = {
          radioButton: { rules: [] },
          textInput: {
            rules: [
              {
                errorMessage:
                  "textInput is required if radioButton OTHER is selected",
                errorIf: mockInvalidValidatorFn,
              },
            ],
            applyRulesIf: [
              {
                fieldName: "radioButton",
                meetsConditions: [(value) => value === "OTHER"],
              },
            ],
          },
        };

        FormValidator.validate(formData, formRules);
        const errorSummary = FormValidator.errorSummary(formData, formRules);

        expect(mockInvalidValidatorFn).toBeCalled();
        expect(errorSummary.length).toBe(1);
      });
    });
  });
});
