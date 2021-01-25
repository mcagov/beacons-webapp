import React from "react";
import ReactDOM from "react-dom";
import { Header } from "../../src/components/Header";
import { render } from "@testing-library/react";

describe("Header", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
  });

  const render = (component) => ReactDOM.render(component, container);
  // TODO: Investigate ESLint flag on ReactDOM

  it("renders the service name", () => {
    const service_name = "MCA Beacons";
    render(<Header serviceName={service_name} homeLink={"#"} />);
    expect(container.textContent).toMatch(service_name);
  });

  it("renders another service name", () => {
    const service_name = "Beacons Beacons Beacons";
    render(<Header serviceName={service_name} homeLink={"#"} />);
    expect(container.textContent).toMatch(service_name);
  });

  it("renders a third service name", () => {
    const service_name = "Battersea Dogs Home";
    render(<Header serviceName={service_name} homeLink={"#"} />);
    expect(container.textContent).toMatch(service_name);
  });

  it.skip("renders the GovUK crown", () => {
    const crown_filename = "govuk-logotype-crown.png";
    const container = document.createElement("div");
    document.body.appendChild(container);

    ReactDOM.render(
      <Header serviceName={"A Service Name"} homeLink={"#"} />,
      container
    );

    expect(container.innerHTML).toMatch(crown_filename);
  });

  // What do we think of the above style of test?  We can continue down this
  // route, or we can use Jest snapshot testing for GovUK components (as per the
  // pages directory)
});

describe("Header with snapshots", () => {
  it("renders Header correctly", () => {
    const { asFragment } = render(
      <Header serviceName={"Beacons Beacons Beacons"} homeLink={"#"} />,
      {}
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
