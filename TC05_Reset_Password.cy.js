import {homePage, loginPage, resetPassword} from "../support/selectors"

describe('Reset password scenarios', () =>{
    beforeEach(()=> {
        cy.visit("/")
        cy.get(homePage.signInButton).click()
        cy.get(loginPage.resetPasswordLink).click()   
    })
    it('Should enter a valid email address for password reset.',() =>{
        cy.get(resetPassword.email).type('shrureset@yopmail.com')
        cy.get(resetPassword.sendEmailBtn).click()
        cy.contains("Email sent, please check your inbox").should('be.visible')
        
    })
    it('Should get an error message when user clicks send email button twice with valid email address',() =>{
        cy.get(resetPassword.email).type('shrureset@yopmail.com')
        cy.get(resetPassword.sendEmailBtn).click()
        cy.get(resetPassword.resendEmailLink).click()
        cy.contains("We have sent you an email already. Please check your inbox or spam folder for further details").should('be.visible')
    })
    it('Should submit an error message when user enters invalid email address.',() =>{
        cy.get(resetPassword.email).type('testinvalid@')
        cy.get(resetPassword.sendEmailBtn).click()
        cy.contains("Please enter a valid email address").should('be.visible')  
    })
    
})