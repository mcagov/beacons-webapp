import { BeaconsApiGateway } from "../../src/gateways/beaconsApiGateway";
import { getMockRegistration } from "../../test/mocks";

describe("Beacons API Gateway Contract Tests", () => {
  let registration;
  let gateway;

  beforeEach(() => {
    gateway = new BeaconsApiGateway();
    registration = getMockRegistration();
  });

  it("should successfuly create the registration", async () => {
    const result = await gateway.sendRegistration(registration);

    expect(result).toBe(true);
  });

  it("should not create the registration if a required field is missing", async () => {
    delete registration.beacons[0].hexId;
    const result = await gateway.sendRegistration(registration);

    expect(result).toBe(false);
  });
});
