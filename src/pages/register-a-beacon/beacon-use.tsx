import { useRouter } from "next/router";
import React, { FunctionComponent } from "react";
import { BeaconsForm } from "../../components/BeaconsForm";
import { FormGroup } from "../../components/Form";
import { RadioList, RadioListItem } from "../../components/RadioList";
import { FieldManager } from "../../lib/form/fieldManager";
import { FormManager } from "../../lib/form/formManager";
import { FormPageProps } from "../../lib/handlePageRequest";

const BeaconUse: FunctionComponent<FormPageProps> = ({
  showCookieBanner,
}: FormPageProps): JSX.Element => {
  const form = new FormManager({
    environment: new FieldManager(""),
  }).serialise();
  const router = useRouter();
  console.log(router);
  const pageHeading = "What is the primary use for this beacon?";

  return (
    <BeaconsForm
      formErrors={form.errorSummary}
      previousPageUrl="/register-a-beacon/primary-beacon-use"
      pageHeading={pageHeading}
      showCookieBanner={showCookieBanner}
      insetText="If you have multiple uses for this beacon, tell us about the
    main one first. You will be able to tell us about other uses
    later in the form"
    >
      <FormGroup errorMessages={form.fields.environment.errorMessages}>
        <RadioList>
          <RadioListItem
            id="enviornment"
            label="Maritime"
            hintText="This might include commercial or pleasure sailing / motor vessels or unpowered craft. It could also include sea-based windfarms and rigs/platforms."
            value="MARITIME"
          />

          <RadioListItem
            id="enviornment"
            label="Aviation"
            hintText="This might include commercial or pleasure aircraft"
            value="MARITIME"
          />

          <RadioListItem
            id="enviornment"
            label="Land-based"
            hintText="This could include vehicle or other overland uses. It could also include land-based windfarms."
            value="LAND"
          />

          <RadioListItem id="enviornment" label="Other" value="OTHER" />
        </RadioList>
      </FormGroup>
    </BeaconsForm>
  );
};

export default BeaconUse;
