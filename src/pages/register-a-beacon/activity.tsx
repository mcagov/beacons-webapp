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
import {
  Environment,
  MaritimeCommercialType,
  MaritimePleasureType,
  Purpose,
} from "../../lib/types";

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
  } else if (
    environment === Environment.MARITIME &&
    purpose === Purpose.COMMERCIAL
  ) {
    return (
      <MaritimeCommercialOptions form={form} listItemName={listItemName} />
    );
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
        label="Other"
        hintText="E.g. Surfboard, Kitesurfing, Small punt or tender"
        defaultChecked={
          form.fields.activity.value === MaritimePleasureType.OTHER
        }
        conditional={true}
      >
        <FormGroup errorMessages={form.fields.otherActivityText.errorMessages}>
          <Input
            id="otherActivityText"
            label="Please describe your use"
            defaultValue={form.fields.otherActivityText.value}
          />
        </FormGroup>
      </RadioListItem>
    </>
  );
};

const MaritimeCommercialOptions: FunctionComponent<OptionsProps> = ({
  form,
  listItemName,
}: OptionsProps): JSX.Element => {
  return (
    <>
      <RadioListItem
        id="fishing-vessel"
        name={listItemName}
        value={MaritimeCommercialType.FISHING_VESSEL}
        label="Fishing vessel"
        hintText="E.g. Motor or sailing fishing vessel, Guard vessels"
        defaultChecked={
          form.fields.activity.value === MaritimeCommercialType.FISHING_VESSEL
        }
      />
      <RadioListItem
        id="merchant-vessel"
        name={listItemName}
        value={MaritimeCommercialType.MERCHANT_VESSEL}
        label="Merchant vessel"
        hintText="E.g. Pilot vessel, Passenger Ferry, Crew transfer vessel etc"
        defaultChecked={
          form.fields.activity.value === MaritimeCommercialType.MERCHANT_VESSEL
        }
      />
      <RadioListItem
        id="commercial-sailing-vessel"
        name={listItemName}
        value={MaritimeCommercialType.COMMERCIAL_SAILING_VESSEL}
        label="Commercial sailing vessel"
        hintText="E.g. Sail training, Hire or Charter vessel, Delivery Skipper etc"
        defaultChecked={
          form.fields.activity.value ===
          MaritimeCommercialType.COMMERCIAL_SAILING_VESSEL
        }
      />
      <RadioListItem
        id="commercial-motor-pleasure-vessel"
        name={listItemName}
        value={MaritimeCommercialType.COMMERCIAL_MOTOR_PLEASURE_VESSEL}
        label="Commercial motor pleasure vessel"
        hintText="E.g. Dive boat, Hire or charter vessel, Delivery skipper etc"
        defaultChecked={
          form.fields.activity.value ===
          MaritimeCommercialType.COMMERCIAL_MOTOR_PLEASURE_VESSEL
        }
      />
      <RadioListItem
        id="floating-platform"
        name={listItemName}
        value={MaritimeCommercialType.FLOATING_PLATFORM}
        label="Floating platform"
        hintText="E.g. Floating maintenance platform, Lightvessel"
        defaultChecked={
          form.fields.activity.value ===
          MaritimeCommercialType.FLOATING_PLATFORM
        }
      />
      <RadioListItem
        id="offshore-windfarm"
        name={listItemName}
        value={MaritimeCommercialType.OFFSHORE_WINDFARM}
        label="Offshore windfarm"
        hintText="E.g. Fixed foundation or floating wind turbines"
        defaultChecked={
          form.fields.activity.value ===
          MaritimeCommercialType.OFFSHORE_WINDFARM
        }
      />
      <RadioListItem
        id="offshore-rig-platform"
        name={listItemName}
        value={MaritimeCommercialType.OFFSHORE_RIG_PLATFORM}
        label="Offshore rig or platform"
        hintText="E.g. An offshore oil rig or fixed drilling platform"
        defaultChecked={
          form.fields.activity.value ===
          MaritimeCommercialType.OFFSHORE_RIG_PLATFORM
        }
      />
      <RadioListItem
        id="other-commercial-vessel"
        name={listItemName}
        value={MaritimeCommercialType.OTHER}
        label="Other"
        defaultChecked={
          form.fields.activity.value === MaritimeCommercialType.OTHER
        }
        conditional={true}
      >
        <FormGroup errorMessages={form.fields.otherActivityText.errorMessages}>
          <Input
            id="otherActivityText"
            label="Please describe your use"
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
