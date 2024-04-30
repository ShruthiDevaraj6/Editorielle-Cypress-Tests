import {logout} from "../support/selectors"

describe('Logout scenarios', () =>{
    beforeEach(()=> {
        cy.visit("/individual/dashboard/home/plan")
    })
    
    it('Should display the dropdown for logout and other navigation upon clicking the user profile icon ',() =>{
        cy.login("shruti123@yopmail.com","Password123")
        cy.get(logout.userProfileIcon).click()
        cy.get(logout.homeNavigation).contains('Home').should('be.visible')
        cy.get(logout.individualNavigation).contains('Individual').should('be.visible')
        cy.get(logout.helpNavigation).contains('Help').should('be.visible')
    })
    it('Should perform successful logout from the application',() =>{
        cy.login("shruti123@yopmail.com","Password123")
        cy.get(logout.userProfileIcon).click()
        cy.get(logout.logoutBtn).click()
        cy.url().should('include','/account/signin')
    })
})