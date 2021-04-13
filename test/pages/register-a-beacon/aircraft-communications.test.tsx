import { render } from "@testing-library/react";
import React from "react";
import { FormJSON } from "../../../src/lib/form/formManager";
import AircraftCommunications from "../../../src/pages/register-a-beacon/aircraft-communications";

describe("AircraftCommunications", () => {
  const emptyAircraftCommunicationsForm: FormJSON = {
    hasErrors: false,
    errorSummary: [],
    fields: {
      vhfRadio: {
        value: "",
        errorMessages: [],
      },
      satelliteTelephone: {
        value: "",
        errorMessages: [],
      },
      satelliteTelephoneValue: {
        value: "",
        errorMessages: [],
      },
      mobileTelephone: {
        value: "",
        errorMessages: [],
      },
      mobileTelephone1: {
        value: "",
        errorMessages: [],
      },
      mobileTelephone2: {
        value: "",
        errorMessages: [],
      },
      otherCommunication: {
        value: "",
        errorMessages: [],
      },
      otherCommunicationValue: {
        value: "",
        errorMessages: [],
      },
    },
  };

  it("should render the aircraft comms page", () => {
    render(<AircraftCommunications form={emptyAircraftCommunicationsForm} />);
  });
});
