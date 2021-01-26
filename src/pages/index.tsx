import React, { FunctionComponent } from "react";
import { PhaseBanner } from "../components/PhaseBanner";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { render } from "@testing-library/react";
import { Page } from "../components/Page";

const pageProps = {
  serviceName: "Beacons Beacons Beacons",
  homeLink: "#",
  phase: "BETA",
  bannerHtml: <>This is just a test service, please ignore.</>,
};

const Home: FunctionComponent = () => {
  return (
    <Page {...pageProps}>
      <h1>Welcome to Beacons Beacons Beacons!</h1>
      <p>For all your beacon and beacon accessory needs.</p>
    </Page>
  );
};

export default Home;
