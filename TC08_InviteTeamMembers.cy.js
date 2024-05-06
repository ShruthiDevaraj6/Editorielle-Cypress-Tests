import { faker } from '@faker-js/faker';
import {homePage,teamSignUp} from "../support/selectors"
import EmailGenerator from '../support/utils';
describe('Invite team members functionality scenarios', () =>{
    beforeEach(()=> {
        cy.visit("/")
        cy.get(homePage.signUpButtonTeam).click()
         const password = faker.internet.password();
        cy.get(teamSignUp.firstName).type(faker.person.firstName())
        cy.get(teamSignUp.lastName).type(faker.person.lastName())
        cy.get(teamSignUp.email).type(EmailGenerator.generateRandomEmail())
        cy.get(teamSignUp.businessName).type(faker.company.name()) 
        cy.get(teamSignUp.password).type(password)
        cy.get(teamSignUp.reEnterPassword).type(password)
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
it('Should invite 6 maximum limit of team members using dynamic email',() =>{
    const numberOfMembers = 6;
    for (let i = 1; i <= numberOfMembers; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = EmailGenerator.generateRandomEmail();
        cy.get(teamSignUp[`firstName${i}`]).type(firstName);
        cy.get(teamSignUp[`lastName${i}`]).type(lastName);
        cy.get(teamSignUp[`memberEmail${i}`]).eq(0).type(email);
        if (i < numberOfMembers) {
            cy.get(teamSignUp.addMemberBtn).click();
          }
        }
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
it('Should be able to remove the user invited upon clicking remove',() =>{
    const numberOfMembers = 2;
    for (let i = 1; i <= numberOfMembers; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = EmailGenerator.generateRandomEmail();
        cy.get(teamSignUp[`firstName${i}`]).type(firstName);
        cy.get(teamSignUp[`lastName${i}`]).type(lastName);
        cy.get(teamSignUp[`memberEmail${i}`]).eq(0).type(email);
        if (i < numberOfMembers) {
            cy.get(teamSignUp.addMemberBtn).click();
          }
        }
        cy.get(teamSignUp.removeBtn).click()
    })
    it.only('Should display error message when same email address is repeated while inviting member',() =>{
        const numberOfMembers = 2;
        const email = faker.internet.email();
       for (let i = 1; i <= numberOfMembers; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        cy.get(teamSignUp[`firstName${i}`]).type(firstName);
        cy.get(teamSignUp[`lastName${i}`]).type(lastName);
        cy.get(teamSignUp[`memberEmail${i}`]).type(email);
        if (i < numberOfMembers) {
            cy.get(teamSignUp.addMemberBtn).click();
          }
        }
        cy.get(teamSignUp.nextBtn).click({multiple: true, force:true})
        cy.get(teamSignUp.emailErrorMsg).scrollIntoView().should('be.visible',{force:true});
    })
})
