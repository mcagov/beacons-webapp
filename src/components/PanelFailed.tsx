import React from "react";

export const PanelFailed = () => (
  <div
    className="govuk-error-summary"
    aria-labelledby="error-summary-title"
    role="alert"
    data-module="govuk-error-summary"
  >
    <h2 className="govuk-error-summary__title" id="error-summary-title">
      There is a problem
    </h2>
    <div className="govuk-error-summary__body">
      <ul className="govuk-list govuk-error-summary__list">
        <li>
          {
            "We could not save your registration. Please contact the Beacon Registry team using the details below."
          }
        </li>
      </ul>
    </div>
  </div>
);
