import { GetServerSidePropsContext } from "next";
import { Session } from "../gateways/userSessionGateway";
import { BeaconsGetServerSidePropsContext } from "../lib/container";

export type GetSessionFn = (
  context: BeaconsGetServerSidePropsContext
) => Promise<Session>;

export const getSession =
  ({ userSessionGateway }): GetSessionFn =>
  async (context: GetServerSidePropsContext) => {
    return await userSessionGateway.getSession(context);
  };
