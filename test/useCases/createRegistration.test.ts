import { initBeacon } from "../../src/lib/registration/registrationInitialisation";
import { Environment } from "../../src/lib/registration/types";
import { CreateRegistration } from "../../src/useCases/createRegistration";

describe("Create Registration Use Case", () => {
  let gateway;
  let formRegistration;
  let useCase;

  beforeEach(() => {
    formRegistration = initBeacon();
    gateway = { post: jest.fn() };
    useCase = new CreateRegistration(gateway);
  });

  it("should post the registration json via the api gateway with the correct url", async () => {
    await useCase.execute(formRegistration);
    expect(gateway.post).toHaveBeenCalledWith(
      "registrations/register",
      expect.anything()
    );
  });

  it("should return true if the request is successful", async () => {
    gateway.post.mockImplementation(() => {
      return false;
    });
    const expected = await useCase.execute(formRegistration);
    expect(expected).toBe(false);
  });

  it("should return false if the request is unsuccessful", async () => {
    gateway.post.mockImplementation(() => {
      return true;
    });
    const expected = await useCase.execute(formRegistration);
    expect(expected).toBe(true);
  });

  xdescribe("when serialising the registration json", () => {
    it("should capture the use information for a maritime -> pleasure user", async () => {
      formRegistration.uses[0].environment = Environment.MARITIME;
    });
  });
});
