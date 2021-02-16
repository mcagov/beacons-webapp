import React, { FunctionComponent } from "react";
import Aside from "../components/Aside";
import { StartButton } from "../components/Button";
import { Grid } from "../components/Grid";
import { InsetText } from "../components/InsetText";
import { Layout } from "../components/Layout";
import { BreadcrumbList, BreadcrumbListItem } from "../components/Breadcrumb";
import { McaLogo } from "../components/Mca";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { setFormSubmissionCookie } from "../lib/middleware";
import {
  AnchorLink,
  GovUKBody,
  GovUKBulletedList,
  GovUKList,
  PageHeading,
} from "../components/Typography";
import { WarningText } from "../components/WarningText";

const ServiceStartPage: FunctionComponent = () => (
  <>
    <Layout navigation={<Breadcrumbs />}>
      <Grid
        mainContent={
          <>
            <PageHeading>
              Register a single UK 406MHz Personal Locator Beacon (PLB) for
              maritime use
            </PageHeading>
            <AboutTheService />
            <OtherWaysToAccessTheService />
            <DataProtection />
          </>
        }
        aside={<RelatedContent />}
      />
    </Layout>
  </>
);

const Breadcrumbs: FunctionComponent = () => (
  <BreadcrumbList>
    <BreadcrumbListItem>Home</BreadcrumbListItem>
    <BreadcrumbListItem>Section</BreadcrumbListItem>
    <BreadcrumbListItem>Subsection</BreadcrumbListItem>
  </BreadcrumbList>
);

const AboutTheService: FunctionComponent = () => (
  <>
    <p className="govuk-body">Use this service to:</p>

    <GovUKBulletedList>
      <li>
        Register a single new 406 Megahertz (MHz) Personal Locator Beacon (PLB)
        for use on maritime vessels
      </li>
    </GovUKBulletedList>

    <GovUKBody>Registering takes around 10 minutes.</GovUKBody>

    <GovUKBody>
      This service is only for UK programmed 406MHz beacons. You can contact the
      UK Beacon Registry if you aren{"'"}t sure if your beacon is 406MHz or not.
    </GovUKBody>

    <WarningText>
      <>
        You cannot register a beacon for non-maritime use through this service.
        You can use another service to{" "}
        <AnchorLink href="https://forms.dft.gov.uk/mca-sar-epirb/">
          register a beacon for aircraft or land-based use.
        </AnchorLink>
      </>
    </WarningText>

    <h2 className="govuk-heading-m">Before you start</h2>

    <GovUKBulletedList>
      <li>
        You will need to know the beacon HEX ID, manufacturer serial number and
        model
      </li>
      <li>
        If you have a vessel, you will need your vessel name, number, radio
        communications, call sign and MMSI number
      </li>
      <li>
        You will also need emergency contact details for Search and Rescue
      </li>
    </GovUKBulletedList>

    <StartButton href="/register-a-beacon/check-beacon-details" />
  </>
);

const RelatedContent: FunctionComponent = () => (
  <>
    <Aside>
      <McaLogo />
    </Aside>
  </>
);

const OtherWaysToAccessTheService: FunctionComponent = () => (
  <>
    <h2 className="govuk-heading-m">Other ways to apply</h2>

    <GovUKBody>
      If you need help with registering online or would like to register by
      post, contact the UK Beacon Registry team.
    </GovUKBody>

    <InsetText>
      <>
        <GovUKList>
          <li className="govuk-!-font-weight-bold">The UK Beacon Registry</li>
          <li>
            <AnchorLink href="mailto:ukbeacons@mcga.gov.uk">
              ukbeacons@mcga.gov.uk
            </AnchorLink>
          </li>
          <li>Telephone: +44 (0)20 3817 2006</li>
          <li>Fax: 01326 319264</li>
          <li>Monday to Friday, 9am to 5pm (except public holidays)</li>
          <li>
            <AnchorLink href="#">Find out about call charges</AnchorLink>
          </li>
        </GovUKList>
      </>
    </InsetText>
  </>
);

const DataProtection: FunctionComponent = () => (
  <>
    <h2 className="govuk-heading-m">Data protection regulations</h2>

    <GovUKBody>
      Agency (MCA) collect and retain the personal information provided when you
      register a UK programmed 406 MHz beacon. Processing your information
      allows the MCA to exercise its official duty and to identify persons in
      distress and helps save lives.
    </GovUKBody>

    <GovUKBody>
      We will retain your information until we are advised that the beacon is no
      longer active, for example it has been removed from the vessel, replaced
      or destroyed.
    </GovUKBody>

    <GovUKBody>
      We will share your information with global Search {"&"} Rescue authorities
      and those delegated authorities, such as RNLI, Police or Rescue helicopter
      crew, that are directly involved with investigations relating to a beacon
      activation.
    </GovUKBody>

    <GovUKBody>
      Further details on Beacon Registration’s privacy policy can be found at{" "}
      <AnchorLink href="https://www.gov.uk/mca/privacy-policy#mhz-beacons-privacy-information-notice">
        https://www.gov.uk/mca/privacy-policy#mhz-beacons-privacy-information-notice
      </AnchorLink>
    </GovUKBody>

    <GovUKBody>
      To find out more about how the MCA looks after personal data, your rights,
      and how to contact our data protection officer, please go to{" "}
      <AnchorLink href="https://www.gov.uk/mca/privacy-policy">
        www.gov.uk/mca/privacy-policy
      </AnchorLink>
    </GovUKBody>
  </>
);

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  setFormSubmissionCookie(context);

  return { props: {} };
};

export default ServiceStartPage;
