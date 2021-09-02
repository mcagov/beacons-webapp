import { v4 } from "uuid";

export const requiredFieldErrorMessage = "required field";
export const tooManyCharactersErrorMessage = "too many characters";

export const iCanClickTheBackLinkToGoToPreviousPage = (
  previousPageURL: string
): void => {
  cy.get(".govuk-back-link").click();
  thenTheUrlShouldContain(previousPageURL);
};

export const givenIHaveACookieSetAndIVisit = (url: string): void => {
  cy.setCookie("submissionId", v4());
  cy.visit(url);
};

export const givenIHaveACookieSetAndHaveSignedInIVisit = (
  url: string
): void => {
  givenIHaveACookieSetAndHaveSignedIn();
  cy.visit(url);
};

export const givenIHaveACookieSetAndHaveSignedIn = (): void => {
  cy.setCookie("submissionId", v4());
  givenIHaveSignedIn();
};

export const givenIHaveSignedIn = (): void => {
  cy.setCookie("next-auth.session-token", Cypress.env("SESSION_TOKEN"), {
    log: false,
  });
};

export const givenIHaveNotSignedIn = (): void => {
  cy.clearCookie("next-auth.session-token");
};

export const givenIAmAt = (url: string): void => {
  cy.visit(url);
};

export const givenIHaveBeenTo = givenIAmAt;
export const whenIAmAt = givenIAmAt;
export const andIAmAt = givenIAmAt;
export const iAmAt = givenIAmAt;

export const iCanSeeAPageHeadingThatContains = (text: string): void => {
  cy.get("h1").contains(text);
};

export const iCanSeeASectionHeadingThatContains = (text: string): void => {
  cy.get("h2").contains(text);
};

export const iCanSeeNLinksContaining = (n: number, text: string): void => {
  cy.get(`a[href]:contains(${text})`).should("have.length", n);
};

export const iCanSeeAButtonContaining = (text: string | RegExp): void => {
  cy.get(`[role=button]:contains(${text})`);
};

export const givenIHaveClickedTheButtonContaining = (text: string): void => {
  cy.get(`[role=button]:contains(${text})`).click();
};

export const andIClickTheButtonContaining =
  givenIHaveClickedTheButtonContaining;

export const whenIClickTheButtonContaining =
  givenIHaveClickedTheButtonContaining;

export const whenIClickContinue = (): void => {
  givenIHaveClickedTheButtonContaining("Continue");
};

export const andIClickContinue = whenIClickContinue;
export const givenIHaveClickedContinue = whenIClickContinue;

export const givenIHaveClicked = (selector: string): void => {
  cy.get(selector).click();
};

export const whenIClickOnTheErrorSummaryLinkContaining = (
  ...strings: string[]
): void => {
  let link = cy.get(".govuk-error-summary__list");
  strings.forEach((string) => (link = link.contains(string)));
  link.click();
};

export const whenIType = (value: string, selector: string): void => {
  cy.get(selector).should("be.empty").type(value);
};

export const whenIClearAndType = (value: string, selector: string): void => {
  cy.get(selector).clear().type(value);
};

export const givenIHaveTyped = whenIType;
export const andIType = whenIType;

export const whenIClearTheInput = (selector: string): void => {
  cy.get(selector).clear();
};

export const givenIHaveClearedTheInput = whenIClearTheInput;

export const thenTheUrlShouldContain = (urlPath: string): void => {
  cy.url().should("include", urlPath);
};

export const thenTheUrlPathShouldBe = (urlPath: string): void => {
  cy.url().should("include", Cypress.config().baseUrl + urlPath);
};

export const thenTheInputShouldOnlyContain = (
  expectedValue: string,
  selector: string
): void => {
  cy.get(selector).should("have.value", expectedValue);
};

export const thenIShouldSeeAnErrorSummaryLinkThatContains = (
  ...strings: string[]
): void => {
  cy.get(".govuk-error-summary__list").within(() => {
    strings.every((string) => cy.get("a").should("contain", string));
  });
};

export const thenIShouldSeeAnErrorMessageThatContains = (
  ...strings: string[]
): void => {
  strings.every((string) =>
    cy.get(".govuk-error-message").should("contain", string)
  );
};

export const thenIShouldSeeFormErrors = (...errorMessages: string[]): void => {
  thenIShouldSeeAnErrorSummaryLinkThatContains(...errorMessages);
  thenIShouldSeeAnErrorMessageThatContains(...errorMessages);
};

export const thenMyFocusMovesTo = (selector: string): void => {
  cy.get(selector).should("be.focused");
};

export const givenIHaveSelected = (selector: string): void => {
  cy.get(selector).should("not.be.checked").check();
};
export const andIHaveSelected = givenIHaveSelected;

export const givenIHaveUnselected = (selector: string): void => {
  cy.get(selector).should("be.checked").uncheck();
};

export const givenIHaveWaitedForAzureB2C = (): void => {
  cy.wait(1000);
};

export const andIHaveEnteredNoInformation = (): void => null;

export const whenIClickBack = (): void => {
  cy.get(".govuk-back-link").click();
};

export const thenTheCheckboxShouldBeChecked = (selector: string): void => {
  cy.get(selector).should("be.checked");
};

export const thenTheRadioButtonShouldBeSelected =
  thenTheCheckboxShouldBeChecked;

export const thenICannotSee = (selector: string): void => {
  cy.get(selector).should("not.exist");
};

export const thenICanSeeAnInputWithPlaceholder = (
  inputId: string,
  placeholderText: string
): void => {
  cy.get(inputId).should("have.attr", "placeholder", placeholderText);
};

export const thenThereAreNoErrors = (): void => {
  thenICannotSee(".govuk-error-summary");
  thenICannotSee(".govuk-error-message");
};
