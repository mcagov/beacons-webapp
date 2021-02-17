import { FormValidator } from "../../src/lib/formValidator";
import { FieldValidator } from "../../src/lib/fieldValidator";

describe("FormValidator", () => {
  describe("hasError()", () => {
    beforeEach(() => {
      jest.mock("../../src/lib/fieldValidator");
    });

    it("should return false if there are no child fields", () => {
      const formWithNoFields = new FormValidator();

      const hasError = formWithNoFields.hasError();

      expect(hasError).toBe(false);
    });

    it("should return false if none of the child fields contain an error", () => {
      const mockHasError = jest.fn();
      mockHasError.mockReturnValue(false);
      FieldValidator.prototype.hasError = mockHasError;

      const stubFieldWithNoError = new FieldValidator("fieldWithNoErrorId");

      const formWithOneField = new FormValidator(stubFieldWithNoError);

      const hasError = formWithOneField.hasError();

      expect(hasError).toBe(false);
    });
  });
});
