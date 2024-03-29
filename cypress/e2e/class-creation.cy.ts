import { faker } from "@faker-js/faker";

describe("Signed in", () => {
  beforeEach(() => {
    cy.session("signed-in", () => {
      cy.signIn();
    });
  });
  // const baseUrl = Cypress.env("CYPRESS_BASE_URL");

  context("Should be able to create a class", () => {
    it("should create a class", () => {
      // open dashboard page
      cy.visit(`/classes`, {
        timeout: 10000,
        failOnStatusCode: false,
      });
      const className = faker.airline.airline().name;
      const classDescription = faker.lorem.sentence();

      cy.getByTestId("add-class").should("exist").click();
      const classNameInput = cy.getByTestId("class-name-input");
      classNameInput.should("exist").type(className);
      classNameInput.should("have.value", className);

      const classDescriptionInput = cy.getByTestId("class-description-input");
      classDescriptionInput.should("exist").clear().type(classDescription);
      classDescriptionInput.should("have.value", classDescription);

      const classImageUrlInput = cy.getByTestId("class-image-url-input");
      classImageUrlInput
        .should("exist")
        .clear()
        .type("https://picsum.photos/200/300");
      classImageUrlInput.should("have.value", "https://picsum.photos/200/300");

      const submitButton = cy.getByTestId("submit-class");
      submitButton.should("exist").click();

      const table = cy.get("table");
      table.should("exist");
      table.find("tr").eq(-1).should("contain", className);
    });
  });

  //! TODO
  // context("Should be able to delete a class", () => {
  //   it("should delete a class", () => {
  //     // open dashboard page
  //     cy.visit("/classes", {
  //       timeout: 10000,
  //       failOnStatusCode: false,
  //     });

  //     const table = cy.get("table");
  //     table.should("exist");
  //     const rows = table.find("tr");
  //     const lastRow = rows.eq(-1);
  //     const className = lastRow.find("td").eq(0).text();
  //     lastRow.find("button").click();

  //     const tableAfterDelete = cy.get("table");
  //     tableAfterDelete.should("exist");
  //     tableAfterDelete.find("tr").should("not.contain", className);
  //   });
  // });
});
