const data = require ('C:/Users/Shruthi Devaraj/Cypress Automation Editorelle Project/cypress/fixtures/editorelle.json')

import {homePage,teamSignUp} from "../support/selectors"
import EmailGenerator from '../support/utils';
describe('Invite team members functionality scenarios', () =>{
    let userdata;
    beforeEach(()=> {
        cy.visit("/")
        cy.get(homePage.signUpButtonTeam).click()
        cy.fixture('editorelle.json').then((data)=>{
         userdata=data
        cy.get(teamSignUp.firstName).type(userdata.firstname)
        cy.get(teamSignUp.lastName).type(userdata.lastname)
        cy.get(teamSignUp.email).type(EmailGenerator.generateRandomEmail())
        cy.get(teamSignUp.businessName).type(userdata.businessName)
        cy.get(teamSignUp.password).type(userdata.password)
        cy.get(teamSignUp.reEnterPassword).type(userdata.password)
        cy.get(teamSignUp.checkbox).click()
        cy.get(teamSignUp.createAccountbtn).click()
        cy.url().should('include','/team/account/signup-verification')
        const otp = '123456';
        for (let i = 0; i < otp.length; i++) {
        const selector = `[data-cy="otp-input-${i + 1}"]`;
        cy.get(selector).type(otp[i]);
        }
        cy.wait(5000)
        cy.get(teamSignUp.myselfBtn).click()
        cy.get(teamSignUp.businessNextBtn).click()
        })
})
it('Should invite 6 maximum limit of team members using dynamic email',() =>{
    cy.get(teamSignUp.firstName1).type(userdata.firstname1)
    cy.get(teamSignUp.lastName1).type(userdata.lastname1)
    cy.get(teamSignUp.memberEmail1).eq(0).type(EmailGenerator.generateRandomEmail())
    cy.get(teamSignUp.addMemberBtn).click()
    cy.get(teamSignUp.firstName2).type(userdata.firstname2)
    cy.get(teamSignUp.lastName2).type(userdata.lastname2)
    cy.get(teamSignUp.memberEmail2).eq(0).type(EmailGenerator.generateRandomEmail())
    cy.get(teamSignUp.addMemberBtn).click()
    cy.get(teamSignUp.firstName3).type(userdata.firstname3)
    cy.get(teamSignUp.lastName3).type(userdata.lastname3)
    cy.get(teamSignUp.memberEmail3).eq(0).type(EmailGenerator.generateRandomEmail())
    cy.get(teamSignUp.addMemberBtn).click()
    cy.get(teamSignUp.firstName4).type(userdata.firstname4)
    cy.get(teamSignUp.lastName4).type(userdata.lastname4)
    cy.get(teamSignUp.memberEmail4).eq(0).type(EmailGenerator.generateRandomEmail())
    cy.get(teamSignUp.addMemberBtn).click()
    cy.get(teamSignUp.firstName5).type(userdata.firstname5)
    cy.get(teamSignUp.lastName5).type(userdata.lastname5)
    cy.get(teamSignUp.memberEmail5).eq(0).type(EmailGenerator.generateRandomEmail())
    cy.get(teamSignUp.addMemberBtn).click()
    cy.get(teamSignUp.firstName6).type(userdata.firstname6)
    cy.get(teamSignUp.lastName6).type(userdata.lastname6)
    cy.get(teamSignUp.memberEmail6).eq(0).type(EmailGenerator.generateRandomEmail())
    cy.get(teamSignUp.nextBtn).click()
    cy.url().should('include','/team/choose-categories')
})
it('Should display error message when invalid first name, last name and email are entered',() =>{
    cy.get(teamSignUp.firstName1).type('fn1@')
    cy.get(teamSignUp.lastName1).type('ln2^')
    cy.get(teamSignUp.memberEmail1).type("testinvalid@")
    cy.get(teamSignUp.nextBtn).click()
    cy.contains("Please remove special characters or numbers in first name").should('be.visible')
    cy.contains("Please remove special characters or numbers in last name").should('be.visible')
    cy.contains("Please enter a valid email address").should('be.visible')
})
})
