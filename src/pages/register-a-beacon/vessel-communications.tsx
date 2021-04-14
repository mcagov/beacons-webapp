import { GetServerSideProps } from "next";
import React, { FunctionComponent } from "react";
import { BackButtonRouterIndexes, Button } from "../../components/Button";
import { CheckboxList, CheckboxListItem } from "../../components/Checkbox";
import { FormErrorSummary } from "../../components/ErrorSummary";
import {
  Form,
  FormFieldset,
  FormGroup,
  FormLegend,
} from "../../components/Form";
import { Grid } from "../../components/Grid";
import { Input } from "../../components/Input";
import { Layout } from "../../components/Layout";
import { IfYouNeedHelp } from "../../components/Mca";
import { TextareaCharacterCount } from "../../components/Textarea";
import {
  AnchorLink,
  GovUKBody,
  PageHeading,
} from "../../components/Typography";
import { FieldManager } from "../../lib/form/fieldManager";
import { FormManager } from "../../lib/form/formManager";
import { Validators } from "../../lib/form/validators";
import { FormSubmission } from "../../lib/formCache";
import { FormPageProps, handlePageRequest } from "../../lib/handlePageRequest";
import { ofcomLicenseUrl } from "../../lib/urls";

interface FormInputProps {
  value: string;
}

const definePageForm = ({
  callSign,
  vhfRadio,
  fixedVhfRadio,
  fixedVhfRadioInput,
  portableVhfRadio,
  portableVhfRadioInput,
  satelliteTelephone,
  satelliteTelephoneInput,
  mobileTelephone,
  mobileTelephoneInput1,
  mobileTelephoneInput2,
  otherCommunication,
  otherCommunicationInput,
}: FormSubmission): FormManager => {
  return new FormManager({
    callSign: new FieldManager(callSign),
    vhfRadio: new FieldManager(vhfRadio),
    fixedVhfRadio: new FieldManager(fixedVhfRadio),
    fixedVhfRadioInput: new FieldManager(
      fixedVhfRadioInput,
      [
        Validators.required(
          "We need your MMSI number if you have a fixed VHF/DSC radio"
        ),
        Validators.wholeNumber(
          "Your fixed MMSI number must only include numbers 0 to 9, with no letters or other characters"
        ),
        Validators.isLength(
          "Your fixed MMSI number must be exactly nine digits long",
          9
        ),
      ],
      [
        {
          dependsOn: "fixedVhfRadio",
          meetingCondition: (value) => value === "true",
        },
      ]
    ),
    portableVhfRadio: new FieldManager(portableVhfRadio),
    portableVhfRadioInput: new FieldManager(
      portableVhfRadioInput,
      [
        Validators.required(
          "We need your portable MMSI number if you have a portable VHF/DSC radio"
        ),
        Validators.wholeNumber(
          "Your portable MMSI number must only include numbers 0 to 9, with no letters or other characters"
        ),
        Validators.isLength(
          "Your portable MMSI number must be exactly nine digits long",
          9
        ),
      ],
      [
        {
          dependsOn: "portableVhfRadio",
          meetingCondition: (value) => value === "true",
        },
      ]
    ),
    satelliteTelephone: new FieldManager(satelliteTelephone),
    satelliteTelephoneInput: new FieldManager(
      satelliteTelephoneInput,
      [
        Validators.required(
          "We need your phone number if you have a satellite telephone"
        ),
        Validators.phoneNumber(
          "Enter a satellite telephone number in the correct format"
        ),
      ],
      [
        {
          dependsOn: "satelliteTelephone",
          meetingCondition: (value) => value === "true",
        },
      ]
    ),
    mobileTelephone: new FieldManager(mobileTelephone),
    mobileTelephoneInput1: new FieldManager(
      mobileTelephoneInput1,
      [
        Validators.required(
          "We need your telephone number if you have a mobile telephone"
        ),
        Validators.phoneNumber(
          "Enter a mobile telephone number, like 07700 982736 or +447700912738"
        ),
      ],
      [
        {
          dependsOn: "mobileTelephone",
          meetingCondition: (value) => value === "true",
        },
      ]
    ),
    mobileTelephoneInput2: new FieldManager(mobileTelephoneInput2),
    otherCommunication: new FieldManager(otherCommunication),
    otherCommunicationInput: new FieldManager(
      otherCommunicationInput,
      [
        Validators.required("We need your other communication"),
        Validators.maxLength(
          "Other communication has too many characters",
          250
        ),
      ],
      [
        {
          dependsOn: "otherCommunication",
          meetingCondition: (value) => value === "true",
        },
      ]
    ),
  });
};

const VesselCommunications: FunctionComponent<FormPageProps> = ({
  form,
  showCookieBanner,
}: FormPageProps): JSX.Element => {
  const pageHeading =
    "How can we communicate with you, when on this vessel, rig or windfarm?";

  return (
    <Layout
      navigation={
        <BackButtonRouterIndexes href="/register-a-beacon/about-the-vessel" />
      }
      title={pageHeading}
      pageHasErrors={form.hasErrors}
      showCookieBanner={showCookieBanner}
    >
      <Grid
        mainContent={
          <>
            <PageHeading>{pageHeading}</PageHeading>
            <FormErrorSummary formErrors={form.errorSummary} />
            <GovUKBody>
              This will be critical for Search and Rescue in an emergency.
            </GovUKBody>
            <GovUKBody>
              If you have a radio license, VHF and/or VHF/DSC radio, you can{" "}
              <AnchorLink href={ofcomLicenseUrl}>
                find up your Call Sign and Maritime Mobile Service Identity
                (MMSI) number on the OFCOM website.
              </AnchorLink>
            </GovUKBody>
            <Form>
              <CallSign value={form.fields.callSign.value} />

              <TypesOfCommunication form={form} />

              <Button buttonText="Continue" />
            </Form>
            <IfYouNeedHelp />
          </>
        }
      />
    </Layout>
  );
};

const CallSign: FunctionComponent<FormInputProps> = ({
  value,
}: FormInputProps) => (
  <>
    <FormGroup className="govuk-!-margin-top-4">
      <Input
        id="callSign"
        labelClassName="govuk-label--s"
        label="Vessel Call Sign (optional)"
        hintText="This is the unique Call Sign associated to this vessel"
        defaultValue={value}
        numOfChars={20}
      />
    </FormGroup>
  </>
);

const TypesOfCommunication: FunctionComponent<FormPageProps> = ({
  form,
}: FormPageProps) => (
  <FormFieldset>
    <FormLegend size="small">
      Tick all that apply and provide as much detail as you can
    </FormLegend>

    <FormGroup>
      <CheckboxList conditional={true}>
        <CheckboxListItem
          id="vhfRadio"
          defaultChecked={form.fields.vhfRadio.value === "true"}
          label="VHF Radio"
        />

        <CheckboxListItem
          id="fixedVhfRadio"
          label="VHF/DSC Radio"
          defaultChecked={form.fields.fixedVhfRadio.value === "true"}
          conditional={true}
        >
          <FormGroup
            errorMessages={form.fields.fixedVhfRadioInput.errorMessages}
          >
            <Input
              id="fixedVhfRadioInput"
              label="Fixed MMSI number"
              hintText="This is the unique MMSI number associated to the vessel, it is 9
          digits long"
              defaultValue={form.fields.fixedVhfRadioInput.value}
            />
          </FormGroup>
        </CheckboxListItem>
        <CheckboxListItem
          id="portableVhfRadio"
          defaultChecked={form.fields.portableVhfRadio.value === "true"}
          label="Portable VHF/DSC Radio"
          conditional={true}
        >
          <FormGroup
            errorMessages={form.fields.portableVhfRadioInput.errorMessages}
          >
            <Input
              id="portableVhfRadioInput"
              label="Portable MMSI number"
              hintText="This is the unique MMSI number associated to the portable radio and is 9 numbers long. E.g. starts with 2359xxxxx"
              defaultValue={form.fields.portableVhfRadioInput.value}
            />
          </FormGroup>
        </CheckboxListItem>
        <CheckboxListItem
          id="satelliteTelephone"
          defaultChecked={form.fields.satelliteTelephone.value === "true"}
          label="Satellite Telephone"
          conditional={true}
        >
          <FormGroup
            errorMessages={form.fields.satelliteTelephoneInput.errorMessages}
          >
            <Input
              id="satelliteTelephoneInput"
              label="Enter phone number"
              hintText="Iridium usually start: +8707, Thuraya usually start: +8821, Globalstar usually start: +3364)"
              defaultValue={form.fields.satelliteTelephoneInput.value}
            />
          </FormGroup>
        </CheckboxListItem>
        <CheckboxListItem
          id="mobileTelephone"
          defaultChecked={form.fields.mobileTelephone.value === "true"}
          label="Mobile Telephone(s)"
          conditional={true}
        >
          <FormGroup
            errorMessages={form.fields.mobileTelephoneInput1.errorMessages}
          >
            <Input
              id="mobileTelephoneInput1"
              label="Mobile number 1"
              inputClassName="govuk-!-margin-bottom-4"
              defaultValue={form.fields.mobileTelephoneInput1.value}
              htmlAttributes={{ autoComplete: "tel" }}
            />
          </FormGroup>

          <Input
            id="mobileTelephoneInput2"
            label="Mobile number 2 (optional)"
            defaultValue={form.fields.mobileTelephoneInput2.value}
            htmlAttributes={{ autoComplete: "tel" }}
          />
        </CheckboxListItem>
        <CheckboxListItem
          id="otherCommunication"
          defaultChecked={form.fields.otherCommunication.value === "true"}
          label="Other"
          conditional={true}
        >
          <FormGroup
            errorMessages={form.fields.otherCommunicationInput.errorMessages}
          >
            <TextareaCharacterCount
              id="otherCommunicationInput"
              label="Please provide details of how we can contact you"
              defaultValue={form.fields.otherCommunicationInput.value}
              maxCharacters={250}
            />
          </FormGroup>
        </CheckboxListItem>
      </CheckboxList>
    </FormGroup>
  </FormFieldset>
);

export const getServerSideProps: GetServerSideProps = handlePageRequest(
  "/register-a-beacon/more-details",
  definePageForm
);

export default VesselCommunications;
