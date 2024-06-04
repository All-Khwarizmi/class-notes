describe("User onboarding flow", () => {
  beforeEach(() => {
    cy.session("signed-in", () => {
      cy.signIn();
    });
  });

  context("Redirect to dashboard after signing in", () => {
    it("Once loggedin the user should be redirected to the dashaboard page", () => {
      cy.visit("/", {
        failOnStatusCode: false,
      });
      cy.url().should("include", "/dashboard");
      cy.getByTestId("dashboard").should("exist");
    });
  });

  context("User form", () => {
    it("should open the user form", () => {
      cy.visit("/profile", {
        failOnStatusCode: false,
        timeout: 10000,
      });
      cy.getByTestId("user-form").should("exist", { timeout: 10000 });
    });

    context("Onboarding form validation", () => {
      // it("should display error message if name is empty", () => {
      //   cy.visit("/profile", {
      //     failOnStatusCode: false,
      //     timeout: 10000,
      //   });
      //   const matiereInput = cy.getByTestId("matiere-input");
      //   matiereInput.should("exist");
      //   matiereInput.type("Maths");
      //   matiereInput.should("have.value", "Maths");

      //   cy.getByTestId("submit-onboarding-form").click();
      //   cy.getByTestId("user-form").should("exist");
      //   cy.getByTestId("name-input").should("have.attr", "aria-invalid");
      //   cy.getByTestId("name-input").should("have.attr", "aria-describedby");
      //   cy.getByTestId("name-input").should("have.attr", "aria-describedby");
      //   cy.getByTestId("name-input").should("have.attr", "aria-invalid");
      // });

      it("should display error message if matiere is empty", () => {
        cy.visit("/profile", {
          failOnStatusCode: false,
          timeout: 10000,
        });
        const nameInput = cy.getByTestId("name-input");
        nameInput.should("exist");
        nameInput.clear();
        nameInput.type("John Doe");
        nameInput.should("have.value", "John Doe");

        cy.getByTestId("submit-onboarding-form").click();
        cy.getByTestId("user-form").should("exist");
        cy.getByTestId("matiere-input").should("have.attr", "aria-invalid");
        cy.getByTestId("matiere-input").should("have.attr", "aria-describedby");
        cy.getByTestId("matiere-input").should("have.attr", "aria-describedby");
        cy.getByTestId("matiere-input").should("have.attr", "aria-invalid");
      });
    });

    // context("Form completion", () => {
    //   it("should be able to fill the form and submit it", () => {
    //     cy.visit("/profile", {
    //       failOnStatusCode: false,
    //       timeout: 10000,
    //     });
    //     const matiereInput = cy.getByTestId("matiere-input");
    //     matiereInput.should("exist");
    //     matiereInput.clear();
    //     matiereInput.type("Maths");
    //     matiereInput.should("have.value", "Maths");

    //     const nameInput = cy.getByTestId("name-input");
    //     nameInput.should("exist");
    //     nameInput.clear();  
    //     nameInput.type("John Doe");
    //     nameInput.should("have.value", "John Doe");

    //     cy.getByTestId("submit-onboarding-form").click();
    //   });
    // });

    // it("should not open onboarding form if user is onboarded", () => {
    //   cy.session("signed-in", () => {
    //     cy.signIn();
    //   });
    //   cy.visit("/dashboard", {
    //     failOnStatusCode: false,
    //   });
    //   cy.getByTestId("onboarding-form").should("not.exist");
    // });
  });
});
