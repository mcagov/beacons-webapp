import { useRouter } from "next/router";
import React, { FunctionComponent, ReactNode } from "react";
import { FormError } from "../lib/form/FormManager";
import { BackButton, Button } from "./Button";
import { FormErrorSummary } from "./ErrorSummary";
import {
  Form,
  FormFieldset,
  FormGroup,
  FormLabel,
  FormLegendPageHeading,
} from "./Form";
import { Grid } from "./Grid";
import { Layout } from "./Layout";
import { IfYouNeedHelp } from "./Mca";
import { GovUKBody } from "./Typography";

interface BeaconsFormProps {
  children: ReactNode;
  previousPageUrl: string;
  pageHeading: string;
  showCookieBanner: boolean;
  formErrors?: FormError[];
  errorMessages?: string[];
  pageText?: string | ReactNode;
  includeUseIndex?: boolean;
  continueButton?: JSX.Element;
  cancelButton?: JSX.Element;
  id?: string;
  headingType?: "label" | "legend";
}

export const BeaconsForm: FunctionComponent<BeaconsFormProps> = ({
  children,
  previousPageUrl,
  pageHeading,
  showCookieBanner,
  formErrors = [],
  errorMessages = [],
  pageText = null,
  continueButton = <Button buttonText="Continue" />,
  cancelButton = null,
  headingType,
  id = "",
}: BeaconsFormProps): JSX.Element => {
  const pageTextComponent: ReactNode =
    typeof pageText === "string" ? <GovUKBody>{pageText}</GovUKBody> : pageText;

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
              <FormGroup errorMessages={errorMessages}>
                {headingType === "label" ? (
                  <>
                    <h1 className="govuk-label-wrapper">
                      <FormLabel htmlFor={id} className="govuk-label--l">
                        {pageHeading}
                      </FormLabel>
                    </h1>
                    {pageTextComponent}
                    {children}
                  </>
                ) : headingType === "legend" ? (
                  <FormFieldset>
                    <FormLegendPageHeading>{pageHeading}</FormLegendPageHeading>
                    {pageTextComponent}
                    {children}
                  </FormFieldset>
                ) : (
                  <>
                    <h1 className="govuk-heading-l govuk-!-margin-bottom-3">
                      {pageHeading}
                    </h1>
                    {pageTextComponent}
                    {children}
                  </>
                )}
                <HiddenFormMetadata />
              </FormGroup>
              {cancelButton}
              {continueButton}
            </Form>
            <IfYouNeedHelp />
          </>
        }
      />
    </Layout>
  );
};

const HiddenFormMetadata: FunctionComponent = () => {
  const router = useRouter();
  const useIndexValue = router?.query.useIndex || 0;

  return (
    <input id="use-index" type="hidden" name="useIndex" value={useIndexValue} />
  );
};
