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
import { RadioList, RadioListItem } from "../../components/RadioList";
import { FieldManager } from "../../lib/form/fieldManager";
import { FormManager } from "../../lib/form/formManager";
import { Validators } from "../../lib/form/validators";
import { CacheEntry } from "../../lib/formCache";
import { FormPageProps, handlePageRequest } from "../../lib/handlePageRequest";
import { BeaconL1Use } from "../../lib/types";

const definePageForm = ({ beaconUse }: CacheEntry): FormManager => {
  return new FormManager({
    beaconUse: new FieldManager(beaconUse, [
      Validators.required("Maritime pleasure use is a required field"),
    ]),
  });
};

const BeaconUses: FunctionComponent<FormPageProps> = ({
  form,
  showCookieBanner,
}: FormPageProps): JSX.Element => {
  const pageHeading = "What is the main or primary use for this beacon?";

  return (
    <Layout
      title={pageHeading}
      navigation={<BackButton href="/register-a-beacon/beacon-information" />}
      pageHasErrors={form.hasErrors}
      showCookieBanner={showCookieBanner}
    >
      <Grid
        mainContent={
          <>
            <FormErrorSummary formErrors={form.errorSummary} />
            <Form action="/register-a-beacon/beacon-uses">
              <FormGroup errorMessages={form.fields.beaconUse.errorMessages}>
                <FormFieldset>
                  <FormLegendPageHeading>{pageHeading}</FormLegendPageHeading>
                </FormFieldset>
                <RadioList>
                  <RadioListItem
                    id="maritime"
                    name="beaconUse"
                    value={BeaconL1Use.MARITIME}
                    hintText="This might include commercial or pleasure sailing / motor vessels or unpowered craft. It could also include sea-based windfarms and rigs/platforms
                    "
                    inputHtmlAttributes={setCheckedIfUserSelected(
                      form.fields.beaconUse.value,
                      BeaconL1Use.MARITIME
                    )}
                  >
                    Maritime
                  </RadioListItem>
                  <RadioListItem
                    id="aviation"
                    name="beaconUse"
                    value={BeaconL1Use.AVIATION}
                    hintText="This might include commercial or pleasure aircraft"
                    inputHtmlAttributes={setCheckedIfUserSelected(
                      form.fields.beaconUse.value,
                      BeaconL1Use.AVIATION
                    )}
                  >
                    Aviation
                  </RadioListItem>
                  <RadioListItem
                    id="land"
                    name="beaconUse"
                    value={BeaconL1Use.LAND}
                    hintText="This could include vehicle or other overland uses. It could also include land-based windfarms."
                    inputHtmlAttributes={setCheckedIfUserSelected(
                      form.fields.beaconUse.value,
                      BeaconL1Use.LAND
                    )}
                  >
                    Land-based
                  </RadioListItem>
                  <RadioListItem
                    id="Other"
                    name="beaconUse"
                    value={BeaconL1Use.OTHER}
                    inputHtmlAttributes={setCheckedIfUserSelected(
                      form.fields.beaconUse.value,
                      BeaconL1Use.OTHER
                    )}
                  >
                    Other
                  </RadioListItem>
                </RadioList>
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

const setCheckedIfUserSelected = (userSelectedValue, componentValue) => {
  return {
    defaultChecked: userSelectedValue === componentValue,
  };
};

export const getServerSideProps: GetServerSideProps = handlePageRequest(
  "/register-a-beacon/about-the-vessel",
  definePageForm
);

export default BeaconUses;
