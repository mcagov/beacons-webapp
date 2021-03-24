import React, { FunctionComponent, ReactNode } from "react";
import { FormError } from "../lib/form/formManager";
import { BackButton, Button } from "./Button";
import { FormErrorSummary } from "./ErrorSummary";
import { Form, FormFieldset, FormGroup, FormLegendPageHeading } from "./Form";
import { Grid } from "./Grid";
import { InsetText } from "./InsetText";
import { Layout } from "./Layout";
import { IfYouNeedHelp } from "./Mca";

interface BeaconsFormProps {
  children: ReactNode;
  previousPageUrl: string;
  pageHeading: string;
  showCookieBanner: boolean;
  formErrors?: FormError[];
  insetText?: ReactNode;
  errorMessagesIfSingleField?: string[];
}

export const BeaconsForm: FunctionComponent<BeaconsFormProps> = ({
  children,
  previousPageUrl,
  pageHeading,
  showCookieBanner,
  formErrors = [],
  insetText = null,
  errorMessagesIfSingleField = [],
}: BeaconsFormProps): JSX.Element => {
  let insetComponent;
  if (insetText) {
    insetComponent = <InsetText>{insetText}</InsetText>;
  }

  return (
    <Layout
      navigation={<BackButton href={previousPageUrl} />}
      title={pageHeading}
      showCookieBanner={showCookieBanner}
    >
      <Grid
        mainContent={
          <>
            <FormErrorSummary formErrors={formErrors} />
            <Form>
              <FormGroup
                errorMessagesIfSingleField={errorMessagesIfSingleField}
              >
                <FormFieldset>
                  <FormLegendPageHeading>{pageHeading}</FormLegendPageHeading>
                </FormFieldset>
                {insetComponent}
                {children}
              </FormGroup>
              <Button buttonText="Continue" />
            </Form>
            <IfYouNeedHelp />
          </>
        }
      />
    </Layout>
  );
};
