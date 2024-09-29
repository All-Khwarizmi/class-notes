/// <reference types="cypress" />

export {};
declare global {
  namespace Cypress {
    interface Window {
      Clerk: any;
    }

    interface Chainable {
      /**
       * Custom command to get an element by data-testid attribute
       * @example cy.getByTestId('submit')
       */
      getByTestId: (testId: string) => Chainable<JQuery<HTMLElement>>;
      /**
       * Custom command to sign out
       * @example cy.signOut()
       */
      signOut(): void;
      /**
       * Custom command to sign in
       * @example cy.signIn()
       */
      signIn(): void;
    }
  }
}

Cypress.Commands.add('getByTestId', (testId) => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add(`signIn`, () => {
  cy.log(`Signing in.`);
  // const baseUrl = Cypress.env("CYPRESS_BASE_URL");
  cy.visit('/', {
    timeout: 10000,
    failOnStatusCode: false,
  });

  cy.window()
    .should((window) => {
      expect(window).to.not.have.property(`Clerk`, undefined);
      expect(window.Clerk.isReady()).to.eq(true);
    })
    .then(async (window) => {
      const domain = window.location.hostname;
      cy.clearCookies({ domain });
      const res = await window.Clerk.client.signIn.create({
        identifier: Cypress.env(`TEST_EMAIL`),
        password: Cypress.env(`TEST_PASSWORD`),
      });

      await window.Clerk.setActive({
        session: res.createdSessionId,
      });

      cy.log(`Finished Signing in.`);
    });
});
