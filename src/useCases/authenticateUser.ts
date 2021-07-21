import { GetServerSidePropsContext } from "next";
import { IBasicAuthGateway } from "../gateways/basicAuthGateway";
import { appContainer, IAppContainer } from "../lib/appContainer";

export const authenticateUser =
  ({ basicAuthGateway }: Partial<IAppContainer> = appContainer) =>
  async (context: GetServerSidePropsContext): Promise<void> => {
    await basicAuthGateway.authenticate(context.req, context.res);
  };

/* Legacy -- delete once not used */

export interface IAuthenticateUser {
  execute: (context: GetServerSidePropsContext) => Promise<void>;
}

export class AuthenticateUser implements IAuthenticateUser {
  private gateway: IBasicAuthGateway;

  constructor(basicAuthGateway: IBasicAuthGateway) {
    this.gateway = basicAuthGateway;
  }

  async execute(context: GetServerSidePropsContext): Promise<void> {
    await this.gateway.authenticate(context.req, context.res);
  }
}
