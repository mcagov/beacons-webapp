import React, { FunctionComponent } from "react";
import { Grid } from "../../components/Grid";
import { InsetText } from "../../components/InsetText";
import { Layout } from "../../components/Layout";
import { Button, BackButton } from "../../components/Button";
import {
  Form,
  FormFieldset,
  Input,
  FormLegendPageHeading,
  FormLabel,
  FormGroup,
  Select,
  SelectOption,
  FormHint,
} from "../../components/Form";
import { Details } from "../../components/Details";
import { IfYouNeedHelp } from "../../components/Mca";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { BeaconCacheEntry } from "../../lib/form-cache";
import { getCache, updateFormCache } from "../../lib/middleware";
import { ErrorSummary } from "../../components/ErrorSummary";
import { FieldValidator } from "../../lib/FieldValidator";

interface CheckBeaconDetailsProps {
  manufacturer: string;
  model: string;
  hexId: string;
}

interface BeaconManufacturerSelectProps {
  value: string;
  isError: boolean;
  errorMessages: Array<string>;
}

interface BeaconModelSelectProps {
  value: string;
  isError: boolean;
  errorMessages: Array<string>;
}

interface BeaconHexIdSelectProps {
  isError: boolean;
}

interface ErrorMessageProps {
  id: string;
  message: string;
}

interface ErrorSummaryComponentProps {
  fields: Array<FieldValidator>;
}

// // Form validation rules with error messages

const manufacturerField = new FieldValidator("manufacturer");

manufacturerField
  .should()
  .containANonEmptyString()
  .withErrorMessage("Manufacturer should not be empty");

const modelField = new FieldValidator("model");

modelField
  .should()
  .containANonEmptyString()
  .withErrorMessage("Model should not be empty");

const CheckBeaconDetails: FunctionComponent<CheckBeaconDetailsProps> = ({
  manufacturer,
  model,
  hexId,
}: CheckBeaconDetailsProps): JSX.Element => {
  // Form validation rules with error messages
  manufacturerField.value = manufacturer;
  modelField.value = model;
  return (
    <>
      <Layout navigation={<BackButton href="/intent" />}>
        <Grid
          mainContent={
            <>
              {/*<ErrorSummaryComponent fields={[manufacturer]} />*/}
              <Form action="/register-a-beacon/check-beacon-details">
                <FormFieldset>
                  <FormLegendPageHeading>
                    Check beacon details
                  </FormLegendPageHeading>
                  <InsetText>
                    The details of your beacon must be checked to ensure they
                    have a UK encoding and if they are already registered with
                    this service.
                  </InsetText>

                  <BeaconManufacturerSelect
                    value={manufacturer}
                    isError={manufacturerField.hasError()}
                    errorMessages={manufacturerField.errorMessages()}
                  />

                  <BeaconModelSelect
                    value={model}
                    isError={modelField.hasError()}
                    errorMessages={modelField.errorMessages()}
                  />

                  {/*<BeaconHexIdInput />*/}
                </FormFieldset>
                <Button buttonText="Submit" />
              </Form>
              <IfYouNeedHelp />
            </>
          }
        />
      </Layout>
    </>
  );
};

// const ErrorSummaryComponent: FunctionComponent<ErrorSummaryComponentProps> = ({
//   fields,
// }: ErrorSummaryComponentProps) => (
//   <ErrorSummary>
//     {fields.map((field, fieldIndex) => {
//       field.errorMessages().map((errorMessage, msgIndex) => (
//         <li key={`${fieldIndex}-${msgIndex}`}>
//           <a href={field.name}>{errorMessage}</a>
//         </li>
//       ));
//     })}
//   </ErrorSummary>
// );

const ErrorMessage: FunctionComponent<ErrorMessageProps> = ({
  id,
  message,
}: ErrorMessageProps) => (
  <span id={id} className="govuk-error-message">
    <span className="govuk-visually-hidden">Error:</span> {message}
  </span>
);

const BeaconManufacturerSelect: FunctionComponent<BeaconManufacturerSelectProps> = ({
  value = "default",
  isError,
  errorMessages,
}: BeaconManufacturerSelectProps): JSX.Element => (
  <FormGroup hasError={isError}>
    <FormLabel htmlFor="manufacturer">
      Select your beacon manufacturer
    </FormLabel>
    {isError &&
      errorMessages.map((message, index) => (
        <ErrorMessage
          id={`manufacturer-error-${index}`}
          key={`manufacturer-error-${index}`}
          message={message}
        />
      ))}
    <Select name="manufacturer" id="manufacturer" defaultValue={value}>
      <option hidden disabled value="default">
        Beacon manufacturer
      </option>
      <SelectOption value="Raleigh">Raleigh</SelectOption>
      <SelectOption value="Giant">Giant</SelectOption>
      <SelectOption value="Trek">Trek</SelectOption>
    </Select>
  </FormGroup>
);

const BeaconModelSelect: FunctionComponent<BeaconModelSelectProps> = ({
  value = "default",
  isError,
  errorMessages,
}: BeaconModelSelectProps): JSX.Element => (
  <FormGroup hasError={isError}>
    <FormLabel htmlFor="model">Select your beacon model</FormLabel>
    {isError &&
      errorMessages.map((message, index) => (
        <ErrorMessage
          id={`model-error-${index}`}
          key={`model-error-${index}`}
          message={message}
        />
      ))}
    <Select name="model" id="model" defaultValue={value}>
      <option hidden disabled value="default">
        Beacon model
      </option>
      <SelectOption value="Chopper">Chopper</SelectOption>
      <SelectOption value="TCR">TCR</SelectOption>
      <SelectOption value="Madone">Madone</SelectOption>
    </Select>
  </FormGroup>
);

// const BeaconHexIdInput: FunctionComponent<BeaconHexIdSelectProps> = ({
//   isError,
// }: BeaconHexIdSelectProps): JSX.Element => (
//   <FormGroup hasError={isError}>
//     <FormLabel htmlFor="hexId">Enter the 15 digit beacon HEX ID</FormLabel>
//     {isError && (
//       <ErrorMessage id={"hexId"} message={"Please enter a valid Hex ID"} />
//     )}
//     <FormHint forId="hexId">
//       This will be on your beacon. It must be 15 characters long and use
//       characters 0-9, A-F
//     </FormHint>
//     <Input name="hexId" id="hexId" htmlAttributes={{ spellCheck: false }} />
//     <Details
//       summaryText="What does the 15 digit beacon HEX ID look like?"
//       className="govuk-!-padding-top-2"
//     >
//       TODO: Image of a beacon showing hex ID
//     </Details>
//   </FormGroup>
// );

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  if (context.req.method === "POST") {
    const formData: BeaconCacheEntry = await updateFormCache(context);

    manufacturerField.value = formData.manufacturer;
    modelField.value = formData.model;

    if (manufacturerField.hasError() || modelField.hasError()) {
      return {
        props: {},
      };
    } else {
      return {
        redirect: {
          destination: "/register-a-beacon/check-beacon-summary",
          permanent: false,
        },
      };
    }
  } else {
    const formData: BeaconCacheEntry = await getCache(context);
    return {
      props: {
        ...formData,
      },
    };
  }
};

export default CheckBeaconDetails;
