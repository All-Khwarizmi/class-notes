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
    // cy.origin("https://pleasant-killdeer-34.accounts.dev", () => {
    //   const signupButton = cy.get("a").should("have.text", "Sign up");
    //   signupButton.click({ multiple: true });
    //   const email = cy.get("input[type='email']").should("exist");
    //   const password = cy.get("input[type='password']").should("exist");
    //   const submitButton = cy
    //     .get("button")
    //     .should("have.class", "cl-formButtonPrimary");

    //   email.type("example@clerk.dev");
    //   password.type("clerkpassword1234");
    //   submitButton.click({ multiple: true });
    // });
  });
});
