import React, { FunctionComponent } from "react";
import { BackButton, StartButton } from "../components/Button";
import { Grid } from "../components/Grid";
import { Layout } from "../components/Layout";
import { SummaryList, SummaryListItem } from "../components/SummaryList";

const BeaconSummaryPage: FunctionComponent = () => (
  <>
    <Layout>
      <Grid
        mainContent={
          <>
            <BackButton href="/beacon-information" />
            <PageHeading />
            <BeaconInformation />
            <AcceptAndSent />
          </>
        }
      />
    </Layout>
  </>
);

const PageHeading: FunctionComponent = () => (
  <h1 className="govuk-heading-l">
    Check your answers before sending in your registration
  </h1>
);

export const BeaconInformation: FunctionComponent = () => (
  <>
    <h3 className="govuk-heading-m">Beacon Information</h3>
    <SummaryList>
      <SummaryListItem
        labelText="Beacon manufacturer"
        valueText="Name of a manufacturer"
        actionText="Change"
        actionValue="beacon-manufacturer"
        actionHref="/check-beacon-details"
      />
      <SummaryListItem
        labelText="Beacon model"
        valueText="Model name"
        actionText="Change"
        actionValue="beacon-model"
        actionHref="/check-beacon-details"
      />
      <SummaryListItem
        labelText="Beacon HEX ID"
        valueText="AF67 BB81 23CD 111"
        actionText="Change"
        actionValue="beacon-hex"
        actionHref="/check-beacon-details"
      />
      <SummaryListItem
        labelText="Manufacturer serial number"
        valueText="Serial number"
        actionText="Change"
        actionValue="beacon-manufacturer-serial-number"
        actionHref="/beacon-information"
      />
      <SummaryListItem
        labelText="Battery expiry date"
        valueText="12 September 2026"
        actionText="Change"
        actionValue="beacon-battery-expiry-date"
        actionHref="/beacon-information"
      />
      <SummaryListItem
        labelText="Beacon service date"
        valueText="08 June 2019"
        actionText="Change"
        actionValue="beacon-service-date"
        actionHref="/beacon-information"
      />
    </SummaryList>
  </>
);

const AcceptAndSent: FunctionComponent = () => (
  <>
    <h3 className="govuk-heading-m">Now send in your application</h3>
    <div className="govuk-body">
      By submitting this registration you are confirming that, to the best of
      your knowledge, the details you are providing are correct.
    </div>
    <StartButton buttonText="Accept and send" href="/application-complete" />
  </>
);

export default BeaconSummaryPage;
