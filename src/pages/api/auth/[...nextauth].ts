import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import { NextApiHandler } from "next-auth/internals/utils";
import { toArray } from "../../../lib/utils";

const tenantName = process.env.AZURE_B2C_TENANT_NAME;
const tenantId = process.env.AZURE_B2C_TENANT_ID;
const userFlow = process.env.AZURE_B2C_LOGIN_FLOW;
const clientId = process.env.AZURE_B2C_CLIENT_ID;
const clientSecret = process.env.AZURE_B2C_CLIENT_SECRET;

const accessTokenUrl = `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${userFlow}/oauth2/v2.0/token`;
const requestTokenUrl = `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${userFlow}/oauth2/v2.0/token`;
const authorizationUrl = `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${userFlow}/oauth2/v2.0/authorize?response_type=code+id_token&response_mode=form_post`;

const options: NextAuthOptions = {
  session: {
    jwt: true,
  },
  jwt: {
    encryption: true,
    secret: process.env.JWT_SECRET,
  },
  secret: process.env.JWT_SECRET,
  debug: true,
  providers: [
    {
      id: "azureb2c",
      name: "Azure B2C",
      type: "oauth",
      version: "2.0",
      scope: "offline_access openid",
      params: {
        grant_type: "authorization_code",
      },
      accessTokenUrl,
      requestTokenUrl,
      authorizationUrl,
      profileUrl: "https://graph.microsoft.com/oidc/userinfo",
      profile: (profile) => {
        const emails = toArray(profile.emails as any);

        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: emails[0],
        };
      },
      clientId,
      clientSecret,
      tenantId,
      idToken: true,
      protection: "none", // see: https://github.com/nextauthjs/next-auth/issues/468#issuecomment-663769334.  Next Auth uses Double
    },
  ],
  callbacks: {
    session: async (session, profile) => {
      session.user["id"] = profile.sub;
      console.log(session);
      return session;
    },
  },
};

export default (
  req: NextApiRequest,
  res: NextApiResponse
): ReturnType<NextApiHandler> => NextAuth(req, res, options);
