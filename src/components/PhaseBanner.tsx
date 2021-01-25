import React from "react";

interface PhaseBannerProps {
  phase: string;
  bannerHtml: JSX.Element;
}

export const PhaseBanner: React.FC<PhaseBannerProps> = (
  props: PhaseBannerProps
): JSX.Element => (
  <div className="govuk-phase-banner">
    <p className="govuk-phase-banner__content">
      <strong className="govuk-tag govuk-phase-banner__content__tag">
        {props.phase}
      </strong>
      <span className="govuk-phase-banner__text">{props.bannerHtml}</span>
    </p>
  </div>
);
