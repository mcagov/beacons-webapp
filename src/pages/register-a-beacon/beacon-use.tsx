import { GetServerSideProps } from "next";
import React, { FunctionComponent } from "react";
import { BeaconsForm } from "../../components/BeaconsForm";
import { FormGroup } from "../../components/Form";
import { RadioList, RadioListItem } from "../../components/RadioList";
import { FieldManager } from "../../lib/form/fieldManager";
import { FormManager } from "../../lib/form/formManager";
import { Validators } from "../../lib/form/validators";
import { FormPageProps } from "../../lib/handlePageRequest";
import { withCookieRedirect } from "../../lib/middleware";

const BeaconUse: FunctionComponent<FormPageProps> = ({
  showCookieBanner,
}: FormPageProps): JSX.Element => {
  const form = new FormManager({
    environment: new FieldManager(""),
  }).serialise();

  const pageHeading = "What is the primary use for this beacon?";

  const environmentFieldName = "environment";

  return (
    <BeaconsForm
      formErrors={form.errorSummary}
      previousPageUrl="/register-a-beacon/beacon-information"
      pageHeading={pageHeading}
      showCookieBanner={showCookieBanner}
      insetText="If you have multiple uses for this beacon, tell us about the
    main one first. You will be able to tell us about other uses
    later in the form"
    >
      <FormGroup errorMessages={form.fields.environment.errorMessages}>
        <RadioList>
          <RadioListItem
            id="maritime"
            name={environmentFieldName}
            label="Maritime"
            hintText="This might include commercial or pleasure sailing / motor vessels or unpowered craft. It could also include sea-based windfarms and rigs/platforms."
            value="MARITIME"
          />

          <RadioListItem
            id="aviation"
            name={environmentFieldName}
            label="Aviation"
            hintText="This might include commercial or pleasure aircraft"
            value="AVIATION"
          />

          <RadioListItem
            id="land"
            name={environmentFieldName}
            label="Land-based"
            hintText="This could include vehicle or other overland uses. It could also include land-based windfarms."
            value="LAND"
          />

          <RadioListItem
            id="other"
            name={environmentFieldName}
            label="Other"
            value="OTHER"
          />
        </RadioList>
      </FormGroup>
    </BeaconsForm>
  );
};

const getPageForm = ({ environment }) => {
  return new FormManager({
    environment: new FieldManager(environment, [
      Validators.required(
        "Which enviornment the beacon will be used is required"
      ),
    ]),
  });
};

export const getServerSideProps: GetServerSideProps = withCookieRedirect(
  async (context) => {
    // const userDidSubmitForm = context.req.method === "POST";

    // if (userDidSubmitForm) {
    //   const transformedFormData = await parseFormData(context.req);

    //   if (transformedFormData.environment === "AVIATION" ) {
    //     ("/register-a-beacon/purpose");
    //   } else {
    //     ("/register-a-beacon/activity");
    //   }
    // }

    return {
      props: { showCookieBanner: false },
    };
  }
);

export default BeaconUse;
