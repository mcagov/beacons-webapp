import {
  mustBeAnIntegerErrorMessage,
  requiredFieldErrorMessage,
  thenIShouldSeeAnErrorMessageThatContains,
  thenTheUrlShouldContain,
  tooManyCharactersErrorMessage,
  whenIClickContinue,
  whenIType,
} from "./common.spec";

describe("As a beacon owner, I want to submit information about my vessel", () => {
  const pageLocation = "/register-a-beacon/about-the-vessel";

  beforeEach(() => {
    givenIAmOnTheAboutTheVesselPage();
  });

  it("displays an error if no max capacity is entered", () => {
    whenIClickContinue();
    thenIShouldSeeAnErrorMessageThatContains(requiredFieldErrorMessage);
  });

  it("displays an error if an invalid max capacity is entered", () => {
    whenIType("Max Capacity", "maxCapacity");
    whenIClickContinue();

    thenIShouldSeeAnErrorMessageThatContains(mustBeAnIntegerErrorMessage);
  });

  describe("when a valid maxCapacity is entered", function () {
    beforeEach(() => {
      whenIType("42", "maxCapacity");
    });

    it("displays an error if Area of Operation input has too many characters", () => {
      whenIType("a".repeat(251), "areaOfOperation");

      whenIClickContinue();
      thenIShouldSeeAnErrorMessageThatContains(tooManyCharactersErrorMessage);
    });

    it("displays an error if Beacon Location input has too many characters", () => {
      whenIType("a".repeat(101), "beaconLocation");

      whenIClickContinue();
      thenIShouldSeeAnErrorMessageThatContains(tooManyCharactersErrorMessage);
    });

    it("routes to the next page if there are no errors with form submission", () => {
      whenIType("Earth", "areaOfOperation");
      whenIType("With my towel", "beaconLocation");

      whenIClickContinue();

      thenTheUrlShouldContain("/register-a-beacon/vessel-communications");
    });
  });

  const givenIAmOnTheAboutTheVesselPage = () => {
    cy.visit("/");
    cy.visit(pageLocation);
  };
});
