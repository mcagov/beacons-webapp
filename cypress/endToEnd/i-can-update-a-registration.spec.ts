import { Registration } from "../../src/entities/Registration";
import {
  Environment,
  Purpose,
} from "../../src/lib/deprecatedRegistration/types";
import { AccountPageURLs, UpdatePageURLs } from "../../src/lib/urls";
import { formatDateLong, formatMonth } from "../../src/lib/writingStyle";
import { iAmPromptedToConfirm } from "../common/i-am-prompted-to-confirm.spec";
import { givenIHaveEnteredMyMaritimeUse } from "../common/i-can-enter-use-information/maritime.spec";
import { iCanSeeMyExistingRegistrationHexId } from "../common/i-can-see-my-existing-registration-hex-id.spec";
import {
  iHavePreviouslyRegisteredABeacon,
  randomUkEncodedHexId,
} from "../common/i-have-previously-registered-a-beacon.spec";
import {
  andIClickTheButtonContaining,
  givenIHaveSignedIn,
  iCanSeeAPageHeadingThatContains,
  theBackLinkGoesTo,
  theBackLinkGoesTo_WithRegistrationId,
  thenTheUrlShouldContain,
  whenIAmAt,
  whenIClickContinue,
  whenIClickTheButtonContaining,
} from "../common/selectors-and-assertions.spec";
import { thereAreNUses } from "../common/there-are-n-uses.spec";
import { whenIGoToDeleteMy } from "../common/when-i-go-to-delete-my.spec";
import { singleBeaconRegistration } from "../fixtures/singleBeaconRegistration";

describe("As an account holder", () => {
  it("I can update one of my registrations", () => {
    givenIHaveSignedIn();
    andIHavePreviouslyRegisteredABeacon(testRegistration);

    whenIAmAt(AccountPageURLs.accountHome);
    iCanSeeMyExistingRegistrationHexId(testRegistration.hexId);

    whenIClickOnTheHexIdOfTheRegistrationIWantToUpdate(testRegistration.hexId);
    iCanUpdateTheDetailsOfMyExistingRegistration(testRegistration);
  });
});

const testRegistration: Registration = {
  ...singleBeaconRegistration,
  hexId: randomUkEncodedHexId(),
};

const andIHavePreviouslyRegisteredABeacon = iHavePreviouslyRegisteredABeacon;

const whenIClickOnTheHexIdOfTheRegistrationIWantToUpdate = (hexId: string) => {
  cy.get("a").contains(hexId).click();
};

const iCanUpdateTheDetailsOfMyExistingRegistration = (
  registration: Registration
) => {
  iCanSeeMyExistingRegistrationHexId(registration.hexId);
  const dateRegistered = formatDateLong(new Date().toDateString()); // Assume test user registered beacon on same day for ease)
  iCanSeeTheHistoryOfMyRegistration(dateRegistered, dateRegistered);
  iCanSeeMyBeaconInformation(registration);
  iCanSeeAdditionalBeaconInformation(registration);
  iCanSeeOwnerInformation(registration);
  iCanSeeEmergencyContactInformation(registration);
  iCanSeeUseInformation(registration);

  whenIClickTheUpdateButtonForTheSectionWithHeading("Beacon information");
  thenTheUrlShouldContain(UpdatePageURLs.beaconDetails);
  theBackLinkGoesTo_WithRegistrationId(UpdatePageURLs.registrationSummary);

  iEditMyBeaconManufacturerAndModel(registration, "McMurdo", "New Beacon");
  iCanSeeButICannotEditMyHexId(registration);
  whenIClickContinue();

  thenTheUrlShouldContain(UpdatePageURLs.beaconInformation);
  theBackLinkGoesTo_WithRegistrationId(UpdatePageURLs.beaconDetails);
  iEditMyBeaconInformation(
    registration,
    "New SerialNumber",
    "New Chk code",
    "01",
    "2050",
    "12",
    "2020"
  );
  whenIClickContinue();

  thenTheUrlShouldContain(UpdatePageURLs.usesSummary);
  whenIGoToDeleteMy(/main use/i);
  iAmPromptedToConfirm(
    registration.uses[0].environment,
    registration.uses[0].purpose,
    registration.uses[0].activity
  );

  whenIClickTheButtonContaining("Yes");
  thereAreNUses(0);

  andIClickTheButtonContaining("Add a use");
  iCanSeeAPageHeadingThatContains("main use");
  iAmOnTheUpdateFlow();
  givenIHaveEnteredMyMaritimeUse(Purpose.PLEASURE);
  iAmOnTheUpdateFlow();
  thereAreNUses(1);

  whenIClickContinue();
  thenTheUrlShouldContain(UpdatePageURLs.aboutBeaconOwner);
  theBackLinkGoesTo(UpdatePageURLs.usesSummary);

  iEditMyOwnerInformation(
    registration,
    "John Johnnsonn",
    "0711111111",
    "02012345678",
    "hello@hello.com"
  );
  whenIClickContinue();
  thenTheUrlShouldContain(UpdatePageURLs.beaconOwnerAddress);
  theBackLinkGoesTo(UpdatePageURLs.aboutBeaconOwner);
  iEditMyOwnerAddress(
    registration,
    "1 Street",
    "Area",
    "Town",
    "County",
    "AB1 2CD"
  );

  whenIClickContinue();
  thenTheUrlShouldContain(UpdatePageURLs.emergencyContact);
  theBackLinkGoesTo(UpdatePageURLs.beaconOwnerAddress);
  iEditMyEmergencyContactInformation(registration, "Dr Martha", "0712345678");

  whenIClickContinue();
  thenTheUrlShouldContain(UpdatePageURLs.checkYourAnswers);
  theBackLinkGoesTo(UpdatePageURLs.emergencyContact);

  whenIClickTheButtonContaining("Accept and send");
  thenTheUrlShouldContain(UpdatePageURLs.updateComplete);
  iCanSeeAPageHeadingThatContains("Your beacon registration has been updated");
  whenIClickTheButtonContaining("Return to your Account");
  thenTheUrlShouldContain(AccountPageURLs.accountHome);
};

const iCanSeeTheHistoryOfMyRegistration = (
  dateRegistered: string,
  dateUpdated: string
) => {
  cy.get(".govuk-summary-list__value")
    .should("contain", "First registered")
    .and("contain", dateRegistered);

  cy.get(".govuk-summary-list__value")
    .should("contain", "Last updated")
    .and("contain", dateUpdated);
};

const iCanSeeMyBeaconInformation = (registration: Registration) => {
  cy.get("main").contains(registration.manufacturer);
  cy.get("main").contains(registration.model);
  cy.get("main").contains(registration.hexId);
};

const iCanSeeAdditionalBeaconInformation = (registration: Registration) => {
  cy.get("main").contains(registration.manufacturerSerialNumber);
  cy.get("main").contains(formatMonth(registration.batteryExpiryDate));
  cy.get("main").contains(formatMonth(registration.lastServicedDate));
};

const iCanSeeOwnerInformation = (registration: Registration) => {
  cy.get("main").contains(registration.ownerFullName);
  cy.get("main").contains(registration.ownerTelephoneNumber);
  cy.get("main").contains(registration.ownerAlternativeTelephoneNumber);
  cy.get("main").contains(registration.ownerEmail);
  cy.get("main").contains(registration.ownerAddressLine1);
  if (registration.ownerAddressLine2) {
    cy.get("main").contains(registration.ownerAddressLine2);
  }
  cy.get("main").contains(registration.ownerTownOrCity);
  cy.get("main").contains(registration.ownerPostcode);
};

const iCanSeeEmergencyContactInformation = (registration: Registration) => {
  cy.get("main").contains(registration.emergencyContact1FullName);
  cy.get("main").contains(registration.emergencyContact1TelephoneNumber);
  if (registration.emergencyContact1AlternativeTelephoneNumber) {
    cy.get("main").contains(
      registration.emergencyContact1AlternativeTelephoneNumber
    );
  }
  cy.get("main").contains(registration.emergencyContact2FullName);
  cy.get("main").contains(registration.emergencyContact2TelephoneNumber);
  if (registration.emergencyContact2AlternativeTelephoneNumber) {
    cy.get("main").contains(
      registration.emergencyContact2AlternativeTelephoneNumber
    );
  }
  cy.get("main").contains(registration.emergencyContact3FullName);
  cy.get("main").contains(registration.emergencyContact3TelephoneNumber);
  if (registration.emergencyContact3AlternativeTelephoneNumber) {
    cy.get("main").contains(
      registration.emergencyContact3AlternativeTelephoneNumber
    );
  }
};

const iCanSeeUseInformation = (registration: Registration) => {
  registration.uses.forEach((use) => {
    cy.get("main").contains(new RegExp(use.environment, "i"));
    cy.get("main").contains(new RegExp(use.activity, "i"));
    if (use.environment !== Environment.LAND) {
      cy.get("main").contains(new RegExp(use.purpose, "i"));
    }

    cy.get("main").contains("About this use");
    cy.get("main").contains("Communications");
    cy.get("main").contains("More details");
  });
};

const whenIClickTheUpdateButtonForTheSectionWithHeading = (heading: string) => {
  cy.get("dt")
    .contains(heading)
    .parent()
    .contains(/change/i)
    .click();
};

export const iEditMyBeaconManufacturerAndModel = (
  registration: Registration,
  newManufacturer: string,
  newModel: string
): void => {
  cy.get(`input[value="${registration.manufacturer}"]`)
    .clear()
    .type(newManufacturer);
  cy.get(`input[value="${registration.model}"]`).clear().type(newModel);
};

export const iCanSeeButICannotEditMyHexId = (
  registration: Registration
): void => {
  cy.get("main").contains(registration.hexId);
};

export const iEditMyBeaconInformation = (
  registration: Registration,
  newManufacturerSerialNumber: string,
  newChkCode: string,
  newBatteryExpiryDateMonth: string,
  newBatteryExpiryDateYear: string,
  newLastServicedDateMonth: string,
  newLastServicedDateYear: string
): void => {
  cy.get(`input[value="${registration.manufacturerSerialNumber}"]`)
    .clear()
    .type(newManufacturerSerialNumber);
  cy.get(`input[value="${registration.chkCode}"]`).clear().type(newChkCode);
  cy.get(`input[value="${registration.batteryExpiryDateMonth}"]`)
    .clear()
    .type(newBatteryExpiryDateMonth);
  cy.get(`input[value="${registration.batteryExpiryDateYear}"]`)
    .clear()
    .type(newBatteryExpiryDateYear);
  cy.get(`input[value="${registration.lastServicedDateMonth}"]`)
    .clear()
    .type(newLastServicedDateMonth);
  cy.get(`input[value="${registration.lastServicedDateYear}"]`)
    .clear()
    .type(newLastServicedDateYear);
};

const iAmOnTheUpdateFlow = () => {
  cy.url().should("contain", "manage-my-registrations/update");
};

const iEditMyOwnerInformation = (
  registration,
  newFullName,
  newTelephoneNumber,
  newAlternativeTelephoneNumber,
  newEmail
) => {
  cy.get(`input[value="${registration.ownerFullName}"]`)
    .clear()
    .type(newFullName);
  cy.get(`input[value="${registration.ownerTelephoneNumber}"]`)
    .clear()
    .type(newTelephoneNumber);
  cy.get(`input[value="${registration.ownerAlternativeTelephoneNumber}"]`)
    .clear()
    .type(newAlternativeTelephoneNumber);
  cy.get(`input[value="${registration.ownerEmail}"]`).clear().type(newEmail);
};

const iEditMyOwnerAddress = (
  registration,
  newAddressLine1,
  newAddressLine2,
  newTownOrCity,
  newCounty,
  newPostcode
) => {
  cy.get(`input[value="${registration.ownerAddressLine1}"]`)
    .clear()
    .type(newAddressLine1);
  cy.get(`input[value="${registration.ownerAddressLine2}"]`)
    .clear()
    .type(newAddressLine2);
  cy.get(`input[value="${registration.ownerTownOrCity}"]`)
    .clear()
    .type(newTownOrCity);
  cy.get(`input[value="${registration.ownerCounty}"]`).clear().type(newCounty);
  cy.get(`input[value="${registration.ownerPostcode}"]`)
    .clear()
    .type(newPostcode);
};

const iEditMyEmergencyContactInformation = (
  registration: Registration,
  newEmergencyContactName,
  newEmergencyContactTelephoneNumber
) => {
  cy.get("#emergencyContact1FullName")
    .clear()
    .type(`${newEmergencyContactName}`);
  cy.get("#emergencyContact1TelephoneNumber")
    .clear()
    .type(`${newEmergencyContactTelephoneNumber}0`);
  cy.get("#emergencyContact1AlternativeTelephoneNumber")
    .clear()
    .type(`${newEmergencyContactTelephoneNumber}1`);
};

// const iCanSeeMyUpdatedRegistration = (regis)
