import { GetServerSideProps } from "next";
import React, { FunctionComponent } from "react";
import { Button } from "../../components/Button";
import { FormErrorSummary } from "../../components/ErrorSummary";
import {
  Form,
  FormFieldset,
  FormGroup,
  FormLegendPageHeading,
} from "../../components/Form";
import { Grid } from "../../components/Grid";
import { FormInputProps, Input } from "../../components/Input";
import { Layout } from "../../components/Layout";
import { IfYouNeedHelp } from "../../components/Mca";
import { GovUKBody, SectionHeading } from "../../components/Typography";
import { IAccountHolderDetails } from "../../entities/accountHolderDetails";
import {
  BeaconsGetServerSidePropsContext,
  withContainer,
} from "../../lib/container";
import { FieldManager } from "../../lib/form/fieldManager";
import { FormJSON, FormManager } from "../../lib/form/formManager";
import { Validators } from "../../lib/form/validators";
import { redirectUserTo } from "../../lib/redirectUserTo";
import { PageURLs } from "../../lib/urls";
import { getOrCreateAccountHolder } from "../../useCases/getOrCreateAccountHolder";
import { updateAccountHolder } from "../../useCases/updateAccountHolder";

export interface UpdateAccountPageProps {
  form: FormJSON;
  accountHolderDetails: IAccountHolderDetails;
}

const getPageForm = ({
  fullName,
  telephoneNumber,
  addressLine1,
  addressLine2,
  townOrCity,
  county,
  postcode,
  email,
}: any): FormManager => {
  return new FormManager({
    fullName: new FieldManager(fullName, [
      Validators.required("Full name is a required field"),
    ]),
    telephoneNumber: new FieldManager(telephoneNumber),
    addressLine1: new FieldManager(addressLine1, [
      Validators.required("Building number and street is a required field"),
    ]),
    addressLine2: new FieldManager(addressLine2),
    townOrCity: new FieldManager(townOrCity, [
      Validators.required("Town or city is a required field"),
    ]),
    county: new FieldManager(county),
    postcode: new FieldManager(postcode, [
      Validators.required("Postcode is a required field"),
      Validators.postcode("Postcode must be a valid UK postcode"),
    ]),
    email: new FieldManager(email),
  });
};

const UpdateAccount: FunctionComponent<UpdateAccountPageProps> = ({
  form,
}: UpdateAccountPageProps): JSX.Element => {
  const pageHeading =
    "Update your details as the Beacon Registry Account Holder";

  return (
    <Layout
      // navigation={backButton}
      title={pageHeading}
      showCookieBanner={false}
    >
      <Grid
        mainContent={
          <>
            <FormErrorSummary formErrors={form.errorSummary} />
            <Form>
              <FormGroup errorMessages={[]}>
                <FormFieldset>
                  <FormLegendPageHeading>{pageHeading}</FormLegendPageHeading>
                  <GovUKBody>
                    We will send this person confirmation messages, certificates
                    and and account reminders. You can provide details of the
                    beacon owner (if this is a different person or organisation)
                    later.
                  </GovUKBody>
                </FormFieldset>

                <SectionHeading>About you</SectionHeading>
                <FullName
                  value={form.fields.fullName.value}
                  errorMessages={form.fields.fullName.errorMessages}
                />

                <TelephoneNumber
                  value={form.fields.telephoneNumber.value}
                  errorMessages={form.fields.telephoneNumber.errorMessages}
                />
                <AccountHolderAddress form={form} />
              </FormGroup>
              <Button buttonText="Save these account details" />
              &nbsp;
              <Button buttonText="Cancel" />
            </Form>
            <IfYouNeedHelp />
          </>
        }
      />
    </Layout>
  );
};

const FullName: FunctionComponent<FormInputProps> = ({
  value = "",
  errorMessages,
}: FormInputProps): JSX.Element => (
  <FormGroup errorMessages={errorMessages}>
    <Input id="fullName" label="Your full name" defaultValue={value} />
  </FormGroup>
);

const TelephoneNumber: FunctionComponent<FormInputProps> = ({
  value = "",
  errorMessages,
}: FormInputProps): JSX.Element => (
  <FormGroup errorMessages={errorMessages}>
    <Input
      id="telephoneNumber"
      label="Telephone number"
      hintText="Search and rescue may use this to try you in an emergency. This can be a mobile or landline. For international numbers include the country code."
      defaultValue={value}
    />
  </FormGroup>
);

const AccountHolderAddress: FunctionComponent<{ form: FormJSON }> = ({
  form,
}: {
  form: FormJSON;
}): JSX.Element => (
  <FormGroup>
    <FormGroup errorMessages={form.fields.addressLine1.errorMessages}>
      <Input
        id="addressLine1"
        label="Building number and street"
        defaultValue={form.fields.addressLine1.value}
      />
    </FormGroup>
    <FormGroup>
      <Input id="addressLine2" defaultValue={form.fields.addressLine2.value} />
    </FormGroup>
    <FormGroup errorMessages={form.fields.townOrCity.errorMessages}>
      <Input
        id="townOrCity"
        label="Town or city"
        defaultValue={form.fields.townOrCity.value}
      />
    </FormGroup>
    <FormGroup errorMessages={form.fields.county.errorMessages}>
      <Input
        id="county"
        label="County (optional)"
        defaultValue={form.fields.county.value}
      />
    </FormGroup>
    <FormGroup errorMessages={form.fields.postcode.errorMessages}>
      <Input
        id="postcode"
        label="Postcode"
        defaultValue={form.fields.postcode.value}
      />
    </FormGroup>
  </FormGroup>
);

function userDidSubmitForm(context: BeaconsGetServerSidePropsContext) {
  return context.req.method === "POST";
}

export const getServerSideProps: GetServerSideProps = withContainer(
  async (context: BeaconsGetServerSidePropsContext) => {
    const parseFormDataAsFn = context.container.parseFormDataAs;
    const updateAccountHolderFn = updateAccountHolder(context.container);
    const getOrCreateAccountHolderFn = getOrCreateAccountHolder(
      context.container
    );
    let formManager: FormManager;

    if (userDidSubmitForm(context)) {
      const formData = await parseFormDataAsFn<AccountDetailsForm>(context.req);
      formManager = getPageForm(formData).asDirty();

      if (formManager.isValid()) {
        const accountHolder = await getOrCreateAccountHolderFn(context);
        const update = accountHolderUpdate(formData);
        if (await updateAccountHolderFn(accountHolder, update)) {
          return redirectUserTo(PageURLs.accountHome);
        }
      }
    } else {
      formManager = getPageForm(
        accountDetailsForm(await getOrCreateAccountHolderFn(context))
      );
    }

    return {
      props: {
        form: formManager.serialise(),
      },
    };
  }
);

export default UpdateAccount;

const accountDetailsForm = (
  accountHolder: IAccountHolderDetails
): AccountDetailsForm => ({
  fullName: accountHolder.fullName,
  telephoneNumber: accountHolder.telephoneNumber,
  addressLine1: accountHolder.addressLine1,
  addressLine2: accountHolder.addressLine2,
  townOrCity: accountHolder.townOrCity,
  county: accountHolder.county,
  postcode: accountHolder.postcode,
  email: accountHolder.email,
});

const accountHolderUpdate = (
  accountDetailsForm: AccountDetailsForm
): IAccountHolderDetails =>
  ({
    fullName: accountDetailsForm.fullName,
    telephoneNumber: accountDetailsForm.telephoneNumber,
    addressLine1: accountDetailsForm.addressLine1,
    addressLine2: accountDetailsForm.addressLine2,
    townOrCity: accountDetailsForm.townOrCity,
    county: accountDetailsForm.county,
    postcode: accountDetailsForm.postcode,
    email: accountDetailsForm.email,
  } as IAccountHolderDetails);

interface AccountDetailsForm {
  fullName: string;
  telephoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  townOrCity: string;
  county: string;
  postcode: string;
  email: string;
}