export const requiredFieldErrorMessage = "required field";

export const andICanClickTheBackLinkToGoToPreviousPage = (
  previousPageURL: string
): void => {
  cy.get(".govuk-back-link").click();
  thenTheUrlShouldContain(previousPageURL);
};

export const whenIClickContinue = (): void => {
  cy.get("button").contains("Continue").click();
};

export const thenTheUrlShouldContain = (urlPath: string): void => {
  cy.url().should("include", urlPath);
};

export const thenTheInputShouldContain = (
  expectedValue: string,
  inputName: string
): void => {
  cy.get(`input[name="${inputName}"]`).should("contain.value", expectedValue);
};

export const thenIShouldSeeAnErrorMessageThatContains = (
  errorMessage: string
): void => {
  cy.get(".govuk-error-message").should("contain", errorMessage);
};

export const thenIShouldSeeAnErrorSummaryLinkThatContains = (
  errorMessage: string
): void => {
  cy.get(".govuk-error-summary__list").within(() => {
    cy.get("a").should("contain", errorMessage);
  });
};

export const whenIType = (value: string, inputName: string): void => {
  cy.get(`input[name="${inputName}"]`).clear().type(value);
};

export const uncheckAllCheckboxes = (): void => {
  cy.get('[type="checkbox"]').uncheck();
};
