import React, { FunctionComponent } from "react";
import Head from "next/head";
import { StartButton } from "../components/Button";

const ServiceStartPage: FunctionComponent = () => (
  <>
    <Head>
      <title>Beacon Registration Service - Register a new beacon</title>
    </Head>

    <AboutTheService />

    <StartButton />

    <OtherWaysToAccessTheService />
  </>
);
export default ServiceStartPage;

const AboutTheService: FunctionComponent = () => (
  <>
    <h1 className="govuk-heading-l">Register or update a 406 MHz beacon</h1>

    <p className="govuk-body">
      Use this service to register or update an existing 406MHz distress beacon.
    </p>

    <h2 className="govuk-heading-m">How long it takes</h2>

    <p className="govuk-body">
      TO UPDATE: It takes up to xxx weeks to register your beacon online.
    </p>

    <h2 className="govuk-heading-m">Before you start</h2>

    <p className="govuk-body">
      TO UPDATE: You will need certain information before you start.
    </p>
  </>
);

const OtherWaysToAccessTheService: FunctionComponent = () => (
  <>
    <h2 className="govuk-heading-m">Other ways to apply</h2>

    <p className="govuk-body">
      TO UPDATE: You can request postal forms by emailing.
    </p>
  </>
);
