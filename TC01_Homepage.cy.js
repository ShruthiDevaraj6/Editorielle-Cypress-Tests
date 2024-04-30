//import { describe } from "mocha";
//const { homePage} = selectors;
//import { selectors } from "../support/selectors";
import {homePage} from "../support/selectors"

describe('Homepage scenarios', () =>{
    beforeEach(()=> {
        cy.visit("/")
    })
    it('Should display buttons and links',() =>{
        cy.get(homePage.signUpButtonIndividual).contains("Individual")
        cy.get(homePage.signUpButtonTeam).contains("Team")
        cy.get(homePage.signInButton).contains("Log in")
        cy.get(homePage.mediaFormButton).contains("Media Form")
    })
    it('Should redirect you to the individual sign up page',() =>{
        cy.get(homePage.signUpButtonIndividual).click()
        cy.url().should('include','individual/account/signup')  
    })
    it('Should redirect you to the team sign up page',() =>{
        cy.get(homePage.signUpButtonTeam).click()
        cy.url().should('include','team/account/signup') 
    })
    it('Should redirect you to the log in page',() =>{
        cy.get(homePage.signInButton).click()
        cy.url().should('include','account/signin') 
    })
    it('Should redirect you to the media form page',() =>{
        cy.get(homePage.mediaFormButton).click()
        cy.url().should('include','/media-form')   
    })


})