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
import { Input } from "../../components/Input";
import { Layout } from "../../components/Layout";
import { IfYouNeedHelp } from "../../components/Mca";
import {
  RadioListConditional,
  RadioListItemConditional,
  RadioListItemHint,
} from "../../components/RadioList";
import { CacheEntry } from "../../lib/formCache";
import { FormValidator } from "../../lib/formValidator";
import { handlePageRequest } from "../../lib/handlePageRequest";
import { MaritimePleasureVessel } from "../../lib/types";

interface PrimaryBeaconUseProps {
  formData: CacheEntry;
  needsValidation: boolean;
}

const formRules = {
  maritimePleasureVesselUse: {
    rules: [
      {
        errorMessage: "Maritime pleasure use is a required field",
        errorIf: (value) => value.length === 0,
      },
    ],
  },
  otherPleasureVesselText: {
    applyRulesIf: [
      {
        fieldName: "maritimePleasureVesselUse",
        meetsConditions: [(value) => value === "OTHER"],
      },
    ],
    rules: [
      {
        errorMessage: "Other pleasure vessel text is a required field",
        errorIf: (value) => value.length === 0,
      },
    ],
  },
};

const PrimaryBeaconUse: FunctionComponent<PrimaryBeaconUseProps> = ({
  formData,
  needsValidation = false,
}: PrimaryBeaconUseProps): JSX.Element => {
  const pageHeading =
    "What type of maritime pleasure vessel will you mostly use this beacon on?";

  const {
    maritimePleasureVesselUse,
    otherPleasureVesselText,
  } = FormValidator.validate(formData, formRules);

  const errors = FormValidator.errorSummary(formData, formRules);
  const pageHasErrors = needsValidation && errors.length > 0;

  const setCheckedIfUserSelected = (userSelectedValue, componentValue) => {
    return {
      defaultChecked: userSelectedValue === componentValue,
    };
  };

  return (
    <Layout
      title={pageHeading}
      navigation={<BackButton href="/register-a-beacon/beacon-information" />}
      pageHasErrors={pageHasErrors}
    >
      <Grid
        mainContent={
          <>
            <FormErrorSummary
              errors={errors}
              showErrorSummary={pageHasErrors}
            />
            <Form action="/register-a-beacon/primary-beacon-use">
              <FormGroup
                showErrors={pageHasErrors}
                errorMessages={maritimePleasureVesselUse.errorMessages}
              >
                <FormFieldset>
                  <FormLegendPageHeading>
                    What type of maritime pleasure vessel will you mostly use
                    this beacon on?
                  </FormLegendPageHeading>
                </FormFieldset>
                <RadioListConditional>
                  <RadioListItemHint
                    id="motor-vessel"
                    name="maritimePleasureVesselUse"
                    value={MaritimePleasureVessel.MOTOR}
                    hintText="E.g. Speedboat, RIB"
                    inputHtmlAttributes={setCheckedIfUserSelected(
                      maritimePleasureVesselUse.value,
                      MaritimePleasureVessel.MOTOR
                    )}
                  >
                    Motor vessel
                  </RadioListItemHint>
                  <RadioListItemHint
                    id="sailing-vessel"
                    name="maritimePleasureVesselUse"
                    value={MaritimePleasureVessel.SAILING}
                    hintText="E.g. Skiff, Dinghy, Yacht, Catamaran"
                    inputHtmlAttributes={setCheckedIfUserSelected(
                      maritimePleasureVesselUse.value,
                      MaritimePleasureVessel.SAILING
                    )}
                  >
                    Sailing vessel
                  </RadioListItemHint>
                  <RadioListItemHint
                    id="rowing-vessel"
                    name="maritimePleasureVesselUse"
                    value={MaritimePleasureVessel.ROWING}
                    hintText="E.g. Single person rowing boat, Cornish Gig, Multi-person rowing boat"
                    inputHtmlAttributes={setCheckedIfUserSelected(
                      maritimePleasureVesselUse.value,
                      MaritimePleasureVessel.ROWING
                    )}
                  >
                    Rowing vessel
                  </RadioListItemHint>
                  <RadioListItemHint
                    id="small-unpowered-vessel"
                    name="maritimePleasureVesselUse"
                    value={MaritimePleasureVessel.SMALL_UNPOWERED}
                    hintText="E.g. Canoe, Kayak"
                    inputHtmlAttributes={setCheckedIfUserSelected(
                      maritimePleasureVesselUse.value,
                      MaritimePleasureVessel.SMALL_UNPOWERED
                    )}
                  >
                    Small unpowered vessel
                  </RadioListItemHint>
                  <RadioListItemHint
                    id="other-pleasure-vessel"
                    name="maritimePleasureVesselUse"
                    value={MaritimePleasureVessel.OTHER}
                    hintText="E.g. Surfboard, Kitesurfing"
                    inputHtmlAttributes={{
                      ...{
                        "data-aria-controls":
                          "conditional-other-pleasure-vessel",
                      },
                      ...setCheckedIfUserSelected(
                        maritimePleasureVesselUse.value,
                        MaritimePleasureVessel.OTHER
                      ),
                    }}
                  >
                    Other pleasure vessel
                  </RadioListItemHint>
                  <RadioListItemConditional id="conditional-other-pleasure-vessel">
                    <FormGroup
                      showErrors={
                        pageHasErrors && otherPleasureVesselText.invalid
                      }
                      errorMessages={otherPleasureVesselText.errorMessages}
                    >
                      <Input
                        id="otherPleasureVesselText"
                        label="What sort of vessel is it?"
                        defaultValue={formData.otherPleasureVesselText}
                      />
                    </FormGroup>
                  </RadioListItemConditional>
                </RadioListConditional>
              </FormGroup>

              <Button buttonText="Continue" />
            </Form>

            <IfYouNeedHelp />
          </>
        }
      />
    </Layout>
  );
};

const ensureMaritimePleasureVesselUseIsSubmitted = (formData) => {
  return {
    ...formData,
    maritimePleasureVesselUse: formData["maritimePleasureVesselUse"] || "",
  };
};

export const getServerSideProps: GetServerSideProps = handlePageRequest(
  "/register-a-beacon/about-the-vessel",
  formRules,
  ensureMaritimePleasureVesselUseIsSubmitted
);

export default PrimaryBeaconUse;
