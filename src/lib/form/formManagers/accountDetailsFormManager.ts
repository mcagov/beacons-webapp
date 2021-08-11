import { FormSubmission } from "../../../presenters/formSubmission";
import { FieldManager } from "../FieldManager";
import { FormManager } from "../FormManager";
import { Validators } from "../Validators";

export const accountDetailsFormManager = ({
  fullName,
  telephoneNumber,
  addressLine1,
  addressLine2,
  townOrCity,
  county,
  postcode,
  email,
}: FormSubmission): FormManager => {
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
