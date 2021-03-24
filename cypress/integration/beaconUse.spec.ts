import {
  givenIAmAt,
  iCanClickTheBackLinkToGoToPreviousPage,
} from "./common.spec";

describe("As a beacon owner, I want to submit uses for my beacon", () => {
  const previousPageUrl = "register-a-beacon/beacon-information";
  const pageUrl = "/register-a-beacon/beacon-use";

  beforeEach(() => {
    givenIAmAt(pageUrl);
  });

  it("should route to the previous page", () => {
    iCanClickTheBackLinkToGoToPreviousPage(previousPageUrl);
  });
});
