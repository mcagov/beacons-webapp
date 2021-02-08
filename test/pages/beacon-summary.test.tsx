import React from "react";
import { render } from "@testing-library/react";
import BeaconSummaryPage from "../../src/pages/beacon-summary";

describe("Beacon Summary Page", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<BeaconSummaryPage />, {});

    expect(asFragment()).toMatchSnapshot();
  });
});
