import { GetServerSideProps } from "next";
import React, { FunctionComponent } from "react";
import { ReturnToYourAccountSection } from "../../components/domain/ReturnToYourAccountSection";
import { Grid } from "../../components/Grid";
import { Layout } from "../../components/Layout";
import { BeaconRegistryContactInfo } from "../../components/Mca";
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

interface ApplicationCompleteProps {
  reference: string;
  registrationSuccess: boolean;
  confirmationEmailSuccess: boolean;
}

const ApplicationCompletePage: FunctionComponent<ApplicationCompleteProps> = ({
  reference,
  registrationSuccess,
  confirmationEmailSuccess,
}: ApplicationCompleteProps): JSX.Element => {
  const pageHeading = registrationSuccess
    ? "Beacon registration complete"
    : "Beacon registration failed";

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
              {registrationSuccess ? (
                <>
                  <ApplicationSuccessMessage
                    title={pageHeading}
                    confirmationEmailSuccess={confirmationEmailSuccess}
                    reference={reference}
                  />
                  <GovUKBody className="govuk-body">
                    Your application to register a UK 406 MHz beacon has been
                    received by the Maritime and Coastguard Beacon Registry
                    Team. You can now use your beacon.
                  </GovUKBody>
                </>
              ) : (
                <>
                  <ApplicationFailedMessage title={pageHeading} />
                  <BeaconRegistryContactInfo />
                </>
              )}

              <ReturnToYourAccountSection />
            </>
          }
        />
      </Layout>
    </>
  );
};

const ApplicationSuccessMessage = (props: {
  title: string;
  reference: string;
  confirmationEmailSuccess: boolean;
}): JSX.Element => (
  <Panel title={props.title} reference={props.reference}>
    {props.confirmationEmailSuccess
      ? "We have sent you a confirmation email."
      : "We could not send you a confirmation email. But we have registered your beacon under the following reference id."}
  </Panel>
);

const ApplicationFailedMessage = (props: { title: string }) => (
  <Panel title={props.title}>
    {
      "We could not save your registration or send you a confirmation email. Please contact the Beacons Registry team."
    }
  </Panel>
);

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

      clearFormSubmissionCookie(context);

      return {
        props: {
          reference: result.referenceNumber,
          registrationSuccess: result.beaconRegistered,
          confirmationEmailSuccess: result.confirmationEmailSent,
        },
      };
    } catch {
      return {
        props: {
          registrationSuccess: false,
          confirmationEmailSuccess: false,
        },
      };
    }
  })
);

export default ApplicationCompletePage;
