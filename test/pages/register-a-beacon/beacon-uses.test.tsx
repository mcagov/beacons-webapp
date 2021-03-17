import { render, screen } from "@testing-library/react";
import { GetServerSidePropsContext } from "next";
import React from "react";
import { FormJSON } from "../../../src/lib/form/formManager";
import { handlePageRequest } from "../../../src/lib/handlePageRequest";
import BeaconUses, {
  getServerSideProps,
} from "../../../src/pages/register-a-beacon/beacon-uses";

jest.mock("../../../src/lib/handlePageRequest", () => ({
  __esModule: true,
  handlePageRequest: jest.fn().mockImplementation(() => jest.fn()),
}));

describe("BeaconUses", () => {
  const primaryBeaconUseForm: FormJSON = {
    hasErrors: false,
    errorSummary: [],
    fields: {
      beaconUse: {
        value: "",
        errorMessages: [],
      },
    },
  };

  it("should have a back button which directs the user to the beacon information page", () => {
    render(<BeaconUses form={primaryBeaconUseForm} />);

    expect(screen.getByText("Back", { exact: true })).toHaveAttribute(
      "href",
      "/register-a-beacon/beacon-information"
    );
  });

  it("should POST its form submission to itself for redirection via getServerSideProps()", () => {
    const { container } = render(<BeaconUses form={primaryBeaconUseForm} />);
    const ownPath = "/register-a-beacon/beacon-uses";

    const form = container.querySelectorAll("form")[1];

    expect(form).toHaveAttribute("action", ownPath);
  });

  it("should redirect to about-the-vessel page on valid form submission", async () => {
    const context = {};
    await getServerSideProps(context as GetServerSidePropsContext);

    expect(handlePageRequest).toHaveBeenCalledWith(
      "/register-a-beacon/about-the-vessel",
      expect.anything()
    );
  });
});
