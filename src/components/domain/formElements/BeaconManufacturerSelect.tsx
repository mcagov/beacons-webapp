import React, { FunctionComponent } from "react";
import manufacturerModelJson from "../../../lib/manufacturerModel/manufacturerModel.json";
import { FormGroup } from "../../Form";
import { FormInputProps } from "../../Input";
import { Select, SelectOption } from "../../Select";

export const BeaconManufacturerSelect: FunctionComponent<FormInputProps> = ({
  value = "",
  errorMessages,
}: FormInputProps): JSX.Element => (
  <FormGroup errorMessages={errorMessages}>
    <label className="govuk-label" htmlFor="manufacturer">
      Beacon manufacturer
    </label>
    <Select id="manufacturer" name="manufacturer" defaultValue={value || "N/A"}>
      <option selected value={"N/A"}>
        N/A
      </option>
      {Object.keys(manufacturerModelJson).map((manufacturer) => (
        <SelectOption key={manufacturer} value={manufacturer}>
          {manufacturer}
        </SelectOption>
      ))}
    </Select>
  </FormGroup>
);
