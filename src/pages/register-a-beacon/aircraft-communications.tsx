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
import { GovUKBody, PageHeading } from "../../components/Typography";
import { FieldManager } from "../../lib/form/fieldManager";
import { FormManager } from "../../lib/form/formManager";
import { Validators } from "../../lib/form/validators";
import { FormSubmission } from "../../lib/formCache";
import { FormPageProps, handlePageRequest } from "../../lib/handlePageRequest";
import { Communication } from "../../lib/registration/types";

const definePageForm = ({
  vhfRadio,
  satelliteTelephone,
  satelliteTelephoneValue,
  mobileTelephone,
  mobileTelephone1,
  mobileTelephone2,
  otherCommunication,
  otherCommunicationValue,
}: FormSubmission): FormManager => {
  return new FormManager({
    vhfRadio: new FieldManager(vhfRadio),
    satelliteTelephone: new FieldManager(satelliteTelephone),
    satelliteTelephoneValue: new FieldManager(
      satelliteTelephoneValue,
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
          meetingCondition: (value) =>
            value === Communication.SATELLITE_TELEPHONE,
        },
      ]
    ),
    mobileTelephone: new FieldManager(mobileTelephone),
    mobileTelephone1: new FieldManager(
      mobileTelephone1,
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
          meetingCondition: (value) => value === Communication.MOBILE_TELEPHONE,
        },
      ]
    ),
    mobileTelephone2: new FieldManager(mobileTelephone2),
    otherCommunication: new FieldManager(otherCommunication),
    otherCommunicationValue: new FieldManager(
      otherCommunicationValue,
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
          meetingCondition: (value) => value === Communication.OTHER,
        },
      ]
    ),
  });
};

const AircraftCommunications: FunctionComponent<FormPageProps> = ({
  form,
  showCookieBanner,
}: FormPageProps): JSX.Element => {
  const pageHeading = "How can we communicate with you, when on this aircraft?";

  return (
    <Layout
      navigation={
        <BackButtonRouterIndexes href="/register-a-beacon/about-the-aircraft" />
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

            <Form>
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
          value={Communication.VHF_RADIO}
          defaultChecked={
            form.fields.vhfRadio.value === Communication.VHF_RADIO
          }
          label="VHF Radio"
        />
        <CheckboxListItem
          id="satelliteTelephone"
          value={Communication.SATELLITE_TELEPHONE}
          defaultChecked={
            form.fields.satelliteTelephone.value ===
            Communication.SATELLITE_TELEPHONE
          }
          label="Satellite Telephone"
          conditional={true}
        >
          <FormGroup
            errorMessages={form.fields.satelliteTelephoneValue.errorMessages}
          >
            <Input
              id="satelliteTelephoneValue"
              label="Enter phone number"
              hintText="Iridium start: +8816, Inmarsat (ISAT, FLEET, BGAN) start +870, Thuraya start: +8821, Globalstar start: +3364"
              defaultValue={form.fields.satelliteTelephoneValue.value}
            />
          </FormGroup>
        </CheckboxListItem>
        <CheckboxListItem
          id="mobileTelephone"
          value={Communication.MOBILE_TELEPHONE}
          defaultChecked={
            form.fields.mobileTelephone.value === Communication.MOBILE_TELEPHONE
          }
          label="Mobile Telephone(s)"
          conditional={true}
        >
          <FormGroup errorMessages={form.fields.mobileTelephone1.errorMessages}>
            <Input
              id="mobileTelephone1"
              label="Mobile number 1"
              inputClassName="govuk-!-margin-bottom-4"
              defaultValue={form.fields.mobileTelephone1.value}
              htmlAttributes={{ autoComplete: "tel" }}
            />
          </FormGroup>

          <Input
            id="mobileTelephone2"
            label="Mobile number 2 (optional)"
            defaultValue={form.fields.mobileTelephone2.value}
            htmlAttributes={{ autoComplete: "tel" }}
          />
        </CheckboxListItem>
        <CheckboxListItem
          id="otherCommunication"
          value={Communication.OTHER}
          defaultChecked={
            form.fields.otherCommunication.value === Communication.OTHER
          }
          label="Other"
          conditional={true}
        >
          <FormGroup
            errorMessages={form.fields.otherCommunicationValue.errorMessages}
          >
            <TextareaCharacterCount
              id="otherCommunicationValue"
              label="Please provide details of how we can contact you"
              defaultValue={form.fields.otherCommunicationValue.value}
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

export default AircraftCommunications;
