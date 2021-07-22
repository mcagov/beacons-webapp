import { IAppContainer } from "../lib/appContainer";
import { IRegistration } from "../lib/registration/types";

export interface ISubmitRegistrationResult {
  beaconRegistered: boolean;
  confirmationEmailSent: boolean;
  referenceNumber: string;
}

export const submitRegistration =
  ({
    sendConfirmationEmail,
    getAccessToken,
    beaconsApiGateway,
    accountHolderApiGateway,
  }: IAppContainer) =>
  async (
    registration: IRegistration,
    accountHolderId: string
  ): Promise<ISubmitRegistrationResult> => {
    const accessToken = await getAccessToken();

    const registrationWithReferenceNumberAndAccountHolder = {
      ...registration,
      referenceNumber: referenceNumber("A#", 7),
      accountHolderId: accountHolderId,
    };

    const beaconRegistered = await beaconsApiGateway.sendRegistration(
      registrationWithReferenceNumberAndAccountHolder,
      accessToken
    );

    const { email: accountHolderEmail } =
      await accountHolderApiGateway.getAccountHolderDetails(
        accountHolderId,
        accessToken
      );

    const confirmationEmailSent = beaconRegistered
      ? await sendConfirmationEmail(
          registrationWithReferenceNumberAndAccountHolder,
          accountHolderEmail
        )
      : false;

    return {
      beaconRegistered,
      confirmationEmailSent,
      referenceNumber: beaconRegistered
        ? registrationWithReferenceNumberAndAccountHolder.referenceNumber
        : "",
    };
  };

const referenceNumber = (chars: string, length: number): string => {
  let mask = "";
  if (chars.indexOf("a") > -1) mask += "abcdefghijklmnopqrstuvwxyz";
  if (chars.indexOf("A") > -1) mask += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (chars.indexOf("#") > -1) mask += "0123456789";
  if (chars.indexOf("!") > -1) mask += "~`!@#$%^&*()_+-={}[]:\";'<>?,./|\\";
  let result = "";
  for (let i = length; i > 0; --i)
    result += mask[Math.floor(Math.random() * mask.length)];
  return result;
};
