const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    "baseUrl": "https://editorielle-fe-uat.vercel.app/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
