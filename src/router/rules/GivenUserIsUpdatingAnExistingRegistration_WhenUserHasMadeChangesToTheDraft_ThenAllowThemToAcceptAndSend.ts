import { isEqual } from "lodash";
import { GetServerSidePropsResult } from "next";
import { DraftRegistration } from "../../entities/DraftRegistration";
import { Registration } from "../../entities/Registration";
import { showCookieBanner } from "../../lib/cookies";
import { BeaconsGetServerSidePropsContext } from "../../lib/middleware/BeaconsGetServerSidePropsContext";
import { Rule } from "./Rule";

export class GivenUserIsUpdatingAnExistingRegistration_WhenUserHasMadeChangesToTheDraft_ThenAllowThemToAcceptAndSend<
  T
> implements Rule
{
  private readonly context: BeaconsGetServerSidePropsContext;
  private readonly registrationId: string;
  private readonly props: T;

  constructor(
    context: BeaconsGetServerSidePropsContext,
    registrationId: string,
    props?: T
  ) {
    this.context = context;
    this.registrationId = registrationId;
    this.props = props;
  }

  public async condition(): Promise<boolean> {
    const {
      getAccountHoldersRegistration,
      getDraftRegistration,
      getAccountHolderId,
    } = this.context.container;

    const registrationId: string = this.context.query.id as string;

    const draftRegistration: DraftRegistration = await getDraftRegistration(
      registrationId
    );

    if (!draftRegistration) return false;

    const accountHolderId: string = await getAccountHolderId(
      this.context.session
    );

    const existingRegistration: Registration =
      await getAccountHoldersRegistration(registrationId, accountHolderId);

    return !isEqual(existingRegistration, draftRegistration);
  }

  public async action(): Promise<GetServerSidePropsResult<any>> {
    return {
      props: {
        showCookieBanner: showCookieBanner(this.context),
        userHasEdited: true,
        ...(await this.props),
      },
    };
  }
}