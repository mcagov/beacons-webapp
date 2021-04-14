import { initBeacon } from "../../src/lib/registration/registrationInitialisation";
import { Environment } from "../../src/lib/registration/types";
import { CreateRegistration } from "../../src/useCases/createRegistration";

describe("Create Registration Use Case", () => {
  let gateway;
  let formRegistration;
  let useCase;
  let registrationsEndpoint;

  beforeEach(() => {
    registrationsEndpoint = "registrations/register";
    formRegistration = initBeacon();
    gateway = { post: jest.fn() };
    useCase = new CreateRegistration(gateway);
  });

  it("should post the registration json via the api gateway with the correct url", async () => {
    await useCase.execute(formRegistration);
    expect(gateway.post).toHaveBeenCalledWith(
      registrationsEndpoint,
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

  describe("when serialising the registration json", () => {
    let expectedJson;
    let beaconInformation;
    let uses;
    let emergencyContacts;
    let owner;

    beforeEach(() => {
      beaconInformation = {
        hexId: "",
        manufacturer: "",
        model: "",
        referenceNumber: "",
        manufacturerSerialNumber: "",
        chkCode: "",
        batteryExpiryDate: "",
        lastServicedDate: "",
      };
      uses = [
        {
          environment: "",
          activity: "",
          otherEnvironment: "",
          otherActivity: "",
          mainUse: true,
          moreDetails: "",
        },
      ];
      emergencyContacts = [];
      owner = {
        fullName: "",
        email: "",
        telephoneNumber: "",
        alternativeTelephoneNumber: "",
        addressLine1: "",
        addressLine2: "",
        townOrCity: "",
        county: "",
        postcode: "",
      };

      expectedJson = {
        ...beaconInformation,
        uses,
        emergencyContacts,
        owner,
      };
    });

    const assertRegistrationSerialisedCorrectly = async () => {
      await useCase.execute(formRegistration);
      expect(gateway.post).toHaveBeenLastCalledWith(registrationsEndpoint, {
        beacons: [expectedJson],
      });
    };

    it("should capture the top-level beacon information", async () => {
      await assertRegistrationSerialisedCorrectly();
    });

    describe("when serialing emergency contact information", () => {
      let emergencyContact;

      beforeEach(() => {
        emergencyContact = {
          fullName: "Martha",
          telephoneNumber: "07713567974",
          alternativeTelephoneNumber: "07713567974",
        };
      });

      it("should add the three emergency contacts", async () => {
        emergencyContacts.push(emergencyContact);
        emergencyContacts.push(emergencyContact);
        emergencyContacts.push(emergencyContact);

        formRegistration.emergencyContact1FullName = emergencyContact.fullName;
        formRegistration.emergencyContact1TelephoneNumber =
          emergencyContact.telephoneNumber;
        formRegistration.emergencyContact1AlternativeTelephoneNumber =
          emergencyContact.alternativeTelephoneNumber;

        formRegistration.emergencyContact2FullName = emergencyContact.fullName;
        formRegistration.emergencyContact2TelephoneNumber =
          emergencyContact.telephoneNumber;
        formRegistration.emergencyContact2AlternativeTelephoneNumber =
          emergencyContact.alternativeTelephoneNumber;

        formRegistration.emergencyContact3FullName = emergencyContact.fullName;
        formRegistration.emergencyContact3TelephoneNumber =
          emergencyContact.telephoneNumber;
        formRegistration.emergencyContact3AlternativeTelephoneNumber =
          emergencyContact.alternativeTelephoneNumber;

        await assertRegistrationSerialisedCorrectly();
      });
    });

    it("should capture the use information for a maritime -> pleasure user", async () => {
      formRegistration.uses[0].environment = Environment.MARITIME;
      uses[0].purpose = "";
      await useCase.execute(formRegistration);
    });
  });
});
