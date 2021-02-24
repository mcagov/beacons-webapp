import { GetServerSideProps } from "next";
import React, { FunctionComponent } from "react";
import { BackButton, Button } from "../../components/Button";
import {
  DateInput,
  DateListInput,
  DateListItem,
  DateType,
} from "../../components/DateInput";
import { Details } from "../../components/Details";
import { FormErrorSummary } from "../../components/ErrorSummary";
import {
  Form,
  FormFieldset,
  FormGroup,
  FormHint,
  FormLabel,
  FormLegendPageHeading,
} from "../../components/Form";
import { Grid } from "../../components/Grid";
import { Input } from "../../components/Input";
import { InsetText } from "../../components/InsetText";
import { Layout } from "../../components/Layout";
import { IfYouNeedHelp } from "../../components/Mca";
import { FormValidator } from "../../lib/formValidator";
import { FormPageProps, handlePageRequest } from "../../lib/handlePageRequest";
import { ensureFormDataHasKeys } from "../../lib/utils";

interface FormInputProps {
  value: string;
  errorMessages: string[];
  showErrors: boolean;
}

const BeaconInformation: FunctionComponent<FormPageProps> = ({
  formData,
  needsValidation = false,
}: FormPageProps): JSX.Element => {
  formData = ensureFormDataHasKeys(formData, "manufacturerSerialNumber");

  const pageHeading = "Beacon information";

  const errors = FormValidator.errorSummary(formData);

  const {
    manufacturerSerialNumber,
    chkCode,
    batteryExpiryDateMonth,
    batteryExpiryDateYear,
    lastServicedDateMonth,
    lastServicedDateYear,
  } = FormValidator.validate(formData);

  const pageHasErrors = needsValidation && FormValidator.hasErrors(formData);

  return (
    <Layout
      navigation={<BackButton href="/register-a-beacon/check-beacon-details" />}
      title={pageHeading}
      pageHasErrors={pageHasErrors}
    >
      <Grid
        mainContent={
          <>
            <FormErrorSummary showErrors={needsValidation} errors={errors} />
            <Form action="/register-a-beacon/beacon-information">
              <FormFieldset>
                <FormLegendPageHeading>{pageHeading}</FormLegendPageHeading>
                <InsetText>
                  Further information about your beacon is useful for Search and
                  Rescue. Provide as much information you can find.
                </InsetText>

                <BeaconManufacturerSerialNumberInput
                  value={formData.manufacturerSerialNumber}
                  showErrors={
                    needsValidation && manufacturerSerialNumber.invalid
                  }
                  errorMessages={manufacturerSerialNumber.errorMessages}
                />

                <BeaconCHKCode />

                <BeaconBatteryExpiryDate />

                <BeaconLastServicedDate />
              </FormFieldset>
              <Button buttonText="Continue" />
              <IfYouNeedHelp />
            </Form>
          </>
        }
      />
    </Layout>
  );
};

const BeaconManufacturerSerialNumberInput: FunctionComponent<FormInputProps> = ({
  value,
  errorMessages,
  showErrors,
}: FormInputProps): JSX.Element => (
  <FormGroup showErrors={showErrors} errorMessages={errorMessages}>
    <Input
      id="manufacturerSerialNumber"
      label="Enter beacon manufacturer serial number"
      defaultValue={value}
      htmlAttributes={{ spellCheck: false }}
    />
    <Details
      className="govuk-!-padding-top-2"
      summaryText="Where can I find the manufacturer serial number?"
    >
      TODO: Details text for where the user can find the manufacturer serial
      number.
    </Details>
  </FormGroup>
);

const BeaconCHKCode: FunctionComponent = (): JSX.Element => (
  <FormGroup>
    <Input
      id="chkCode"
      label="Enter the beacon CHK code (optional)"
      defaultValue=""
      hintText="This might be on the registration card you received when you bought the
      beacon"
      htmlAttributes={{ spellCheck: false }}
    />
    <Details
      // TODO: Add govuk-!-!-padding-top-2 to component
      className="govuk-!-padding-top-2"
      summaryText="What is the beacon CHK code?"
    >
      If the beacon manufacturer uses a CHK code, it will be written on the
      manufacturers card underneath the Hex ID or UIN and serial number. An
      example is: CHK: 9480B
    </Details>
  </FormGroup>
);

const BeaconBatteryExpiryDate: FunctionComponent = (): JSX.Element => (
  <DateListInput id="batteryExpiryDate">
    <FormLabel htmlFor="batteryExpiryDate" className="govuk-date-input__label">
      Enter your beacon battery expiry date (optional)
    </FormLabel>
    <FormHint forId="beaconBatteryExpiryDate">
      You only need to enter the month and year, for example 11 2009
    </FormHint>
    <DateListItem>
      <FormGroup>
        <FormLabel
          htmlFor="batteryExpiryDateMonth"
          className="govuk-date-input__label"
        >
          Month
        </FormLabel>
        <DateInput id="batteryExpiryDateMonth" dateType={DateType.MONTH} />
      </FormGroup>
    </DateListItem>

    <DateListItem>
      <FormGroup>
        <FormLabel
          htmlFor="beaconBatteryExpiryDateYear"
          className="govuk-date-input__label"
        >
          Year
        </FormLabel>
        <DateInput id="batteryExpiryDateYear" dateType={DateType.YEAR} />
      </FormGroup>
    </DateListItem>
  </DateListInput>
);

const BeaconLastServicedDate: FunctionComponent = (): JSX.Element => (
  <DateListInput id="lastServicedDate">
    <FormLabel htmlFor="lastServicedDate" className="govuk-date-input__label">
      When was your beacon last serviced? (optional)
    </FormLabel>
    <FormHint forId="lastServicedDate">
      You only need to enter the month and year, for example 11 2009
    </FormHint>
    <DateListItem>
      <FormGroup>
        <FormLabel
          htmlFor="lastServicedDateMonth"
          className="govuk-date-input__label"
        >
          Month
        </FormLabel>
        <DateInput id="lastServicedDateMonth" dateType={DateType.MONTH} />
      </FormGroup>
    </DateListItem>

    <DateListItem>
      <FormGroup>
        <FormLabel
          htmlFor="lastServicedDateYear"
          className="govuk-date-input__label"
        >
          Year
        </FormLabel>
        <DateInput id="lastServicedDateYear" dateType={DateType.YEAR} />
      </FormGroup>
    </DateListItem>
  </DateListInput>
);

export const getServerSideProps: GetServerSideProps = handlePageRequest(
  "/register-a-beacon/primary-beacon-use"
);

export default BeaconInformation;
