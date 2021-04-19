import {
  AdditionalUses,
  Environment,
} from "../../../../src/lib/registration/types";
import { PageURLs } from "../../../../src/lib/urls";
import { makeEnumValueUserFriendly } from "../../../../src/lib/utils";
import { testLandUseData } from "../happy-path-test-data.spec";
import {
  iCanEditMyAdditionalBeaconInformation,
  iCanEditMyBeaconDetails,
} from "../i-can-enter-beacon-information.spec";
import {
  iCanEditMyAddressDetails,
  iCanEditMyEmergencyContactDetails,
  iCanEditMyPersonalDetails,
} from "../i-can-enter-owner-information.spec";
import {
  andIClickContinue,
  givenIHaveSelected,
  givenIHaveTyped,
  iAmAt,
  iCanSeeAPageHeadingThatContains,
  thenTheUrlShouldContain,
  whenIClickBack,
} from "../selectors-and-assertions.spec";
import {
  iCanEditMyAdditionalUsesChoice,
  iCanEditMyEnvironment,
} from "./generic.spec";

export const givenIHaveEnteredMyLandUse = (): void => {
  thenTheUrlShouldContain(PageURLs.environment);
  givenIHaveSelected("#land");
  andIClickContinue();

  thenTheUrlShouldContain(PageURLs.activity);
  iCanSeeAPageHeadingThatContains("land");
  givenIHaveSelected(`#${testLandUseData.type.activity.toLowerCase()}`);

  andIClickContinue();

  thenTheUrlShouldContain(PageURLs.landCommunications);
  givenIHaveEnteredMyLandCommunicationDetails();
  andIClickContinue();

  thenTheUrlShouldContain(PageURLs.moreDetails);
  givenIHaveEnteredMoreDetailsAboutMyLandUse();
  andIClickContinue();
};

export const iCanGoBackAndEditMyLandUse = (): void => {
  whenIClickBack();
  iCanEditMyEmergencyContactDetails();
  whenIClickBack();
  iCanEditMyAddressDetails();
  whenIClickBack();
  iCanEditMyPersonalDetails();
  whenIClickBack();
  iCanEditMyAdditionalUsesChoice(AdditionalUses.NO);
  whenIClickBack();
  iCanEditMyAdditionalLandUseInformation();
  whenIClickBack();
  iCanEditMyLandCommunications();
  whenIClickBack();
  iCanEditMyLandActivity();
  whenIClickBack();
  iCanEditMyEnvironment(Environment.LAND);
  whenIClickBack();
  iCanEditMyAdditionalBeaconInformation();
  whenIClickBack();
  iCanEditMyBeaconDetails();
  whenIClickBack();
  iAmAt(PageURLs.start);
};

export const iCanEditMyLandCommunications = (): void => {
  const comms = testLandUseData.communications;
  comms.checkedFields.forEach((field) =>
    cy.get(`#${field}`).should("be.checked")
  );
  cy.get("#satelliteTelephoneInput").should(
    "have.value",
    comms.satelliteTelephone
  );
  cy.get("#mobileTelephoneInput1").should("have.value", comms.mobileTelephone1);
  cy.get("#mobileTelephoneInput2").should("have.value", comms.mobileTelephone2);
  cy.get("#otherCommunicationInput").contains(comms.otherCommunication);
};

export const iCanEditMyLandActivity = (): void => {
  cy.get(`input[value="${testLandUseData.type.activity}"]`).should(
    "be.checked"
  );
};

export const iCanEditMyAdditionalLandUseInformation = (): void => {
  cy.get("textarea").contains(testLandUseData.moreDetails);
};

export const iCanSeeMyLandUse = (): void => {
  Object.values(testLandUseData.type).forEach((value) => {
    cy.get("main").contains(makeEnumValueUserFriendly(value));
  });
  cy.get("main").contains(testLandUseData.communications.satelliteTelephone);
  cy.get("main").contains(testLandUseData.communications.mobileTelephone1);
  cy.get("main").contains(testLandUseData.communications.mobileTelephone2);
  cy.get("main").contains(testLandUseData.communications.otherCommunication);
  cy.get("main").contains(testLandUseData.moreDetails);
};

const givenIHaveEnteredMyLandCommunicationDetails = (): void => {
  givenIHaveSelected("#portableVhfRadio");
  givenIHaveTyped(
    testLandUseData.communications.portableMMSI,
    "#portableVhfRadioInput"
  );
  givenIHaveSelected("#satelliteTelephone");
  givenIHaveTyped(
    testLandUseData.communications.satelliteTelephone,
    "#satelliteTelephoneInput"
  );
  givenIHaveSelected("#mobileTelephone");
  givenIHaveTyped(
    testLandUseData.communications.mobileTelephone1,
    "#mobileTelephoneInput1"
  );
  givenIHaveTyped(
    testLandUseData.communications.mobileTelephone2,
    "#mobileTelephoneInput2"
  );
  givenIHaveSelected("#otherCommunication");
  givenIHaveTyped(
    testLandUseData.communications.otherCommunication,
    "#otherCommunicationInput"
  );
};

const givenIHaveEnteredMoreDetailsAboutMyLandUse = (): void => {
  givenIHaveTyped(testLandUseData.moreDetails, "#moreDetails");
};

export const iCanEditMyLandEnvironment = (): void =>
  iCanEditMyEnvironment(Environment.LAND);
