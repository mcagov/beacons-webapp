import { render, screen } from "@testing-library/react";
import { GetServerSidePropsContext } from "next";
import React from "react";
import { FormJSON } from "../../../src/lib/form/formManager";
import { handlePageRequest } from "../../../src/lib/handlePageRequest";
import { Environment, Purpose } from "../../../src/lib/types";
import Activity, {
  ActivityOptions,
  getServerSideProps,
} from "../../../src/pages/register-a-beacon/activity";

jest.mock("../../../src/lib/handlePageRequest", () => ({
  __esModule: true,
  handlePageRequest: jest.fn().mockImplementation(() => jest.fn()),
}));

describe("Activity", () => {
  const activityForm: FormJSON = {
    hasErrors: false,
    errorSummary: [],
    fields: {
      activity: {
        value: "",
        errorMessages: [],
      },
      otherActivityText: {
        value: "",
        errorMessages: [],
      },
    },
  };

  it("should have a back button which directs the user to the beacon information page", () => {
    render(<Activity form={activityForm} />);

    expect(screen.getByText("Back", { exact: true })).toHaveAttribute(
      "href",
      "/register-a-beacon/beacon-information"
    );
  });

  it("should redirect to about-the-vessel page on valid form submission", async () => {
    const context = {};
    await getServerSideProps(context as GetServerSidePropsContext);

    expect(handlePageRequest).toHaveBeenCalledWith(
      "/register-a-beacon/about-the-vessel",
      expect.anything()
    );
  });

  describe("ActivityOptions", () => {
    let environment: string;
    let purpose: string;

    describe("When environment is MARITIME and purpose is PLEASURE", () => {
      it("should have the Maritime Pleasure options in the list", () => {
        environment = Environment.MARITIME;
        purpose = Purpose.PLEASURE;

        render(
          <ActivityOptions
            environment={environment}
            purpose={purpose}
            form={activityForm}
            listItemName={"activity"}
          />
        );

        expect(screen.queryByText("Rowing vessel")).not.toBeNull();
        expect(screen.queryByText("Commercial sailing vessel")).toBeNull();
      });
    });

    describe("When environment is MARITIME and purpose is COMMERCIAL", () => {
      it("should have the Maritime Commercial options in the list", () => {
        environment = Environment.MARITIME;
        purpose = Purpose.COMMERCIAL;

        render(
          <ActivityOptions
            environment={environment}
            purpose={purpose}
            form={activityForm}
            listItemName={"activity"}
          />
        );

        expect(screen.queryByText("Commercial sailing vessel")).not.toBeNull();
        expect(screen.queryByText("Small unpowered vessel")).toBeNull();
      });
    });
  });
});
