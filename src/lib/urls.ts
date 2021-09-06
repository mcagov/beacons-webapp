export const ofcomLicenseUrl =
  "https://www.ofcom.org.uk/manage-your-licence/radiocommunication-licences/ships-radio";

export enum AccountPageURLs {
  signUpOrSignIn = "/account/sign-up-or-sign-in",
  signUp = "/account/sign-up",
  signIn = "/account/sign-in",
  accountHome = "/account/your-beacon-registry-account",
  updateAccount = "/account/update-account",
}

export enum GeneralPageURLs {
  start = "/",
  areYouSure = "/are-you-sure",
}

export enum ErrorPageURLs {
  serverError = "/500",
  unauthenticated = "/unauthenticated",
}

export enum PageURLs {
  checkBeaconDetails = "/register-a-beacon/check-beacon-details",
  beaconInformation = "/register-a-beacon/beacon-information",
  environment = "/register-a-beacon/beacon-use",
  purpose = "/register-a-beacon/purpose",
  activity = "/register-a-beacon/activity",
  aboutTheVessel = "/register-a-beacon/about-the-vessel",
  aboutTheAircraft = "/register-a-beacon/about-the-aircraft",
  vesselCommunications = "/register-a-beacon/vessel-communications",
  aircraftCommunications = "/register-a-beacon/aircraft-communications",
  landCommunications = "/register-a-beacon/land-communications",
  moreDetails = "/register-a-beacon/more-details",
  additionalUse = "/register-a-beacon/additional-beacon-use",
  aboutBeaconOwner = "/register-a-beacon/about-beacon-owner",
  beaconOwnerAddress = "/register-a-beacon/beacon-owner-address",
  emergencyContact = "/register-a-beacon/emergency-contact",
  checkYourAnswers = "/register-a-beacon/check-your-answers",
  applicationComplete = "/register-a-beacon/application-complete",

  deleteRegistration = "/manage-my-registrations/delete",
  deleteRegistrationSuccess = "/manage-my-registrations/delete/success",
  deleteRegistrationFailure = "/manage-my-registrations/delete/failure",
}

export enum UpdatePageURLs {
  registrationSummary = "/manage-my-registrations/update",
  beaconDetails = "/manage-my-registrations/update/details/",
}

export enum ActionURLs {
  deleteCachedUse = "/api/registration/delete-use",
  addNewUseToDraftRegistration = "/api/registration/add-new-use-to-draft",
}

export const queryParams = (queryParams: Record<string, any>): string =>
  "?" + new URLSearchParams(queryParams).toString();
