import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PhaseBanner } from "./PhaseBanner";

interface PageProps {
  serviceName: string;
  homeLink: string;
  phase: string;
  bannerHtml: JSX.Element;
  children: JSX.Element[];
}

export const Page: React.FC<PageProps> = (props: PageProps): JSX.Element => (
  <React.Fragment>
    <Header homeLink={props.homeLink} serviceName={props.serviceName} />
    <PhaseBanner phase={props.phase} bannerHtml={props.bannerHtml} />
    {props.children}
    <Footer />
  </React.Fragment>
);
