describe("Landing Page", () => {
  it("should display the landing page", () => {
    cy.visit("/", {
      timeout: 10000,
      failOnStatusCode: false,
    });
    cy.get("h1").should("contain", "ClassAI", {
      timeout: 10000,
    });
  });
});

describe("Signed in", () => {
  beforeEach(() => {
    cy.session("signed-in", () => {
      cy.signIn();
    });
  });

  it("navigate to the classe's dashboard", () => {
    // open dashboard page
    cy.visit("/classes", {
      timeout: 10000,
      failOnStatusCode: false,
    });

    cy.get("h1").should("contain", "Vos classes", {
      timeout: 10000,
    });
   
  });
});
