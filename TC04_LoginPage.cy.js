//import { describe } from "mocha";
//const { homePage} = selectors;
//import { selectors } from "../support/selectors";
import {homePage, loginPage} from "../support/selectors"

describe('Login page scenarios', () =>{
    let userdata;
    beforeEach(()=> {
        cy.visit("/")
        cy.get(homePage.signInButton).click()
        cy.fixture('editorelle.json').then((data)=>{
            userdata=data
        })
    })
    it('Should display links on the login page',() =>{
        cy.get(loginPage.createAccountLinkBtn).contains("Create an account")
        cy.get(loginPage.loginBtn).contains("Log in")
        cy.get(loginPage.resetPasswordLink).contains("Reset it")
        cy.get(loginPage.journalistLink).contains("Click here")  
    })
    it('Should login successfully with valid credentials',() =>{
        cy.login("shruti123@yopmail.com","Password123")    
    })
    it('Should display error message with unregistered email address',() =>{
        cy.get(loginPage.email).type(userdata.email)
        cy.get(loginPage.password).type(userdata.password)
        cy.get(loginPage.loginBtn).click()
        cy.contains("This email address isn't registered, please amend or sign up!").should('be.visible')
    })
    it('Should display error message when user enters incorrect credentials',() =>{
        cy.get(loginPage.email).type("shruthimd@yopmail.com")
        cy.get(loginPage.password).type(userdata.password)
        cy.get(loginPage.loginBtn).click()
        cy.contains("Incorrect email or password. Please try again!").should('be.visible')
    })
    it('Should display error message when user enters invalid email address',() =>{
        cy.get(loginPage.email).type("testinvalid")
        cy.get(loginPage.password).type(userdata.password)
        cy.contains("Please enter a valid email address").should('be.visible')
    })
    it('Should display error message when user enters invalid password',() =>{
        cy.get(loginPage.email).type("shruti123@yopmail.com")
        cy.get(loginPage.password).type("Password{enter}")
        cy.contains("Please enter a valid password").should('be.visible')
    })

})