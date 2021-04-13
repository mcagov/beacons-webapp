import axios from "axios";
import { BeaconsApiGateway } from "../../src/gateways/beaconsApiGateway";
import { Registration } from "../../src/lib/registration/registration";

jest.mock("axios");

describe("Beacons API Gateway", () => {
  let gateway: BeaconsApiGateway;
  let registration: Registration;
  const apiUrl = "http://localhost:8080/spring-api";

  beforeEach(() => {
    process.env.BEACONS_API_URL = apiUrl;
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

  it("should be called with the correct registrations url", async () => {
    const expectedUrl = `${apiUrl}/registrations/register`;

    await gateway.sendRegistration(registration);
    expect((axios as any).post).toHaveBeenLastCalledWith(
      expectedUrl,
      expect.anything()
    );
  });
});
