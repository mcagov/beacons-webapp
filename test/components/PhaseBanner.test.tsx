import { render } from "@testing-library/react";
import { PhaseBanner } from "../../src/components/PhaseBanner";

describe("PhaseBanner with snapshots", () => {
  it("renders the Phase Banner correctly", () => {
    const { asFragment } = render(
      <PhaseBanner
        phase={"BETA"}
        bannerHtml={
          <>
            Hello <a href={"#"}> World </a>
          </>
        }
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
