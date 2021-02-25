import { GetServerSideProps } from "next";
import React, { FunctionComponent } from "react";
import { BackButton, Button } from "../../components/Button";
import {
  Form,
  FormFieldset,
  FormGroup,
  FormLegendPageHeading,
} from "../../components/Form";
import { Grid } from "../../components/Grid";
import { Input } from "../../components/Input";
import { Layout } from "../../components/Layout";
import { IfYouNeedHelp } from "../../components/Mca";
import { withCookieRedirect } from "../../lib/middleware";

const AboutTheOwner: FunctionComponent = (): JSX.Element => {
  const pageHeading = "About the beacon owner";

  // TODO: Use form validation to set this
  const pageHasErrors = false;
  return (
    <>
      <Layout
        navigation={<BackButton href="/register-a-beacon/about-the-vessel" />}
        title={pageHeading}
        pageHasErrors={pageHasErrors}
      >
        <Grid
          mainContent={
            <>
              <Form action="/register-a-beacon/about-the-owner">
                <FormFieldset>
                  <FormLegendPageHeading>{pageHeading}</FormLegendPageHeading>

                  <FullName />

                  <TelephoneNumber />

                  <AlternativeTelephoneNumber />

                  <EmailAddress />
                </FormFieldset>
                <Button buttonText="Continue" />
              </Form>
              <IfYouNeedHelp />
            </>
          }
        />
      </Layout>
    </>
  );
};

const FullName: FunctionComponent = (): JSX.Element => (
  <FormGroup>
    <Input id="ownerName" label="Full name" />
  </FormGroup>
);

const TelephoneNumber: FunctionComponent = (): JSX.Element => (
  <FormGroup>
    <Input
      id="telephoneNumber"
      label="Telephone number (optional)"
      hintText="This can be a mobile or landline. For international numbers include the country code."
    />
  </FormGroup>
);

const AlternativeTelephoneNumber: FunctionComponent = (): JSX.Element => (
  <FormGroup>
    <Input
      id="alternativeTelephoneNumber"
      label="Additional telephone number (optional)"
      hintText="This can be a mobile or landline. For international numbers include the country code."
    />
  </FormGroup>
);

const EmailAddress: FunctionComponent = (): JSX.Element => (
  <FormGroup>
    <Input
      id="emailAddress"
      label="Email address (optional)"
      hintText="You will receive an email confirming your beacon registration application, including a reference
        number if you need to get in touch with the beacons registry team."
    />
  </FormGroup>
);

export const getServerSideProps: GetServerSideProps = withCookieRedirect(
  async () => {
    return {
      props: {},
    };
  }
);

export default AboutTheOwner;
