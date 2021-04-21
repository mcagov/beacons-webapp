// See: https://jestjs.io/docs/en/configuration for a full list of configuration options
import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/cypress", "/test"],
};

export default config;
