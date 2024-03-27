import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    responseTimeout: 10000,
    baseUrl: "https://class-notes-git-dev-jasonsuarez.vercel.app/",
  },
});
