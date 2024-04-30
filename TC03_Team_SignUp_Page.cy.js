//import { describe } from "mocha";
//const { homePage} = selectors;
//import { selectors } from "../support/selectors";
const data = require ('C:/Users/Shruthi Devaraj/Cypress Automation Editorelle Project/cypress/fixtures/editorelle.json')

import {homePage} from "../support/selectors"
import {teamSignUp} from "../support/selectors"

describe('Team Signup page scenarios', () =>{
    let userdata;
    beforeEach(()=> {
        cy.visit("/")
        cy.get(homePage.signUpButtonTeam).click()
        cy.fixture('editorelle.json').then((data)=>{
            userdata=data
    })
})
    it('Should complete successful signup with valid inputs',() =>{
        cy.get(teamSignUp.firstName).type(userdata.firstname)
        cy.get(teamSignUp.lastName).type(userdata.lastname)
        cy.get(teamSignUp.email).type(userdata.email)
        cy.get(teamSignUp.businessName).type(userdata.businessName)
        cy.get(teamSignUp.password).type(userdata.password)
        cy.get(teamSignUp.reEnterPassword).type(userdata.password)
        cy.get(teamSignUp.checkbox).click()
        cy.get(teamSignUp.createAccountbtn).click()
        cy.url().should('include','/team/account/signup-verification?email=testshru@yopmail.com')
    })
    it('Should display error messages when submitting empty form',() =>{
        cy.get(teamSignUp.createAccountbtn).click()
        cy.contains('Please enter your first & last name').should('be.visible')
        cy.contains('Please enter your email').should('be.visible')
        cy.contains('Please enter a password').should('be.visible')
        cy.contains('Please accept the Terms & Conditions').should('be.visible')
    })
    it('Should display error messages for invalid first name and last name',() =>{
        cy.get(teamSignUp.firstName).type('12##')
        cy.get(teamSignUp.lastName).type('34&&{enter}')
        cy.contains('Please remove special characters or numbers in first name').should('be.visible')
        cy.contains('Please remove special characters or numbers in last name').should('be.visible')
    })
    it('Should display error message for invalid email format',() =>{
        cy.get(teamSignUp.firstName).type(userdata.firstname)
        cy.get(teamSignUp.lastName).type(userdata.lastname)
        cy.get(teamSignUp.email).type('testinvalid@')
        cy.get(teamSignUp.password).type(userdata.password)
        cy.get(teamSignUp.reEnterPassword).type(userdata.password)
        cy.get(teamSignUp.checkbox).click()
        cy.get(teamSignUp.createAccountbtn).click() 
        cy.contains('Please enter a valid email').should('be.visible')
    })
    it('Should be able to create account when no input is entered in non-mandatory business name field',() =>{
        cy.get(teamSignUp.firstName).type(userdata.firstname)
        cy.get(teamSignUp.lastName).type(userdata.lastname)
        cy.get(teamSignUp.email).type(userdata.email)
        cy.get(teamSignUp.password).type(userdata.password)
        cy.get(teamSignUp.reEnterPassword).type(userdata.password)
        cy.get(teamSignUp.checkbox).click()
        cy.get(teamSignUp.createAccountbtn).click()
        cy.url().should('include','/team/account/signup-verification?email=testshru@yopmail.com')
    })
    it('Should display error messages for password less than 10 characters, no uppercase and and no number',() =>{
        cy.get(teamSignUp.firstName).type(userdata.firstname)
        cy.get(teamSignUp.lastName).type(userdata.lastname)
        cy.get(teamSignUp.email).type(userdata.email)
        cy.get(teamSignUp.password).type('pass')
        cy.get(teamSignUp.reEnterPassword).type('pass')
        cy.get(teamSignUp.checkbox).click()
        cy.get(teamSignUp.createAccountbtn).click()
        cy.contains('Please enter a valid password').should('be.visible')  
    })
    it('Should display error message for blank re-enter password field',() =>{
        cy.get(teamSignUp.firstName).type(userdata.firstname)
        cy.get(teamSignUp.lastName).type(userdata.lastname)
        cy.get(teamSignUp.email).type(userdata.email)
        cy.get(teamSignUp.password).type(userdata.password)
        cy.get(teamSignUp.checkbox).click()
        cy.get(teamSignUp.createAccountbtn).click()
        cy.contains('Please re-enter your password').should('be.visible')  
    })
    it('Should display error message when passwords do not match',() =>{
        cy.get(teamSignUp.firstName).type(userdata.firstname)
        cy.get(teamSignUp.lastName).type(userdata.lastname)
        cy.get(teamSignUp.email).type(userdata.email)
        cy.get(teamSignUp.password).type(userdata.password)
        cy.get(teamSignUp.reEnterPassword).type('pass{enter}')
        cy.contains('Please make sure your passwords match').should('be.visible')  
    })
    it('Should display error message for existing email address',() =>{
        cy.get(teamSignUp.firstName).type(userdata.firstname)
        cy.get(teamSignUp.lastName).type(userdata.lastname)
        cy.get(teamSignUp.email).type('shru@yopmail.com')
        cy.get(teamSignUp.password).type(userdata.password)
        cy.get(teamSignUp.reEnterPassword).type(userdata.password)
        cy.get(teamSignUp.checkbox).click()
        cy.get(teamSignUp.createAccountbtn).click()
        cy.contains('This email has already been taken').should('be.visible')  
    })
    it('Should display error message when checkbox is not checked before submitting form',() =>{
        cy.get(teamSignUp.firstName).type(userdata.firstname)
        cy.get(teamSignUp.lastName).type(userdata.lastname)
        cy.get(teamSignUp.email).type(userdata.email)
        cy.get(teamSignUp.password).type(userdata.password)
        cy.get(teamSignUp.reEnterPassword).type(userdata.password)
        cy.get(teamSignUp.createAccountbtn).click()
        cy.contains('Please accept the Terms & Conditions').should('be.visible')  
    })
    
})