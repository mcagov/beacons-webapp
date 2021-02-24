import { render, screen } from "@testing-library/react";
import React from "react";
import BeaconInformation from "../../../src/pages/register-a-beacon/beacon-information";

describe("BeaconInformationPage", () => {
  it("should have a back button which directs the user to the check beacon details page", () => {
    render(<BeaconInformation />);

    expect(screen.getByText("Back", { exact: true })).toHaveAttribute(
      "href",
      "/register-a-beacon/check-beacon-details"
    );
  });
});
