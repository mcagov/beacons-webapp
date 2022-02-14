import React from "react";
import { Panel } from "./Panel";

export const PanelSucceeded = (props: {
  title: string;
  reference: string;
  confirmationEmailSuccess: boolean;
}): JSX.Element => (
  <Panel title={props.title} reference={props.reference}>
    {props.confirmationEmailSuccess
      ? "We have sent you a confirmation email."
      : "We could not send you a confirmation email but we have registered your beacon under the following reference id."}
  </Panel>
);
