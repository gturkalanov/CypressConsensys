const { defineConfig } = require('cypress')

module.exports = defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  projectId: "vfa2gi",
  e2e: {
    setupNodeEvents(on, config) {
      
    },
  },
})