describe("Authentication Flow", () => {
  beforeEach(() => {
    cy.session("signed-in", () => {
      cy.signIn();
    });
  });

  context("Should be able to avigate to classes dashboard", () => {
    it("navigate to the classe's dashboard", () => {
      cy.visit("/classes", {
        timeout: 10000,
        failOnStatusCode: false,
      });

      cy.get("h1").should("contain", "Vos classes", {
        timeout: 10000,
      });
    });
  });

  //   context("Should be able to sign out", () => {
  //     it("should sign out", () => {
  //       cy.visit("/", {
  //         timeout: 10000,
  //         failOnStatusCode: false,
  //       });
  //       cy.signOut();

  //       cy.find("button").contains("Sign in").eq(0).should("exist");
  //     });
  //   });
});
