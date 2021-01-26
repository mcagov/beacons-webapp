import { render } from "@testing-library/react";
import React from "react";
import { Page } from "../../src/components/Page";

describe("Page", () => {
  it("renders the Page correctly", () => {
    const pageProps = {
      serviceName: "Beacons Beacons Beacons",
      homeLink: "#",
      phase: "BETA",
      bannerHtml: <>This is just a test service, please ignore.</>,
    };
    const { asFragment } = render(
      <Page {...pageProps}>
        <h1>Welcome to Beacons Beacons Beacons!</h1>
        <p>For all your beacon and beacon accessory needs.</p>
      </Page>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
