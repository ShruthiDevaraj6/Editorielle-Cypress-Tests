// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('login', (username, password) => {
    cy.visit('/account/signin');
        cy.get('[data-cy="email"]').type(username)
        cy.get('[data-cy="password"]').type(password)
        cy.get('[data-cy="submit-button"]').click()
        cy.url().should('include','/individual/dashboard/home/plan')
})
Cypress.Commands.add('loginTeam', (username, password) => {
    cy.visit('/account/signin');
        cy.get('[data-cy="email"]').type(username)
        cy.get('[data-cy="password"]').type(password)
        cy.get('[data-cy="submit-button"]').click()
        
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
