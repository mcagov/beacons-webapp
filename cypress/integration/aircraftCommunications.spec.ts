import {
  givenIAmAt,
  iCanClickTheBackLinkToGoToPreviousPage,
} from "./common.spec";

describe("As a beacon owner, I want to register details about the aircraft communications", () => {
  const pageUrl = "/register-a-beacon/aircraft-communications";
  beforeEach(() => {
    givenIAmAt(pageUrl);
  });

  it("sends me to the previous page when I click the back link", () => {
    iCanClickTheBackLinkToGoToPreviousPage(
      "/register-a-beacon/about-the-aircraft"
    );
  });
});
