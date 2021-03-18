import { givenIAmAt } from "./common.spec";

describe("As a beacon owner, I want to submit information about my aircraft", () => {
  const thisPageUrl = "/register-a-beacon/about-the-aircraft";
  const nextPageUrl = "/register-a-beacon/vessel-communications";

  beforeEach(() => {
    givenIAmAt(thisPageUrl);
  });
});
