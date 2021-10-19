import { CreateRegistrationPageURLs } from "../../../src/lib/urls";
import {
  andIClickContinue,
  givenIHaveACookieSetAndIVisit,
  givenIHaveSignedIn,
  iCanEditAFieldContaining,
  thenIShouldSeeAnErrorMessageThatContains,
  thenIShouldSeeAnErrorSummaryLinkThatContains,
  whenIType,
} from "../../common/selectors-and-assertions.spec";

describe("Given I have submitted invalid data to a registration form,", () => {
  describe("when I refresh the page,", () => {
    it("I can still see my invalid data", () => {
      givenIHaveSignedIn();
      givenIHaveACookieSetAndIVisit(
        CreateRegistrationPageURLs.checkBeaconDetails
      );

      whenIType("invalid hex id", "#hexId");
      andIClickContinue();

      thenIShouldSeeAnErrorSummaryLinkThatContains("HEX ID");
      thenIShouldSeeAnErrorMessageThatContains("HEX ID");

      givenIHaveRefreshedThePage();

      iCanEditAFieldContaining("INVALID HEX ID");
    });
  });
});

const givenIHaveRefreshedThePage = () => cy.reload();
