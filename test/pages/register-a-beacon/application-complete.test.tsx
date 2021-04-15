import { render } from "@testing-library/react";
import React from "react";
import ApplicationCompletePage, {
  getServerSideProps,
} from "../../../src/pages/register-a-beacon/application-complete";

describe("ApplicationCompletePage", () => {
  it("should render correctly", () => {
    render(<ApplicationCompletePage showCookieBanner={false} />);
  });

  describe("getServerSideProps function", () => {
    let context;

    beforeEach(() => {
      context = {};
    });

    it("should successfully register the registration", async () => {
      const props = await getServerSideProps(context);

      expect(props.reference).toBe("");
    });
  });
});
