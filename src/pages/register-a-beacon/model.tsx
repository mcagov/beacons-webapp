import { GetServerSideProps } from "next";
import React, { FunctionComponent } from "react";
import { BackButton, Button } from "../../components/Button";
import { Details } from "../../components/Details";
import { FormErrorSummary } from "../../components/ErrorSummary";
import {
  Form,
  FormFieldset,
  FormGroup,
  FormLegendPageHeading,
} from "../../components/Form";
import { Grid } from "../../components/Grid";
import { Layout } from "../../components/Layout";
import { BeaconRegistryContactInfo, IfYouNeedHelp } from "../../components/Mca";
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

interface ModelForm {
  model: string;
}

const Model: FunctionComponent<DraftRegistrationPageProps> = ({
  form,
  showCookieBanner,
  draftRegistration,
}: DraftRegistrationPageProps): JSX.Element => {
  const pageHeading = "Beacon model";
  const previousPageUrl = CreateRegistrationPageURLs.manufacturer;

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
                  We need to know the exact model of the beacon so we can tell
                  what features it has if we need to assist the owner in an
                  emergency.
                </GovUKBody>
                <GovUKBody>
                  For example, some beacons contain a water-activated strobe
                  light which can help search and rescue teams locate the owner
                  in an emergency.
                </GovUKBody>
                <FormGroup errorMessages={form.fields.model.errorMessages}>
                  <label className="govuk-label" htmlFor="model">
                    Model
                  </label>
                  <BeaconModelSelect
                    id="model"
                    name="model"
                    defaultValue={form.fields.model.value}
                    selectedManufacturer={draftRegistration.manufacturer}
                  />
                  <Details
                    summaryText="What if I can't find the beacon on this list?"
                    className="govuk-!-padding-top-2"
                  >
                    <p className="govuk-!-margin-top-5">
                      Contact the UK Beacon Registry for help finding the model
                      of the beacon you are trying to register.
                    </p>
                    <BeaconRegistryContactInfo h2 />
                  </Details>
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

export const BeaconModelSelect = ({
  id,
  name,
  defaultValue,
  selectedManufacturer,
  manufacturerModels = require("../../manufacturerModel.json"),
}: {
  id: string;
  name: string;
  defaultValue: string;
  selectedManufacturer: string;
  manufacturerModels?: string[];
}): JSX.Element => (
  <Select id={id} name={name} defaultValue={defaultValue || "Select a model"}>
    <option disabled selected value={undefined}>
      Select a model
    </option>
    {manufacturerModels[selectedManufacturer].map((model) => (
      <SelectOption key={model} value={model}>
        {model}
      </SelectOption>
    ))}
  </Select>
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

export const mapper: DraftRegistrationFormMapper<ModelForm> = {
  formToDraftRegistration: (form) => ({
    model: form.model,
    uses: [],
  }),
  draftRegistrationToForm: (draftRegistration) => ({
    model: draftRegistration?.model,
  }),
};

export const validationRules = ({ model }: ModelForm): FormManager => {
  return new FormManager({
    model: new FieldManager(model, [
      Validators.required("Select the beacon's model"),
    ]),
  });
};

export default Model;
