import { Beacon } from "../../entities/Beacon";
import { EmergencyContact } from "../../entities/EmergencyContact";
import { EntityLink } from "../../entities/EntityLink";
import { Owner } from "../../entities/Owner";
import { Use } from "../../entities/Use";
import { isoDate } from "../../lib/dateTime";
import { IBeaconDataAttributes } from "./IBeaconDataAttributes";
import { IBeaconListResponse } from "./IBeaconListResponse";
import { IBeaconResponseMapper } from "./IBeaconResponseMapper";

export class BeaconsApiResponseMapper implements IBeaconResponseMapper {
  public mapList(beaconApiResponse: IBeaconListResponse): Beacon[] {
    return beaconApiResponse.data.map((beacon) => {
      return {
        id: beacon.id,
        hexId: beacon.attributes.hexId,
        type: beacon.attributes.type || "",
        manufacturer: beacon.attributes.manufacturer || "",
        model: beacon.attributes.model || "",
        status: beacon.attributes.status || "",
        registeredDate: isoDate(beacon.attributes.createdDate || ""),
        batteryExpiryDate: isoDate(beacon.attributes.batteryExpiryDate || ""),
        chkCode: beacon.attributes.chkCode || "",
        protocolCode: beacon.attributes.protocolCode || "",
        codingMethod: beacon.attributes.codingMethod || "",
        lastServicedDate: isoDate(beacon.attributes.lastServicedDate || ""),
        manufacturerSerialNumber:
          beacon.attributes.manufacturerSerialNumber || "",
        owners: this.mapOwners(beaconApiResponse, beacon),
        emergencyContacts: this.mapEmergencyContacts(beaconApiResponse, beacon),
        uses: this.mapUses(beaconApiResponse, beacon),
        entityLinks: this.mapLinks(beacon.links),
      };
    });
  }

  private mapLinks(links: EntityLink[]): EntityLink[] {
    return links.map((link) => {
      return { verb: link.verb, path: link.path };
    });
  }

  private mapOwners(
    beaconApiResponse: IBeaconListResponse,
    beacon: IBeaconDataAttributes
  ): Owner[] {
    const ownerIds = beacon.relationships.owner.data.map((owner) => owner.id);

    return ownerIds.map((ownerId) => {
      const owner = beaconApiResponse.included.find(
        (entity) => entity.type === "beaconPerson" && entity.id === ownerId
      );

      if (!owner)
        throw ReferenceError(`Owner: ${ownerId} is defined as a relationship but not found in "included".  This is 
      likely to be a problem with the API response`);

      return {
        id: owner.id,
        fullName: owner.attributes.fullName || "",
        email: owner.attributes.email || "",
        telephoneNumber: owner.attributes.telephoneNumber || "",
        addressLine1: owner.attributes.addressLine1 || "",
        addressLine2: owner.attributes.addressLine2 || "",
        townOrCity: owner.attributes.townOrCity || "",
        county: owner.attributes.county || "",
        postcode: owner.attributes.postcode || "",
      };
    });
  }

  private mapEmergencyContacts(
    beaconApiResponse: IBeaconListResponse,
    beacon: IBeaconDataAttributes
  ): EmergencyContact[] {
    const emergencyContactIds = beacon.relationships.emergencyContacts.data.map(
      (relationship) => relationship.id
    );

    return emergencyContactIds.map((emergencyContactId) => {
      const emergencyContact = beaconApiResponse.included.find(
        (entity) =>
          entity.type === "beaconPerson" && entity.id === emergencyContactId
      );

      if (!emergencyContact)
        throw ReferenceError(`Emergency contact: ${emergencyContactId} is defined as a relationship but not found in "included".  This is 
      likely to be a problem with the API response`);

      return {
        id: emergencyContactId,
        fullName: emergencyContact.attributes.fullName || "",
        telephoneNumber: emergencyContact.attributes.telephoneNumber || "",
        alternativeTelephoneNumber:
          emergencyContact.attributes.alternativeTelephoneNumber || "",
      };
    });
  }

  private mapUses(
    beaconApiResponse: IBeaconListResponse,
    beacon: IBeaconDataAttributes
  ): Use[] {
    return beaconApiResponse.included
      .filter((entity) => entity !== null)
      .filter((entity) => entity.type === "beaconUse")
      .filter((entity) =>
        beacon.relationships.uses.data.map((rel) => rel.id).includes(entity.id)
      )
      .map((use) => ({
        id: use.id,
        environment: use.attributes.environment || "",
        purpose: use.attributes.purpose || "",
        activity: use.attributes.activity || "",
        otherActivity: use.attributes.otherActivity || "",
        moreDetails: use.attributes.moreDetails || "",
        callSign: use.attributes.callSign || "",
        vhfRadio: use.attributes.vhfRadio || "",
        fixedVhfRadio: use.attributes.fixedVhfRadio || "",
        fixedVhfRadioValue: use.attributes.fixedVhfRadioValue || "",
        portableVhfRadio: use.attributes.portableVhfRadio || "",
        portableVhfRadioValue: use.attributes.portableVhfRadioValue || "",
        satelliteTelephone: use.attributes.satelliteTelephone || "",
        satelliteTelephoneValue: use.attributes.satelliteTelephoneValue || "",
        mobileTelephone: use.attributes.mobileTelephone || "",
        mobileTelephone1: use.attributes.mobileTelephone1 || "",
        mobileTelephone2: use.attributes.mobileTelephone2 || "",
        otherCommunication: use.attributes.otherCommunication || "",
        otherCommunicationValue: use.attributes.otherCommunicationValue || "",
        maxCapacity: use.attributes.maxCapacity || "",
        vesselName: use.attributes.vesselName || "",
        portLetterNumber: use.attributes.portLetterNumber || "",
        homeport: use.attributes.homeport || "",
        areaOfOperation: use.attributes.areaOfOperation || "",
        beaconLocation: use.attributes.beaconLocation || "",
        imoNumber: use.attributes.imoNumber || "",
        ssrNumber: use.attributes.ssrNumber || "",
        rssNumber: use.attributes.rssNumber || "",
        officialNumber: use.attributes.officialNumber || "",
        rigPlatformLocation: use.attributes.rigPlatformLocation || "",
        aircraftManufacturer: use.attributes.aircraftManufacturer || "",
        principalAirport: use.attributes.principalAirport || "",
        secondaryAirport: use.attributes.secondaryAirport || "",
        registrationMark: use.attributes.registrationMark || "",
        hexAddress: use.attributes.hexAddress || "",
        cnOrMsnNumber: use.attributes.cnOrMsnNumber || "",
        dongle: use.attributes.dongle,
        beaconPosition: use.attributes.beaconPosition || "",
        workingRemotelyLocation: use.attributes.workingRemotelyLocation || "",
        workingRemotelyPeopleCount:
          use.attributes.workingRemotelyPeopleCount || "",
        windfarmLocation: use.attributes.windfarmLocation || "",
        windfarmPeopleCount: use.attributes.windfarmPeopleCount || "",
        otherActivityLocation: use.attributes.otherActivityLocation || "",
        otherActivityPeopleCount: use.attributes.otherActivityPeopleCount || "",
        mainUse: use.attributes.mainUse,
        entityLinks: this.mapLinks(use.links),
      }))
      .sort((firstUse, secondUse) => this.mainUseSortFn(firstUse, secondUse));
  }

  private mainUseSortFn(firstUse: Use, secondUse: Use): number {
    const firstUseMainUseAsNumber: number = +firstUse.mainUse;
    const secondUseMainUseAsNumber: number = +secondUse.mainUse;
    return secondUseMainUseAsNumber - firstUseMainUseAsNumber;
  }
}
