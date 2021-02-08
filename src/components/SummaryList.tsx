import React, { FunctionComponent, ReactNode } from "react";

interface SummaryListProps {
  children: ReactNode;
}

interface SummaryListItemProps {
  labelText: string;
  valueText: string;
  actionText?: string;
  actionValue?: string;
  actionHref?: string;
}

export const SummaryList: FunctionComponent<SummaryListProps> = ({
  children,
}: SummaryListProps): JSX.Element => (
  <dl className="govuk-summary-list">{children}</dl>
);

export const SummaryListItem: FunctionComponent<SummaryListItemProps> = ({
  labelText,
  valueText,
  actionText,
  actionValue,
  actionHref,
}: SummaryListItemProps): JSX.Element => (
  <div className="govuk-summary-list__row">
    <dt className="govuk-summary-list__key">{labelText}</dt>
    <dd className="govuk-summary-list__value">{valueText}</dd>
    <dd className="govuk-summary-list__actions">
      <a className="govuk-link" href={actionHref}>
        {actionText}
        <span className="govuk-visually-hidden"> {actionValue}</span>
      </a>
    </dd>
  </div>
);
