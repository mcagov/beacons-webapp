import { signIn } from "next-auth/client";
import React from "react";
import { Grid } from "../../components/Grid";
import { Layout } from "../../components/Layout";

const SignIn = () => (
  <Layout title="Sign in to Beacons Registry Service" showCookieBanner={false}>
    <Grid
      mainContent={
        <>
          <button
            onClick={() =>
              signIn("azureb2c", {
                callbackUrl: "http://localhost:3000",
              })
            }
          >
            Sign in
          </button>
        </>
      }
    />
  </Layout>
);

export default SignIn;
