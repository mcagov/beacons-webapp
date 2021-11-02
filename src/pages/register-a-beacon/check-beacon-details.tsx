import { GetServerSideProps } from "next";
import React, { FunctionComponent } from "react";
import { BeaconsForm, BeaconsFormHeading } from "../../components/BeaconsForm";
import { HexIdHelp } from "../../components/domain/formElements/HexIdHelp";
import { FormGroup } from "../../components/Form";
import { FormInputProps, Input } from "../../components/Input";
import { GovUKBody } from "../../components/Typography";
import { FieldManager } from "../../lib/form/FieldManager";
import { FormManager } from "../../lib/form/FormManager";
import { Validators } from "../../lib/form/Validators";
import { DraftRegistrationPageProps } from "../../lib/handlePageRequest";
import { BeaconsGetServerSidePropsContext } from "../../lib/middleware/BeaconsGetServerSidePropsContext";
import { withContainer } from "../../lib/middleware/withContainer";
import { withSession } from "../../lib/middleware/withSession";
import { AccountPageURLs, CreateRegistrationPageURLs } from "../../lib/urls";
import { toUpperCase } from "../../lib/writingStyle";
import { DraftRegistrationFormMapper } from "../../presenters/DraftRegistrationFormMapper";
import { BeaconsPageRouter } from "../../router/BeaconsPageRouter";
import { GivenUserIsEditingADraftRegistration_WhenNoDraftRegistrationExists_ThenRedirectUserToStartPage } from "../../router/rules/GivenUserIsEditingADraftRegistration_WhenNoDraftRegistrationExists_ThenRedirectUserToStartPage";
import { GivenUserIsEditingADraftRegistration_WhenUserSubmitsInvalidForm_ThenShowErrors } from "../../router/rules/GivenUserIsEditingADraftRegistration_WhenUserSubmitsInvalidForm_ThenShowErrors";
import { GivenUserIsEditingADraftRegistration_WhenUserSubmitsValidForm_ThenSaveAndGoToNextPage } from "../../router/rules/GivenUserIsEditingADraftRegistration_WhenUserSubmitsValidForm_ThenSaveAndGoToNextPage";
import { GivenUserIsEditingADraftRegistration_WhenUserViewsForm_ThenShowForm } from "../../router/rules/GivenUserIsEditingADraftRegistration_WhenUserViewsForm_ThenShowForm";
import { WhenUserIsNotSignedIn_ThenShowAnUnauthenticatedError } from "../../router/rules/WhenUserIsNotSignedIn_ThenShowAnUnauthenticatedError";

interface CheckBeaconDetailsForm {
  hexId: string;
}

const CheckBeaconDetails: FunctionComponent<DraftRegistrationPageProps> = ({
  form,
  showCookieBanner,
}: DraftRegistrationPageProps): JSX.Element => {
  const pageHeading = "Check beacon details";
  const pageText = (
    <GovUKBody>
      The details of your beacon must be checked to ensure it is programmed for
      UK registration.
    </GovUKBody>
  );
  const previousPageUrl = AccountPageURLs.accountHome;

  return (
    <BeaconsForm
      formErrors={form.errorSummary}
      previousPageUrl={previousPageUrl}
      includeUseId={false}
      pageHeading={pageHeading}
      showCookieBanner={showCookieBanner}
    >
      <BeaconsFormHeading pageHeading={pageHeading} />
      {pageText}
      <BeaconHexIdInput
        value={form.fields.hexId.value}
        errorMessages={form.fields.hexId.errorMessages}
      />
    </BeaconsForm>
  );
};

const BeaconHexIdInput: FunctionComponent<FormInputProps> = ({
  value = "",
  errorMessages,
}: FormInputProps): JSX.Element => (
  <FormGroup errorMessages={errorMessages}>
    <Input
      id="hexId"
      label="Enter the 15 character beacon HEX ID or UIN number"
      hintText="This will be on your beacon. It must be 15 characters long and use
      characters 0 to 9 and letters A to F"
      htmlAttributes={{ spellCheck: false }}
      defaultValue={value}
    />
    <HexIdHelp />
  </FormGroup>
);

export const getServerSideProps: GetServerSideProps = withContainer(
  withSession(async (context: BeaconsGetServerSidePropsContext) => {
    const nextPageUrl = CreateRegistrationPageURLs.beaconInformation;

    return await new BeaconsPageRouter([
      new WhenUserIsNotSignedIn_ThenShowAnUnauthenticatedError(context),
      new GivenUserIsEditingADraftRegistration_WhenNoDraftRegistrationExists_ThenRedirectUserToStartPage(
        context
      ),
      new GivenUserIsEditingADraftRegistration_WhenUserViewsForm_ThenShowForm(
        context,
        validationRules,
        mapper
      ),
      new GivenUserIsEditingADraftRegistration_WhenUserSubmitsInvalidForm_ThenShowErrors(
        context,
        validationRules,
        mapper
      ),
      new GivenUserIsEditingADraftRegistration_WhenUserSubmitsValidForm_ThenSaveAndGoToNextPage(
        context,
        validationRules,
        mapper,
        nextPageUrl
      ),
    ]).execute();
  })
);

export const mapper: DraftRegistrationFormMapper<CheckBeaconDetailsForm> = {
  formToDraftRegistration: (form) => ({
    hexId: toUpperCase(form.hexId),
    uses: [],
  }),
  draftRegistrationToForm: (draftRegistration) => ({
    hexId: draftRegistration?.hexId,
  }),
};

export const validationRules = ({
  hexId,
}: CheckBeaconDetailsForm): FormManager => {
  return new FormManager({
    hexId: new FieldManager(hexId, [
      Validators.required("Beacon HEX ID is a required field"),
      Validators.isLength(
        "Beacon HEX ID or UIN must be 15 characters long",
        15
      ),
      Validators.hexadecimalString(
        "Beacon HEX ID or UIN must use numbers 0 to 9 and letters A to F"
      ),
      Validators.ukEncodedBeacon(
        "You entered a beacon encoded with a Hex ID from %HEX_ID_COUNTRY%.  Your beacon must be UK-encoded to use this service."
      ),
      Validators.shouldNotContain(
        'Your HEX ID should not contain the letter "O".  Did you mean the number zero?',
        "O"
      ),
    ]),
  });
};

export default CheckBeaconDetails;
