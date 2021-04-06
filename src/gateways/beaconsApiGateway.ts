import axios from "axios";
import {
  Address,
  Aircraft,
  Beacon,
  BeaconUseNew,
  Contact,
  Environment,
  IRegistration,
  LandOther,
  SerializedRegistration,
  Vessel,
} from "../lib/registration/types";

export class BeaconApiGateway {
  apiUrl;
  constructor() {
    // this.apiUrl = process.env.BEACONS_API_URL;
    this.apiUrl = "http://localhost:8080/spring-api";
  }

  serializeRegistration(registration: IRegistration): SerializedRegistration {
    const serializedRegistration: SerializedRegistration = new SerializedRegistration();

    const beacon: Beacon = new Beacon();
    beacon.manufacturer = registration.manufacturer;
    beacon.model = registration.model;
    beacon.hexId = registration.hexId;

    beacon.manufacturerSerialNumber = registration.manufacturerSerialNumber;
    beacon.chkCode = registration.chkCode;
    beacon.batteryExpiryDate = registration.batteryExpiryDate;
    beacon.lastServicedDate = registration.lastServicedDate;

    for (const oldBeaconUse of registration.uses) {
      const beaconUse: BeaconUseNew = new BeaconUseNew();
      beaconUse.environment = oldBeaconUse.environment;
      beaconUse.purpose = oldBeaconUse.purpose;
      beaconUse.activity = oldBeaconUse.activity;
      beaconUse.environmentOtherInput = oldBeaconUse.environmentOtherInput;
      beaconUse.otherActivityText = oldBeaconUse.otherActivityText;

      switch (oldBeaconUse.environment) {
        case Environment.MARITIME:
          beaconUse.vessel = new Vessel();
          beaconUse.vessel.maxCapacity = oldBeaconUse.maxCapacity;
          beaconUse.vessel.vesselName = oldBeaconUse.vesselName;
          beaconUse.vessel.vesselUse = oldBeaconUse.vesselUse;
          beaconUse.vessel.otherVesselUseText = oldBeaconUse.otherVesselUseText;
          beaconUse.vessel.portLetterNumber = oldBeaconUse.portLetterNumber;
          beaconUse.vessel.homeport = oldBeaconUse.homeport;
          beaconUse.vessel.areaOfOperation = oldBeaconUse.areaOfOperation;
          beaconUse.vessel.beaconLocation = oldBeaconUse.beaconLocation;
          beaconUse.vessel.imoNumber = oldBeaconUse.imoNumber;
          beaconUse.vessel.ssrNumber = oldBeaconUse.ssrNumber;
          beaconUse.vessel.officialNumber = oldBeaconUse.officialNumber;
          beaconUse.vessel.rigPlatformLocation =
            oldBeaconUse.rigPlatformLocation;

          beaconUse.vessel.callSign = oldBeaconUse.callSign;
          beaconUse.vessel.vhfRadio = oldBeaconUse.vhfRadio;
          beaconUse.vessel.fixedVhfRadio = oldBeaconUse.fixedVhfRadio;
          beaconUse.vessel.fixedVhfRadioInput = oldBeaconUse.fixedVhfRadioInput;
          beaconUse.vessel.portableVhfRadio = oldBeaconUse.portableVhfRadio;
          beaconUse.vessel.portableVhfRadioInput =
            oldBeaconUse.portableVhfRadioInput;
          beaconUse.vessel.satelliteTelephone = oldBeaconUse.satelliteTelephone;
          beaconUse.vessel.satelliteTelephoneInput =
            oldBeaconUse.satelliteTelephoneInput;
          beaconUse.vessel.mobileTelephone = oldBeaconUse.mobileTelephone;
          beaconUse.vessel.mobileTelephoneInput1 =
            oldBeaconUse.mobileTelephoneInput1;
          beaconUse.vessel.mobileTelephoneInput2 =
            oldBeaconUse.mobileTelephoneInput2;

          beaconUse.vessel.moreDetails = oldBeaconUse.moreDetails;
          break;
        case Environment.AVIATION:
          beaconUse.aircraft = new Aircraft();
          beaconUse.aircraft.maxCapacity = oldBeaconUse.maxCapacity;
          beaconUse.aircraft.aircraftManufacturer =
            oldBeaconUse.aircraftManufacturer;
          beaconUse.aircraft.principalAirport = oldBeaconUse.principalAirport;
          beaconUse.aircraft.secondaryAirport = oldBeaconUse.secondaryAirport;
          beaconUse.aircraft.registrationMark = oldBeaconUse.registrationMark;
          beaconUse.aircraft.hexAddress = oldBeaconUse.hexAddress;
          beaconUse.aircraft.cnOrMsnNumber = oldBeaconUse.cnOrMsnNumber;
          beaconUse.aircraft.dongle = oldBeaconUse.dongle;
          beaconUse.aircraft.beaconPosition = oldBeaconUse.beaconPosition;

          beaconUse.aircraft.callSign = oldBeaconUse.callSign;
          beaconUse.aircraft.vhfRadio = oldBeaconUse.vhfRadio;
          beaconUse.aircraft.satelliteTelephone =
            oldBeaconUse.satelliteTelephone;
          beaconUse.aircraft.satelliteTelephoneInput =
            oldBeaconUse.satelliteTelephoneInput;
          beaconUse.aircraft.mobileTelephone = oldBeaconUse.mobileTelephone;
          beaconUse.aircraft.mobileTelephoneInput1 =
            oldBeaconUse.mobileTelephoneInput1;
          beaconUse.aircraft.mobileTelephoneInput2 =
            oldBeaconUse.mobileTelephoneInput2;

          beaconUse.aircraft.moreDetails = oldBeaconUse.moreDetails;
          break;
        case Environment.LAND:
          beaconUse.landOther = new LandOther();
          beaconUse.landOther.portableVhfRadio = oldBeaconUse.callSign;
          beaconUse.landOther.portableVhfRadioInput = oldBeaconUse.vhfRadio;
          beaconUse.landOther.satelliteTelephone =
            oldBeaconUse.satelliteTelephone;
          beaconUse.landOther.satelliteTelephoneInput =
            oldBeaconUse.satelliteTelephoneInput;
          beaconUse.landOther.mobileTelephone = oldBeaconUse.mobileTelephone;
          beaconUse.landOther.mobileTelephoneInput1 =
            oldBeaconUse.mobileTelephoneInput1;
          beaconUse.landOther.mobileTelephoneInput2 =
            oldBeaconUse.mobileTelephoneInput2;

          beaconUse.landOther.moreDetails = oldBeaconUse.moreDetails;
          break;
        case Environment.OTHER:
          beaconUse.landOther = new LandOther();
          beaconUse.landOther.portableVhfRadio = oldBeaconUse.callSign;
          beaconUse.landOther.portableVhfRadioInput = oldBeaconUse.vhfRadio;
          beaconUse.landOther.satelliteTelephone =
            oldBeaconUse.satelliteTelephone;
          beaconUse.landOther.satelliteTelephoneInput =
            oldBeaconUse.satelliteTelephoneInput;
          beaconUse.landOther.mobileTelephone = oldBeaconUse.mobileTelephone;
          beaconUse.landOther.mobileTelephoneInput1 =
            oldBeaconUse.mobileTelephoneInput1;
          beaconUse.landOther.mobileTelephoneInput2 =
            oldBeaconUse.mobileTelephoneInput2;

          beaconUse.landOther.moreDetails = oldBeaconUse.moreDetails;
          break;
      }
      beacon.uses.push(beaconUse);
    }

    beacon.owner = new Contact();
    beacon.owner.fullName = registration.ownerFullName;
    beacon.owner.telephoneNumber = registration.ownerTelephoneNumber;
    beacon.owner.alternativeTelephoneNumber =
      registration.ownerAlternativeTelephoneNumber;
    beacon.owner.address = new Address();
    beacon.owner.address.addressLine1 = registration.ownerAddressLine1;
    beacon.owner.address.addressLine2 = registration.ownerAddressLine1;
    beacon.owner.address.townOrCity = registration.ownerTownOrCity;
    beacon.owner.address.county = registration.ownerCounty;
    beacon.owner.address.postcode = registration.ownerPostcode;
    beacon.owner.email = registration.ownerEmail;

    beacon.emergencyContacts = [];

    const emergencyContact1 = new Contact();
    emergencyContact1.fullName = registration.emergencyContact1FullName;
    emergencyContact1.telephoneNumber =
      registration.emergencyContact1TelephoneNumber;
    emergencyContact1.alternativeTelephoneNumber =
      registration.emergencyContact1AlternativeTelephoneNumber;

    beacon.emergencyContacts.push(emergencyContact1);

    const emergencyContact2 = new Contact();
    emergencyContact2.fullName = registration.emergencyContact2FullName;
    emergencyContact2.telephoneNumber =
      registration.emergencyContact2TelephoneNumber;
    emergencyContact2.alternativeTelephoneNumber =
      registration.emergencyContact2AlternativeTelephoneNumber;

    beacon.emergencyContacts.push(emergencyContact2);

    const emergencyContact3 = new Contact();
    emergencyContact3.fullName = registration.emergencyContact3FullName;
    emergencyContact3.telephoneNumber =
      registration.emergencyContact3TelephoneNumber;
    emergencyContact3.alternativeTelephoneNumber =
      registration.emergencyContact3AlternativeTelephoneNumber;

    beacon.emergencyContacts.push(emergencyContact3);

    serializedRegistration.beacons.push(beacon);

    return serializedRegistration;
  }

  public sendRegistration(registration: IRegistration): boolean {
    const serializedRegistration = this.serializeRegistration(registration);
    try {
      axios.post(this.apiUrl, serializedRegistration).then(
        (response) => {
          return response;
        },
        (error) => {
          return error;
        }
      );
    } catch (error) {
      return error;
    }
  }
}
