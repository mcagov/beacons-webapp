import { GetServerSideProps } from "next";
import React, { FunctionComponent } from "react";
import { ReturnToYourAccountSection } from "../../components/domain/ReturnToYourAccountSection";
import { Grid } from "../../components/Grid";
import { Layout } from "../../components/Layout";
import { Panel } from "../../components/Panel";
import { GovUKBody } from "../../components/Typography";
import { DraftRegistration } from "../../entities/DraftRegistration";
import { verifyFormSubmissionCookieIsSet } from "../../lib/cookies";
import { clearFormSubmissionCookie } from "../../lib/middleware";
import { BeaconsGetServerSidePropsContext } from "../../lib/middleware/BeaconsGetServerSidePropsContext";
import { withContainer } from "../../lib/middleware/withContainer";
import { withSession } from "../../lib/middleware/withSession";
import { redirectUserTo } from "../../lib/redirectUserTo";
import { formSubmissionCookieId } from "../../lib/types";
import { GeneralPageURLs } from "../../lib/urls";
import { WhenUserIsNotSignedIn_ThenShowAnUnauthenticatedError } from "../../router/rules/WhenUserIsNotSignedIn_ThenShowAnUnauthenticatedError";
import { ISubmitRegistrationResult } from "../../useCases/submitRegistration";

interface ApplicationCompleteProps {
  reference: string;
  pageSubHeading: string;
}

const ApplicationCompletePage: FunctionComponent<ApplicationCompleteProps> = ({
  reference,
  pageSubHeading,
}: ApplicationCompleteProps): JSX.Element => {
  const pageHeading = "Beacon Registration Complete";

  return (
    <>
      <Layout
        title={pageHeading}
        pageHasErrors={false}
        showCookieBanner={false}
      >
        <Grid
          mainContent={
            <>
              <Panel title={pageHeading} reference={reference}>
                {pageSubHeading}
              </Panel>
              <GovUKBody className="govuk-body">
                Your application to register a UK 406 MHz beacon has been
                received by the Maritime and Coastguard Beacon Registry Team.
                You can now use your Beacon.
              </GovUKBody>
              <ReturnToYourAccountSection />
            </>
          }
        />
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSession(
  withContainer(async (context: BeaconsGetServerSidePropsContext) => {
    const rule = new WhenUserIsNotSignedIn_ThenShowAnUnauthenticatedError(
      context
    );

    if (await rule.condition()) {
      return rule.action();
    }
    /* Retrieve injected use case(s) */
    const { getDraftRegistration, submitRegistration, getAccountHolderId } =
      context.container;

    /* Page logic */
    if (!verifyFormSubmissionCookieIsSet(context))
      return redirectUserTo(GeneralPageURLs.start);

    try {
      const draftRegistration: DraftRegistration = await getDraftRegistration(
        context.req.cookies[formSubmissionCookieId]
      );

      const result = await submitRegistration(
        draftRegistration,
        await getAccountHolderId(context.session)
      );

      const pageSubHeading = (result: ISubmitRegistrationResult) => {
        if (result.beaconRegistered && result.confirmationEmailSent)
          return "We have sent you a confirmation email.";
        if (result.beaconRegistered && !result.confirmationEmailSent)
          return "We could not send you a confirmation email. But we have registered your beacon under the following reference id.";
        return "We could not save your registration or send you a confirmation email. Please contact the Beacons Registry team.";
      };

      clearFormSubmissionCookie(context);

      return {
        props: {
          reference: result.referenceNumber,
          pageSubHeading: pageSubHeading(result),
        },
      };
    } catch {
      return {
        props: {
          reference: "",
          pageSubHeading:
            "There was an error while registering your beacon.  Please contact the Beacons Registry team.",
        },
      };
    }
  })
);

export default ApplicationCompletePage;
