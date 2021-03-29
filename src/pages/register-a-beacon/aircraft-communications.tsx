import { GetServerSideProps } from "next";
import React, { FunctionComponent } from "react";
import { BackButton, Button } from "../../components/Button";
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
import { GovUKBody, PageHeading } from "../../components/Typography";
import { FieldManager } from "../../lib/form/fieldManager";
import { FormManager } from "../../lib/form/formManager";
import { CacheEntry } from "../../lib/formCache";
import { FormPageProps, handlePageRequest } from "../../lib/handlePageRequest";
import { AircraftCommunication } from "../../lib/types";

const definePageForm = ({
  aircraftVhfRadio,
  aircraftVhfRadioInput,
  aircraftSatelliteTelephone,
  aircraftSatelliteTelephoneInput,
  aircraftMobileTelephone,
  aircraftMobileTelephoneInput1,
  aircraftMobileTelephoneInput2,
  aircraftOtherCommunications,
  aircraftOtherCommunicationsInput,
}: CacheEntry): FormManager => {
  return new FormManager({
    vhfRadio: new FieldManager(aircraftVhfRadio),
    vhfRadioInput: new FieldManager(aircraftVhfRadioInput),
    satelliteTelephoneRadio: new FieldManager(aircraftSatelliteTelephone),
    satelliteTelephoneInput: new FieldManager(aircraftSatelliteTelephoneInput),
    mobileTelephoneRadio: new FieldManager(aircraftMobileTelephone),
    mobileTelephoneInput1: new FieldManager(aircraftMobileTelephoneInput1),
    mobileTelephoneInput2: new FieldManager(aircraftMobileTelephoneInput2),
    otherCommunicationsRadio: new FieldManager(aircraftOtherCommunications),
    otherCommunicationsRadioInput: new FieldManager(
      aircraftOtherCommunicationsInput
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
      navigation={<BackButton href="/register-a-beacon/about-the-aircraft" />}
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
          value={AircraftCommunication.VHF_RADIO}
          defaultChecked={
            form.fields.vhfRadio.value === AircraftCommunication.VHF_RADIO
          }
          label="VHF Radio"
          conditional={true}
        >
          <FormGroup errorMessages={form.fields.vhfRadioInput.errorMessages}>
            <Input
              id="vhfRadioInput"
              label="Fixed aircraft radio numnber (optional)"
              hintText="This is the unique radio number associated to the aircraft, it is # numbers long"
              defaultValue={form.fields.vhfRadioInput.value}
            />
          </FormGroup>
        </CheckboxListItem>

        <CheckboxListItem
          id="satelliteTelephoneRadio"
          value={AircraftCommunication.SATELLITE_TELEPHONE}
          defaultChecked={
            form.fields.satelliteTelephoneRadio.value ===
            AircraftCommunication.SATELLITE_TELEPHONE
          }
          label="Satellite Telephone"
          conditional={true}
        >
          <FormGroup
            errorMessages={form.fields.satelliteTelephoneInput.errorMessages}
          >
            <Input
              id="satelliteTelephoneInput"
              label="Enter phone number"
              hintText="Iridium start: +8816, Inmarsat (ISAT, FLEET, BGAN) start +870, Thuraya start: +8821, Globalstar start: +3364"
              defaultValue={form.fields.satelliteTelephoneInput.value}
            />
          </FormGroup>
        </CheckboxListItem>
        <CheckboxListItem
          id="mobileTelephoneRadio"
          value={AircraftCommunication.MOBILE_TELEPHONE}
          defaultChecked={
            form.fields.mobileTelephoneRadio.value ===
            AircraftCommunication.MOBILE_TELEPHONE
          }
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
      </CheckboxList>
    </FormGroup>
  </FormFieldset>
);

export const getServerSideProps: GetServerSideProps = handlePageRequest(
  "/register-a-beacon/more-details",
  definePageForm
);

export default AircraftCommunications;
