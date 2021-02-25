import { render, screen } from "@testing-library/react";
import React from "react";
import { formSubmissionCookieId } from "../../../src/lib/types";
import AboutTheOwner, {
  getServerSideProps,
} from "../../../src/pages/register-a-beacon/about-the-owner";

describe("AboutTheOwner", () => {
  it("should have a back button which directs the user to the primary beacon use page", () => {
    render(<AboutTheOwner />);

    expect(screen.getByText("Back", { exact: true })).toHaveAttribute(
      "href",
      "/register-a-beacon/about-the-vessel"
    );
  });

  describe("getServerSideProps()", () => {
    let context;
    beforeEach(() => {
      context = {
        req: {
          cookies: {
            [formSubmissionCookieId]: "1",
          },
        },
      };
    });

    it("should return an empty props object", async () => {
      const expectedProps = await getServerSideProps(context);
      expect(expectedProps).toStrictEqual({ props: {} });
    });
  });
});
