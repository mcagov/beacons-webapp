import React, { FunctionComponent } from "react";
import manufacturerModelJson from "../../../lib/manufacturerModel/manufacturerModel.json";
import { FormGroup } from "../../Form";
import { FormInputProps } from "../../Input";
import { Select, SelectOption } from "../../Select";

export const BeaconModelSelect: FunctionComponent<FormInputProps> = ({
  value = "",
  errorMessages,
}: FormInputProps): JSX.Element => (
  <FormGroup errorMessages={errorMessages}>
    <label className="govuk-label" htmlFor="manufacturer">
      Beacon model
    </label>
    <Select id="model" name="model" defaultValue={value || "N/A"}>
      <option selected value={"N/A"}>
        N/A
      </option>
      {Object.values(manufacturerModelJson).map((models: string[]) =>
        models.map((model: string) => (
          <SelectOption key={model} value={model}>
            {model}
          </SelectOption>
        ))
      )}
    </Select>
  </FormGroup>
);
