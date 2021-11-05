import { GetServerSideProps } from "next";
import React, { FunctionComponent } from "react";
import { BackButton, Button } from "../../components/Button";
import { FormErrorSummary } from "../../components/ErrorSummary";
import {
  Form,
  FormFieldset,
  FormGroup,
  FormLegendPageHeading,
} from "../../components/Form";
import { Grid } from "../../components/Grid";
import { Layout } from "../../components/Layout";
import { IfYouNeedHelp } from "../../components/Mca";
import { Select, SelectOption } from "../../components/Select";
import { GovUKBody } from "../../components/Typography";
import { FieldManager } from "../../lib/form/FieldManager";
import { FormManager } from "../../lib/form/FormManager";
import { Validators } from "../../lib/form/Validators";
import { DraftRegistrationPageProps } from "../../lib/handlePageRequest";
import { BeaconsGetServerSidePropsContext } from "../../lib/middleware/BeaconsGetServerSidePropsContext";
import { withContainer } from "../../lib/middleware/withContainer";
import { withSession } from "../../lib/middleware/withSession";
import { CreateRegistrationPageURLs } from "../../lib/urls";
import { DraftRegistrationFormMapper } from "../../presenters/DraftRegistrationFormMapper";
import { BeaconsPageRouter } from "../../router/BeaconsPageRouter";
import { GivenUserIsEditingADraftRegistration_WhenNoDraftRegistrationExists_ThenRedirectUserToStartPage } from "../../router/rules/GivenUserIsEditingADraftRegistration_WhenNoDraftRegistrationExists_ThenRedirectUserToStartPage";
import { GivenUserIsEditingADraftRegistration_WhenUserSubmitsInvalidForm_ThenShowErrors } from "../../router/rules/GivenUserIsEditingADraftRegistration_WhenUserSubmitsInvalidForm_ThenShowErrors";
import { GivenUserIsEditingADraftRegistration_WhenUserSubmitsValidForm_ThenSaveAndGoToNextPage } from "../../router/rules/GivenUserIsEditingADraftRegistration_WhenUserSubmitsValidForm_ThenSaveAndGoToNextPage";
import { GivenUserIsEditingADraftRegistration_WhenUserViewsForm_ThenShowForm } from "../../router/rules/GivenUserIsEditingADraftRegistration_WhenUserViewsForm_ThenShowForm";
import { WhenUserIsNotSignedIn_ThenShowAnUnauthenticatedError } from "../../router/rules/WhenUserIsNotSignedIn_ThenShowAnUnauthenticatedError";

interface ManufacturerForm {
  manufacturer: string;
}

const Manufacturer: FunctionComponent<DraftRegistrationPageProps> = ({
  form,
  showCookieBanner,
}: DraftRegistrationPageProps): JSX.Element => {
  const pageHeading = "Beacon manufacturer";
  const previousPageUrl = CreateRegistrationPageURLs.checkBeaconDetails;

  return (
    <Layout
      navigation={<BackButton href={previousPageUrl} />}
      title={pageHeading}
      pageHasErrors={form.hasErrors}
      showCookieBanner={showCookieBanner}
    >
      <Grid
        mainContent={
          <>
            <Form>
              <FormFieldset>
                <FormErrorSummary formErrors={form.errorSummary} />
                <FormLegendPageHeading>{pageHeading}</FormLegendPageHeading>
                <GovUKBody>
                  We need to know the manufacturer of the beacon so we can tell
                  what features it has if we need to assist the owner in an
                  emergency.
                </GovUKBody>
                <GovUKBody>
                  For example, some beacons contain a water-activated strobe
                  light which can help search and rescue teams locate the owner
                  in an emergency.
                </GovUKBody>
                <GovUKBody>
                  We will ask you to select the specific model of the beacon on
                  the next page.
                </GovUKBody>
                <FormGroup
                  errorMessages={form.fields.manufacturer.errorMessages}
                >
                  <label className="govuk-label" htmlFor="manufacturer">
                    Manufacturer
                  </label>
                  <BeaconManufacturerSelect
                    id="manufacturer"
                    name="manufacturer"
                    defaultValue={form.fields.manufacturer.value}
                  />
                </FormGroup>
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

export const BeaconManufacturerSelect = ({
  id,
  name,
  defaultValue,
  manufacturers = require("../../manufacturerModel.json"),
}: {
  id: string;
  name: string;
  defaultValue: string;
  manufacturers?: string[];
}): JSX.Element => (
  <Select
    id={id}
    name={name}
    defaultValue={defaultValue || "Select manufacturer"}
  >
    <option disabled selected value={undefined}>
      Select manufacturer
    </option>
    <option disabled>--</option>
    <option value="UNKNOWN">Other</option>
    <option disabled>--</option>
    {Object.keys(manufacturers).map((manufacturer) => (
      <SelectOption key={manufacturer} value={manufacturer}>
        {manufacturer}
      </SelectOption>
    ))}
  </Select>
);

export const getServerSideProps: GetServerSideProps = withContainer(
  withSession(async (context: BeaconsGetServerSidePropsContext) => {
    const nextPageUrl = CreateRegistrationPageURLs.model;

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

export const mapper: DraftRegistrationFormMapper<ManufacturerForm> = {
  formToDraftRegistration: (form) => ({
    manufacturer: form.manufacturer,
    uses: [],
  }),
  draftRegistrationToForm: (draftRegistration) => ({
    manufacturer: draftRegistration?.manufacturer,
  }),
};

export const validationRules = ({
  manufacturer,
}: ManufacturerForm): FormManager => {
  return new FormManager({
    manufacturer: new FieldManager(manufacturer, [
      Validators.required("Select the beacon's manufacturer"),
    ]),
  });
};

export default Manufacturer;
