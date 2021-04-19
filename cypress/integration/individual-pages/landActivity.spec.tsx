import { PageURLs } from "../../../src/lib/urls";
import {
  andIClickContinue,
  andIHaveSelected,
  givenIHaveACookieSetAndIVisit,
  givenIHaveSelected,
  iCanClickTheBackLinkToGoToPreviousPage,
  thenIShouldSeeAnErrorMessageThatContains,
  thenIShouldSeeFormErrors,
  thenMyFocusMovesTo,
  thenTheUrlShouldContain,
  whenIClickOnTheErrorSummaryLinkContaining,
  whenIType,
} from "../common/selectors-and-assertions.spec";

describe("As a beacon owner, I want to register how I use my beacon in the land environment", () => {
  const drivingSelector = "#driving";
  const workingRemotelySelector = "#workingRemotely";
  const workingRemotelyLocationSelector = "#workingRemotelyLocation";
  const workingRemotelyPeopleCountSelector = "#workingRemotelyPeopleCount";
  const windfarmSelector = "#windfarm";
  const windfarmLocationSelector = "#windfarmLocation";
  const windfarmPeopleCountSelector = "#windfarmPeopleCount";
  const otherActivitySelector = "#otherActivity";
  const otherActivityTextSelector = "#otherActivityText";
  const otherActivityLocationSelector = "#otherActivityLocation";
  const otherActivityPeopleCountSelector = "#otherActivityPeopleCount";

  beforeEach(() => {
    givenIHaveACookieSetAndIVisit(PageURLs.environment);
    andIHaveSelected("#land");
    andIClickContinue();
  });

  it("sends me to the previous page when I click the back link", () => {
    iCanClickTheBackLinkToGoToPreviousPage(PageURLs.environment);
  });

  it("submits the form if all fields are valid", () => {
    givenIHaveSelected(drivingSelector);

    andIClickContinue();

    thenTheUrlShouldContain(PageURLs.landCommunications);
  });

  describe("the Working remotely option", () => {
    it("requires a location if the working remotely checkbox is selected", () => {
      const expectedErrorMessage = ["Enter the location", "work remotely"];

      givenIHaveSelected(workingRemotelySelector);
      whenIType(" ", workingRemotelyLocationSelector);
      andIClickContinue();
      thenIShouldSeeAnErrorMessageThatContains(...expectedErrorMessage);
      whenIClickOnTheErrorSummaryLinkContaining(...expectedErrorMessage);
      thenMyFocusMovesTo(workingRemotelyLocationSelector);
    });

    it("requires a people count if the working remotely checkbox is selected", () => {
      const requiredFieldErrorMessage = [
        "Enter how many",
        "people",
        "work remotely",
      ];
      const mustBeANumberErrormessage = [
        "Enter a whole number",
        "people",
        "work remotely",
      ];

      givenIHaveSelected(workingRemotelySelector);

      whenIType(" ", workingRemotelyPeopleCountSelector);
      andIClickContinue();
      whenIClickOnTheErrorSummaryLinkContaining(...requiredFieldErrorMessage);
      thenIShouldSeeFormErrors(...requiredFieldErrorMessage);
      thenMyFocusMovesTo(workingRemotelyPeopleCountSelector);

      whenIType("not a number", workingRemotelyPeopleCountSelector);
      andIClickContinue();
      thenIShouldSeeFormErrors(...mustBeANumberErrormessage);
      whenIClickOnTheErrorSummaryLinkContaining(...mustBeANumberErrormessage);
      thenMyFocusMovesTo(workingRemotelyPeopleCountSelector);
    });
  });

  describe("the Windfarm option", () => {
    it("requires a location if the Windfarm checkbox is selected", () => {
      const expectedErrorMessage = ["Enter the location", "windfarm"];

      givenIHaveSelected(windfarmSelector);
      whenIType(" ", windfarmLocationSelector);
      andIClickContinue();
      thenIShouldSeeFormErrors(...expectedErrorMessage);
      whenIClickOnTheErrorSummaryLinkContaining(...expectedErrorMessage);
      thenMyFocusMovesTo(windfarmLocationSelector);
    });

    it("requires a people count if the Windfarm checkbox is selected", () => {
      const requiredFieldErrorMessage = [
        "Enter how many",
        "people",
        "windfarm",
      ];
      const mustBeANumberErrormessage = [
        "Enter a whole number",
        "people",
        "windfarm",
      ];

      givenIHaveSelected(windfarmSelector);

      whenIType(" ", windfarmPeopleCountSelector);
      andIClickContinue();
      thenIShouldSeeFormErrors(...requiredFieldErrorMessage);
      whenIClickOnTheErrorSummaryLinkContaining(...requiredFieldErrorMessage);
      thenMyFocusMovesTo(windfarmPeopleCountSelector);

      whenIType("not a number", windfarmPeopleCountSelector);
      andIClickContinue();
      thenIShouldSeeFormErrors(...mustBeANumberErrormessage);
      whenIClickOnTheErrorSummaryLinkContaining(...mustBeANumberErrormessage);
      thenMyFocusMovesTo(windfarmPeopleCountSelector);
    });
  });

  describe("the Other option", () => {
    it("requires an activity description if the Other checkbox is selected", () => {
      const expectedErrorMessage = ["Enter a description", "activity"];

      givenIHaveSelected(otherActivitySelector);
      whenIType(" ", otherActivityTextSelector);
      andIClickContinue();
      thenIShouldSeeFormErrors(...expectedErrorMessage);
      whenIClickOnTheErrorSummaryLinkContaining(...expectedErrorMessage);
      thenMyFocusMovesTo(otherActivityTextSelector);
    });

    it("requires an activity location if the Other checkbox is selected", () => {
      const expectedErrorMessage = ["Enter where", "you use"];

      givenIHaveSelected(otherActivitySelector);
      whenIType(" ", otherActivityLocationSelector);
      andIClickContinue();
      thenIShouldSeeFormErrors(...expectedErrorMessage);
      whenIClickOnTheErrorSummaryLinkContaining(...expectedErrorMessage);
      thenMyFocusMovesTo(otherActivityLocationSelector);
    });

    it("requires a people count if the Other checkbox is selected", () => {
      const requiredFieldErrorMessage = ["Enter how many", "people", "you use"];
      const mustBeANumberErrormessage = [
        "Enter a whole number",
        "people",
        "you use",
      ];

      givenIHaveSelected(otherActivitySelector);

      whenIType(" ", otherActivityPeopleCountSelector);
      andIClickContinue();
      thenIShouldSeeFormErrors(...requiredFieldErrorMessage);
      whenIClickOnTheErrorSummaryLinkContaining(...requiredFieldErrorMessage);
      thenMyFocusMovesTo(otherActivityPeopleCountSelector);

      whenIType("not a number", otherActivityPeopleCountSelector);
      andIClickContinue();
      thenIShouldSeeFormErrors(...mustBeANumberErrormessage);
      whenIClickOnTheErrorSummaryLinkContaining(...mustBeANumberErrormessage);
      thenMyFocusMovesTo(otherActivityPeopleCountSelector);
    });
  });
});
