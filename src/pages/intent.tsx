import React, { FunctionComponent } from "react";
import { BackButton, Button } from "../components/Button";
import { Grid } from "../components/Grid";
import { Layout } from "../components/Layout";
import { RadioList, RadioListItemHint } from "../components/RadioList";
import {
  Form,
  FormFieldset,
  FormGroup,
  FormLegendPageHeading,
} from "../components/Form";
import { BeaconIntent } from "../lib/types";
import { ErrorSummary } from "../components/ErrorSummary";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import parse from "urlencoded-body-parser";
import {
  BeaconCacheEntry,
  FormCacheFactory,
  IFormCache,
} from "../lib/form-cache";
import { getCache } from "../lib/middleware";

interface IntentProps {
  isError: boolean;
}
const IntentPage: FunctionComponent<IntentProps> = (props): JSX.Element => (
  <>
    <Layout navigation={<BackButton href="/" />}>
      <Grid
        mainContent={
          <>
            {props.isError ? <ErrorSummaryComponent /> : ""}
            <IntentPageContent {...props} />
          </>
        }
      />
    </Layout>
  </>
);

const ErrorSummaryComponent: FunctionComponent = () => (
  <ErrorSummary>
    <li>
      <a href="#intent-error">Please select an option</a>
    </li>
  </ErrorSummary>
);

const IntentPageContent: FunctionComponent<IntentProps> = (props) => (
  <Form action="/register-a-beacon/check-beacon-details">
    <FormGroup className={props.isError ? "govuk-form-group--error" : ""}>
      <FormFieldset>
        <FormLegendPageHeading>
          What would you like to do?
        </FormLegendPageHeading>
        {props.isError ? <ErrorMessage /> : ""}
        <RadioList className="govuk-!-margin-bottom-3">
          <RadioListItemHint
            id="create-beacon"
            name="beaconIntent"
            value={BeaconIntent.CREATE}
            text="Register a new beacon"
            hintText="Choose this option to register one or multiple new beacons"
          />
          <RadioListItemHint
            id="other"
            name="beaconIntent"
            value={BeaconIntent.OTHER}
            text="Ask the Beacon Registry team a question"
            hintText="Choose this option if you have a specific question for the Beacon Registry"
          />
        </RadioList>
      </FormFieldset>
    </FormGroup>
    <Button buttonText="Continue" />
  </Form>
);

const ErrorMessage: FunctionComponent = () => (
  <span id="intent-error" className="govuk-error-message">
    <span className="govuk-visually-hidden">Error:</span> Please select an
    option
  </span>
);

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  if (context.req.method === "POST") {
    const cache: BeaconCacheEntry = getCache(context);

    console.log(cache);
    console.log("IN GET INTENT");
    let error = false;

    if (cache["errors"]) {
      error = true;
    }

    return {
      props: { isError: error },
    };
  }
  return {
    props: { isError: false },
  };
};

export default IntentPage;
