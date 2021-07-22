import axios from "axios";
import {
  BeaconsApiGateway,
  registrationToRequestBody,
} from "../../src/gateways/beaconsApiGateway";
import { registrationFixture } from "../fixtures/registration.fixture";
import { registrationRequestBodyFixture } from "../fixtures/registrationRequestBody.fixture";

jest.mock("axios");

describe("Beacons API Gateway", () => {
  let gateway: BeaconsApiGateway;
  const apiUrl = "http://localhost:8080/spring-api";
  const token = "mock_access_token";
  const endpoint = "registrations/register";

  beforeEach(() => {
    gateway = new BeaconsApiGateway(apiUrl);
  });

  describe("Posting an entity", () => {
    it("should return true if it posted the entity successfully", async () => {
      const expected = await gateway.sendRegistration(
        registrationFixture,
        token
      );
      expect(expected).toBe(true);
    });

    it("should return false if the request is unsuccessful", async () => {
      (axios as any).post.mockImplementation(() => {
        throw new Error();
      });
      const expected = await gateway.sendRegistration(
        registrationFixture,
        token
      );
      expect(expected).toBe(false);
    });

    it("should send the JSON to the correct url", async () => {
      const expectedUrl = `${apiUrl}/${endpoint}`;
      await gateway.sendRegistration(registrationFixture, token);
      expect((axios as any).post).toHaveBeenLastCalledWith(
        expectedUrl,
        registrationRequestBodyFixture,
        expect.anything()
      );
    });
  });

  describe("Deleting a beacon", () => {
    let json;

    beforeEach(() => {
      json = {
        beaconId: "1234",
        accountHolderId: "0987",
        reason: "Unused on my boat anymore",
      };
    });

    it("should return true if it deleted the entity successfully", async () => {
      const expected = await gateway.deleteBeacon(json, token);
      expect(expected).toBe(true);
    });

    it("should return false if the delete is unsuccessful", async () => {
      (axios as any).patch.mockImplementation(() => {
        throw new Error();
      });

      const expected = await gateway.deleteBeacon(json, token);
      expect(expected).toBe(false);
    });

    it("should send the JSON to the correct endpoint", async () => {
      const expectedUrl = `${apiUrl}/beacons/1234/delete`;
      const expectedJson = {
        beaconId: "1234",
        userId: "0987",
        reason: "Unused on my boat anymore",
      };

      await gateway.deleteBeacon(json, token);
      expect((axios as any).patch).toHaveBeenLastCalledWith(
        expectedUrl,
        expectedJson,
        expect.anything()
      );
    });
  });
});

describe("registrationToRequestBody", () => {
  it("maps an IRegistration to an IRegistrationRequestBody", () => {
    expect(registrationToRequestBody(registrationFixture)).toStrictEqual(
      registrationRequestBodyFixture
    );
  });
});
