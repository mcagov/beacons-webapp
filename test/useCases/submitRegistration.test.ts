import { submitRegistration } from "../../src/useCases/submitRegistration";

describe("submitRegistration()", () => {
  it("requests an access token from the authGateway", async () => {
    const mockRetrieveAuthToken = jest.fn();
    const container: any = {
      getRetrieveCachedRegistration: () =>
        jest.fn().mockResolvedValue({ serialiseToAPI: jest.fn() }),
      getRetrieveAccessToken: () => mockRetrieveAuthToken,
      getSendConfirmationEmail: () => jest.fn(),
      getBeaconsApiGateway: () => ({
        sendRegistration: jest.fn(),
      }),
    };

    await submitRegistration(container)("submissionId");

    expect(mockRetrieveAuthToken).toHaveBeenCalledTimes(1);
  });

  it("attempts to send the registration to the beacons API", async () => {
    const mockSendRegistrationToApi = jest.fn();
    const container: any = {
      getRetrieveCachedRegistration: () =>
        jest.fn().mockResolvedValue({ serialiseToAPI: jest.fn() }),
      getRetrieveAccessToken: () => jest.fn(),
      getSendConfirmationEmail: () => jest.fn(),
      getBeaconsApiGateway: () => ({
        sendRegistration: mockSendRegistrationToApi,
      }),
    };

    await submitRegistration(container)("submissionId");

    expect(mockSendRegistrationToApi).toHaveBeenCalledTimes(1);
  });

  it("attempts to send a confirmation email if registration was successful", async () => {
    const sendConfirmationEmail = jest.fn();
    const container: any = {
      getRetrieveCachedRegistration: () =>
        jest.fn().mockResolvedValue({
          serialiseToAPI: jest.fn(),
          getRegistration: jest.fn(),
        }),
      getRetrieveAccessToken: () => jest.fn(),
      getSendConfirmationEmail: () => sendConfirmationEmail,
      getBeaconsApiGateway: () => ({
        sendRegistration: jest.fn().mockResolvedValue(true),
      }),
    };

    await submitRegistration(container)("submissionId");

    expect(sendConfirmationEmail).toHaveBeenCalledTimes(1);
  });

  it("returns the result when the registration was a success and the email was sent", async () => {
    const container: any = {
      getRetrieveCachedRegistration: () =>
        jest.fn().mockResolvedValue({
          serialiseToAPI: jest.fn(),
          getRegistration: jest.fn(),
        }),
      getRetrieveAccessToken: () => jest.fn(),
      getSendConfirmationEmail: () => jest.fn().mockResolvedValue(true),
      getBeaconsApiGateway: () => ({
        sendRegistration: jest.fn().mockResolvedValue(true),
      }),
    };

    const result = await submitRegistration(container)("submissionId");

    expect(result).toStrictEqual({
      beaconRegistered: true,
      confirmationEmailSent: true,
      registrationNumber: expect.any(String),
    });
  });

  it("returns the result when the registration was a success but the email was not sent", async () => {
    const container: any = {
      getRetrieveCachedRegistration: () =>
        jest.fn().mockResolvedValue({
          serialiseToAPI: jest.fn(),
          getRegistration: jest.fn(),
        }),
      getRetrieveAccessToken: () => jest.fn(),
      getSendConfirmationEmail: () => jest.fn().mockResolvedValue(false),
      getBeaconsApiGateway: () => ({
        sendRegistration: jest.fn().mockResolvedValue(true),
      }),
    };

    const result = await submitRegistration(container)("submissionId");

    expect(result).toStrictEqual({
      beaconRegistered: true,
      confirmationEmailSent: false,
      registrationNumber: expect.any(String),
    });
  });

  it("returns a registration number when the registration was a success", async () => {
    const container: any = {
      getRetrieveCachedRegistration: () =>
        jest.fn().mockResolvedValue({
          serialiseToAPI: jest.fn(),
          getRegistration: jest.fn(),
        }),
      getRetrieveAccessToken: () => jest.fn(),
      getSendConfirmationEmail: () => jest.fn().mockResolvedValue(false),
      getBeaconsApiGateway: () => ({
        sendRegistration: jest.fn().mockResolvedValue(true),
      }),
    };

    const result = await submitRegistration(container)("submissionId");

    expect(result.registrationNumber.length).toBeGreaterThan(1);
  });

  it("returns an empty registration number when the registration failed", async () => {
    const container: any = {
      getRetrieveCachedRegistration: () =>
        jest.fn().mockResolvedValue({
          serialiseToAPI: jest.fn(),
          getRegistration: jest.fn(),
        }),
      getRetrieveAccessToken: () => jest.fn(),
      getSendConfirmationEmail: () => jest.fn().mockResolvedValue(false),
      getBeaconsApiGateway: () => ({
        sendRegistration: jest.fn().mockResolvedValue(false),
      }),
    };

    const result = await submitRegistration(container)("submissionId");

    expect(result.registrationNumber).toEqual("");
  });
});
