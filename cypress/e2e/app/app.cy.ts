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
