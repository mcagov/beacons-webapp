import { BeaconsApiGateway } from "../../src/gateways/beaconsApiGateway";
import { Activity, Environment } from "../../src/lib/registration/types";

describe("Beacons API Gateway Contract Tests", () => {
  let registration;
  let gateway;

  beforeEach(() => {
    gateway = new BeaconsApiGateway();
    registration = {
      beacons: [
        {
          model: "Trousers",
          hexId: "1D0",
          manufacturer: "ASOS",
          referenceNumber: "ADBEFD",
          manufacturerSerialNumber: "1234",
          chkCode: "check",
          batteryExpiryDate: "2020-02-01",
          lastServicedDate: "2020-02-01",

          uses: [
            {
              environment: Environment.MARITIME,
              otherEnvironment: "",
              activity: Activity.OTHER,
              otherActivity: "On my boat",
              callSign: "callSign",
              vhfRadio: false,
              fixedVhfRadio: false,
              fixedVhfRadioValue: "0117",
              portableVhfRadio: false,
              portableVhfRadioValue: "0118",
              satelliteTelephone: false,
              satelliteTelephoneValue: "0119",
              mobileTelephone: false,
              mobileTelephone1: "01178123456",
              mobileTelephone2: "01178123457",
              otherCommunication: false,
              otherCommunicationValue: "Via email",
              maxCapacity: 22,
              vesselName: "My lucky boat",
              portLetterNumber: "12345",
              homeport: "Bristol",
              areaOfOperation: "Newport",
              beaconLocation: "In my carry bag",
              imoNumber: "123456",
              ssrNumber: "123456",
              officialNumber: "123456",
              rigPlatformLocation: "On the rig",
              mainUse: true,
              aircraftManufacturer: "Boeing",
              principalAirport: "Bristol",
              secondaryAirport: "Cardiff",
              registrationMark: "Reg mark",
              hexAddress: "123456",
              cnOrMsnNumber: "123456",
              dongle: false,
              beaconPosition: "Carry bag",
              workingRemotelyLocation: "Bristol",
              workingRemotelyPeopleCount: "10",
              windfarmLocation: "10",
              windfarmPeopleCount: "10",
              otherActivityLocation: "Taunton",
              otherActivityPeopleCount: "10",
              moreDetails: "Blue boat, tracked in SafeTrx",
            },
          ],
        },
      ],
    };
  });

  it("should successfuly create the registration", async () => {
    const result = await gateway.sendRegistration(registration);

    expect(result).toBe(true);
  });

  it("should not create the registration if a required field is missing", async () => {
    const result = await gateway.sendRegistration(registration);

    expect(result).toBe(false);
  });
});
