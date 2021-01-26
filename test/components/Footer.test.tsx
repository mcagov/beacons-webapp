import { render } from "@testing-library/react";
import React from "react";
import { Footer } from "../../src/components/Footer";

describe("Footer", () => {
  it("renders the Footer correctly", () => {
    const { asFragment } = render(<Footer />);

    expect(asFragment()).toMatchSnapshot();
  });
});
