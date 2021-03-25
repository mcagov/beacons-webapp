import { GetServerSideProps } from "next";
import React, { FunctionComponent } from "react";
import { BeaconsForm } from "../../components/BeaconsForm";
import { FormGroup } from "../../components/Form";
import { Input } from "../../components/Input";
import { RadioList, RadioListItem } from "../../components/RadioList";
import { FieldManager } from "../../lib/form/fieldManager";
import { FormJSON, FormManager } from "../../lib/form/formManager";
import { Validators } from "../../lib/form/validators";
import { CacheEntry } from "../../lib/formCache";
import { FormPageProps, handlePageRequest } from "../../lib/handlePageRequest";
import { Environment, MaritimePleasureType, Purpose } from "../../lib/types";

interface OptionsProps {
  form: FormJSON;
  listItemName: string;
}

interface ActivityOptionsProps extends OptionsProps {
  environment: string;
  purpose: string;
}

const definePageForm = ({
  activity,
  otherActivityText,
}: CacheEntry): FormManager => {
  return new FormManager({
    activity: new FieldManager(activity, [
      Validators.required("Maritime pleasure use is a required field"),
    ]),
    otherActivityText: new FieldManager(
      otherActivityText,
      [Validators.required("Other pleasure vessel text is a required field")],
      [
        {
          dependsOn: "activity",
          meetingCondition: (value) => value === MaritimePleasureType.OTHER,
        },
      ]
    ),
  });
};

const Activity: FunctionComponent<FormPageProps> = ({
  form,
  showCookieBanner,
}: FormPageProps): JSX.Element => {
  //TODO: These values will be taken from the cache once that's available
  const environment = "MARITIME";
  const purpose = "PLEASURE";
  const pageHeading = `Please select the ${purpose.toLowerCase()} ${environment.toLowerCase()} activity that best describes how the beacon will be used`;
  const insetText = (
    <>
      <p>
        This information will help us plan any Search and Rescue response that
        may be required in future.
      </p>
      <p>
        We will ask you for a full description of any vessels later in the form
      </p>
    </>
  );

  return (
    <BeaconsForm
      previousPageUrl={"/register-a-beacon/beacon-information"}
      pageHeading={pageHeading}
      showCookieBanner={showCookieBanner}
      formErrors={form.errorSummary}
      errorMessages={form.fields.activity.errorMessages}
      insetText={insetText}
    >
      <RadioList conditional={true}>
        <ActivityOptions
          environment={environment}
          purpose={purpose}
          form={form}
          listItemName={"activity"}
        />
      </RadioList>
    </BeaconsForm>
  );
};

export const ActivityOptions: FunctionComponent<ActivityOptionsProps> = ({
  environment,
  purpose,
  form,
  listItemName,
}: ActivityOptionsProps): JSX.Element => {
  if (environment === Environment.MARITIME && purpose === Purpose.PLEASURE) {
    return <MaritimePleasureOptions form={form} listItemName={listItemName} />;
  }
};

const MaritimePleasureOptions: FunctionComponent<OptionsProps> = ({
  form,
  listItemName,
}: OptionsProps): JSX.Element => {
  return (
    <>
      <RadioListItem
        id="motor-vessel"
        name={listItemName}
        value={MaritimePleasureType.MOTOR}
        label="Motor vessel"
        hintText="E.g. Speedboat, Skiff"
        defaultChecked={
          form.fields.activity.value === MaritimePleasureType.MOTOR
        }
      />
      <RadioListItem
        id="sailing-vessel"
        name={listItemName}
        value={MaritimePleasureType.SAILING}
        label="Sailing vessel"
        hintText="E.g. Dinghy, Yacht, Catamaran"
        defaultChecked={
          form.fields.activity.value === MaritimePleasureType.SAILING
        }
      />
      <RadioListItem
        id="rowing-vessel"
        name={listItemName}
        value={MaritimePleasureType.ROWING}
        label="Rowing vessel"
        hintText="E.g. Rowing boat, Cornish Gig"
        defaultChecked={
          form.fields.activity.value === MaritimePleasureType.ROWING
        }
      />
      <RadioListItem
        id="small-unpowered-vessel"
        name={listItemName}
        value={MaritimePleasureType.SMALL_UNPOWERED}
        label="Small unpowered vessel"
        hintText="E.g. Canoe, Kayak"
        defaultChecked={
          form.fields.activity.value === MaritimePleasureType.SMALL_UNPOWERED
        }
      />
      <RadioListItem
        id="other-pleasure-vessel"
        name={listItemName}
        value={MaritimePleasureType.OTHER}
        label="Other pleasure vessel"
        hintText="E.g. Surfboard, Kitesurfing, Small punt or tender"
        defaultChecked={
          form.fields.activity.value === MaritimePleasureType.OTHER
        }
        conditional={true}
      >
        <FormGroup errorMessages={form.fields.otherActivityText.errorMessages}>
          <Input
            id="otherActivityText"
            label="What sort of vessel is it?"
            defaultValue={form.fields.otherActivityText.value}
          />
        </FormGroup>
      </RadioListItem>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = handlePageRequest(
  "/register-a-beacon/about-the-vessel",
  definePageForm
);

export default Activity;
