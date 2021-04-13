import axios from "axios";
import { BeaconsApiGateway } from "../../src/gateways/beaconsApiGateway";
import { Registration } from "../../src/lib/registration/registration";

jest.mock("axios");

describe("Beacons API Gateway", () => {
  let gateway: BeaconsApiGateway;
  let registration: Registration;

  beforeEach(() => {
    process.env.BEACONS_API_URL = "http://localhost:8080/spring-api";
    gateway = new BeaconsApiGateway();
    registration = new Registration();
  });

  afterEach(() => {
    process.env.BEACONS_API_URL = undefined;
  });

  it("should return true if the request was successful", async () => {
    const expected = await gateway.sendRegistration(registration);
    expect(expected).toBe(true);
  });

  it("should return false if the request is unsuccessful", async () => {
    (axios as any).post.mockImplementation(() => {
      throw new Error();
    });

    const expected = await gateway.sendRegistration(registration);
    expect(expected).toBe(false);
  });
});
