import { CreateRegistrationPageURLs } from "../../src/lib/urls";
import { testBeaconAndOwnerData } from "./happy-path-test-data.spec";
import {
  andIClickContinue,
  andIHaveSelected,
  givenIHaveClickedContinue,
  givenIHaveTyped,
  thenTheUrlShouldContain,
  whenISelectTheOptionFromTheDropdown,
} from "./selectors-and-assertions.spec";

export const givenIHaveEnteredMyBeaconDetails = (): void => {
  givenIHaveEnteredTheBeaconHexIdManufacturerAndModel();
  givenIHaveFilledInBeaconInformationPage();
};

export const givenIHaveEnteredMyRequiredBeaconDetails = (): void => {
  givenIHaveEnteredTheBeaconHexIdManufacturerAndModel();
  givenIHaveFilledInRequiredBeaconInformationPage();
};

export const givenIHaveEnteredTheBeaconHexIdManufacturerAndModel = (): void => {
  givenIHaveTyped(testBeaconAndOwnerData.beaconDetails.hexId, "#hexId");
  andIClickContinue();

  whenISelectTheOptionFromTheDropdown(
    testBeaconAndOwnerData.beaconDetails.manufacturer,
    "#manufacturer"
  );
  andIClickContinue();

  whenISelectTheOptionFromTheDropdown(
    testBeaconAndOwnerData.beaconDetails.model,
    "#model"
  );
  andIClickContinue();
};

export const givenIHaveFilledInBeaconInformationPage = (): void => {
  const beaconInfo = testBeaconAndOwnerData.additionalBeaconInformation;
  givenIHaveTyped(beaconInfo.serialNumber, "#manufacturerSerialNumber");
  givenIHaveTyped(beaconInfo.chkCode, "#chkCode");
  givenIHaveTyped(beaconInfo.csta, "#csta");
  givenIHaveTyped(beaconInfo.batteryExpiryMonth, "#batteryExpiryDateMonth");
  givenIHaveTyped(beaconInfo.batteryExpiryYear, "#batteryExpiryDateYear");
  givenIHaveTyped(beaconInfo.lastServicedMonth, "#lastServicedDateMonth");
  givenIHaveTyped(beaconInfo.lastServicedYear, "#lastServicedDateYear");
  givenIHaveClickedContinue();
};

export const givenIHaveFilledInRequiredBeaconInformationPage = (): void => {
  const beaconInfo = testBeaconAndOwnerData.additionalBeaconInformation;
  thenTheUrlShouldContain(CreateRegistrationPageURLs.beaconInformation);
  givenIHaveTyped(beaconInfo.serialNumber, "#manufacturerSerialNumber");
  givenIHaveClickedContinue();
};

export const asAMaritimeBeaconOwner = (): void => {
  givenIHaveEnteredMyBeaconDetails();

  andIHaveSelected("#maritime");
  andIClickContinue();
};

export const asAnAviationBeaconOwner = (): void => {
  givenIHaveEnteredMyBeaconDetails();

  andIHaveSelected("#aviation");
  andIClickContinue();
};

export const asAMaritimePleasureBeaconOwner = (): void => {
  asAMaritimeBeaconOwner();
  andIHaveSelected("#pleasure");
  andIClickContinue();
};

export const asALandBeaconOwner = (): void => {
  givenIHaveEnteredMyBeaconDetails();

  andIHaveSelected("#land");
  andIClickContinue();
};

export const iCanEditMyBeaconDetails = (): void =>
  Object.values(testBeaconAndOwnerData.beaconDetails).forEach((value) =>
    cy.get(`input[value="${value}"]`)
  );

export const iCanEditMyAdditionalBeaconInformation = (): void =>
  Object.values(testBeaconAndOwnerData.additionalBeaconInformation).forEach(
    (value) => cy.get(`input[value="${value}"]`)
  );

export const iCanSeeMyBeaconDetails = (): void =>
  Object.values(testBeaconAndOwnerData.beaconDetails).forEach((value) =>
    cy.contains(value)
  );

export const iCanSeeMyAdditionalBeaconInformation = (): void =>
  Object.values(testBeaconAndOwnerData.additionalBeaconInformation).forEach(
    (value) => cy.contains(value)
  );

export const iCanSeeMyRequiredAdditionalBeaconInformationOrDash = (): void =>
  Object.values(testBeaconAndOwnerData.additionalBeaconInformation).forEach(
    (value) => {
      cy.contains("Additional beacon information")
        .parent()
        .contains(new RegExp(value + "|-"));
    }
  );
