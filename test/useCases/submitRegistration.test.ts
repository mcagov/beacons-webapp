import { IAppContainer } from "../../src/lib/appContainer";
import { submitRegistration } from "../../src/useCases/submitRegistration";
import { registrationFixture } from "../fixtures/registration.fixture";

describe("submitRegistration()", () => {
  it("requests an access token from the beaconsApiAuthGateway", async () => {
    const container: Partial<IAppContainer> = {
      beaconsApiAuthGateway: {
        getAccessToken: jest.fn(),
      },
      sendConfirmationEmail: jest.fn(),
      beaconsApiGateway: {
        sendRegistration: jest.fn(),
      } as any,
      accountHolderApiGateway: {
        getAccountHolderDetails: jest.fn(async () => ({
          email: "beacons@beacons.com",
        })),
      } as any,
    };

    await submitRegistration(container as IAppContainer)(
      registrationFixture,
      "accountHolderId"
    );

    expect(
      container.beaconsApiAuthGateway.getAccessToken
    ).toHaveBeenCalledTimes(1);
  });

  it("attempts to send the registration to the beacons API", async () => {
    const container: Partial<IAppContainer> = {
      beaconsApiAuthGateway: {
        getAccessToken: jest.fn(),
      },
      sendConfirmationEmail: jest.fn(),
      beaconsApiGateway: {
        sendRegistration: jest.fn(),
      } as any,
      accountHolderApiGateway: {
        getAccountHolderDetails: jest.fn(async () => ({
          email: "beacons@beacons.com",
        })),
      } as any,
    };

    await submitRegistration(container as IAppContainer)(
      registrationFixture,
      "accountHolderId"
    );

    expect(container.beaconsApiGateway.sendRegistration).toHaveBeenCalledTimes(
      1
    );
  });

  it("sets the registration number before sending to the beacons API", async () => {
    // TODO: Move setting the registration number to the API and delete this test
    const container: Partial<IAppContainer> = {
      beaconsApiAuthGateway: {
        getAccessToken: jest.fn().mockResolvedValue("test-access-token"),
      },
      sendConfirmationEmail: jest.fn(),
      beaconsApiGateway: {
        sendRegistration: jest.fn(),
      } as any,
      accountHolderApiGateway: {
        getAccountHolderDetails: jest.fn(async () => ({
          email: "beacons@beacons.com",
        })),
      } as any,
    };

    await submitRegistration(container as IAppContainer)(
      registrationFixture,
      "accountHolderId"
    );

    expect(container.beaconsApiGateway.sendRegistration).toHaveBeenCalledWith(
      expect.objectContaining({
        referenceNumber: expect.stringMatching(
          oneOrMoreNonWhitespaceCharacters
        ),
      }),
      expect.anything()
    );
  });

  it("sets the account holder id before sending to the beacons API", async () => {
    const container: Partial<IAppContainer> = {
      beaconsApiAuthGateway: {
        getAccessToken: jest.fn().mockResolvedValue("test-access-token"),
      },
      sendConfirmationEmail: jest.fn(),
      beaconsApiGateway: {
        sendRegistration: jest.fn(),
      } as any,
      accountHolderApiGateway: {
        getAccountHolderDetails: jest.fn(async () => ({
          email: "beacons@beacons.com",
        })),
      } as any,
    };

    await submitRegistration(container as IAppContainer)(
      registrationFixture,
      "accountHolderId"
    );

    expect(container.beaconsApiGateway.sendRegistration).toHaveBeenCalledWith(
      expect.objectContaining({
        accountHolderId: expect.stringMatching(
          oneOrMoreNonWhitespaceCharacters
        ),
      }),
      expect.anything()
    );
  });

  it("attempts to send a confirmation email if registration was successful", async () => {
    const email = "beacons@beacons.com";
    const container: Partial<IAppContainer> = {
      beaconsApiAuthGateway: {
        getAccessToken: jest.fn(),
      },
      sendConfirmationEmail: jest.fn(),
      beaconsApiGateway: {
        sendRegistration: jest.fn().mockResolvedValue(true),
      } as any,
      accountHolderApiGateway: {
        getAccountHolderDetails: jest.fn(async () => ({
          email: "beacons@beacons.com",
        })),
      } as any,
    };

    await submitRegistration(container as IAppContainer)(
      registrationFixture,
      "accountHolderId"
    );

    expect(container.sendConfirmationEmail).toHaveBeenCalledWith(
      expect.anything(),
      email
    );
  });

  it("returns the result when the registration was a success and the email was sent", async () => {
    const container: Partial<IAppContainer> = {
      beaconsApiAuthGateway: {
        getAccessToken: jest.fn(),
      },
      sendConfirmationEmail: jest.fn().mockResolvedValue(true),
      beaconsApiGateway: {
        sendRegistration: jest.fn().mockResolvedValue(true),
      } as any,
      accountHolderApiGateway: {
        getAccountHolderDetails: jest.fn(async () => ({
          email: "beacons@beacons.com",
        })),
      } as any,
    };

    const result = await submitRegistration(container as IAppContainer)(
      registrationFixture,
      "accountHolderId"
    );

    expect(result).toStrictEqual({
      beaconRegistered: true,
      confirmationEmailSent: true,
      referenceNumber: expect.any(String),
    });
  });

  it("returns the result when the registration was a success but the email was not sent", async () => {
    const container: Partial<IAppContainer> = {
      beaconsApiAuthGateway: {
        getAccessToken: jest.fn().mockResolvedValue("test-access-token"),
      },
      sendConfirmationEmail: jest.fn().mockResolvedValue(false),
      beaconsApiGateway: {
        sendRegistration: jest.fn().mockResolvedValue(true),
      } as any,
      accountHolderApiGateway: {
        getAccountHolderDetails: jest.fn(async () => ({
          email: "beacons@beacons.com",
        })),
      } as any,
    };

    const result = await submitRegistration(container as IAppContainer)(
      registrationFixture,
      "accountHolderId"
    );

    expect(result).toStrictEqual({
      beaconRegistered: true,
      confirmationEmailSent: false,
      referenceNumber: expect.stringMatching(oneOrMoreNonWhitespaceCharacters),
    });
  });

  it("returns an empty registration number when the registration failed", async () => {
    const container: Partial<IAppContainer> = {
      beaconsApiAuthGateway: {
        getAccessToken: jest.fn().mockResolvedValue("test-access-token"),
      },
      sendConfirmationEmail: jest.fn().mockResolvedValue(false),
      beaconsApiGateway: {
        sendRegistration: jest.fn().mockResolvedValue(false),
      } as any,
      accountHolderApiGateway: {
        getAccountHolderDetails: jest.fn(async () => ({
          email: "beacons@beacons.com",
        })),
      } as any,
    };

    const result = await submitRegistration(container as IAppContainer)(
      registrationFixture,
      "accountHolderId"
    );

    expect(result.referenceNumber).toEqual("");
  });

  const oneOrMoreNonWhitespaceCharacters = /\S+/;
});
