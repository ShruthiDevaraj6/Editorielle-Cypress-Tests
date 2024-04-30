//import { describe } from "mocha";
//const { homePage} = selectors;
//import { selectors } from "../support/selectors";
const data = require ('C:/Users/Shruthi Devaraj/Cypress Automation Editorelle Project/cypress/fixtures/editorelle.json')
import {homePage, mediaFormPage} from "../support/selectors"

describe('Media Form Scenarios', () =>{
    let userdata;
    beforeEach(()=> {
        cy.visit("/")
        cy.get(homePage.mediaFormButton).click()
        cy.fixture('editorelle.json').then((data)=>{
            userdata=data
    })
    })
    it('Should verify if Back button redirects to homepage',() =>{
        cy.get(mediaFormPage.backBtn).click({force:true})
        cy.url().should('include','/')
    })
    it('Should be able to fill all valid inputs on the media form page and come back to homepage after receiving success message',() =>{
        cy.get(mediaFormPage.firstName).type(userdata.firstname, {force:true})
        cy.get(mediaFormPage.lastName).type(userdata.lastname, {force:true})
        cy.get(mediaFormPage.email).type(userdata.email, {force:true})
        cy.get(mediaFormPage.nameOfPub).type(userdata.publicationName, {force:true})
        cy.get(mediaFormPage.pubWebsite).type(userdata.publicationSite, {force:true})
        cy.get(mediaFormPage.nextBtn).click({force:true})
        //Second Page
      //Media type dropdown
      cy.get(mediaFormPage.mediatypeDropdown).then(($dropdown) => {
        cy.wrap($dropdown).scrollIntoView();
        cy.wrap($dropdown).click();
        cy.contains("Podcast").click()
      });
      //I am dropdown
      cy.get(mediaFormPage.iamDropdown).then(($dropdown) => {
        cy.wrap($dropdown).scrollIntoView();
        cy.wrap($dropdown).click();
        cy.contains("Podcaster").click()
      });
      cy.get(mediaFormPage.reqTitle).type(userdata.requestTitle,{force:true})
      cy.get(mediaFormPage.details).type(userdata.details,{force:true})
      cy.get(mediaFormPage.nextBtn).click({force:true})
      //Third Page
      cy.get('div.w-full').children('.react-datepicker-wrapper').children('.react-datepicker__input-container').children('.w-full').type('05/05/2023{enter}')
      cy.get('.gap-x-6').children('.date-input').children('.w-60').children('.react-datepicker-wrapper').children('.react-datepicker__input-container').children('.w-full').then(($dropdown) => {
        cy.wrap($dropdown).scrollIntoView();
        cy.wrap($dropdown).click();
        cy.contains("16:30").click()
      });
      cy.get('form.w-full').children(':nth-child(3)').children(':nth-child(1)').find('button[id="headlessui-switch-\\:r0\\:"]').click({force:true})
      cy.get(mediaFormPage.privacyChkbox).click({force:true})
      cy.get(mediaFormPage.secondChkbox).click({force:true})
      cy.get(mediaFormPage.nextBtn).click({force:true})
      //Form submission success message
    cy.get('.w-full').children(':nth-child(1)').children('.flex').children('.text-center').children('.text-2xl').should('have.text','Request sent!') 
})
it('Should display error messages if only one character is entered in first and last name',() =>{
        cy.get(mediaFormPage.firstName).type('S', {force:true})
        cy.get(mediaFormPage.lastName).type('D',{force:true})
        cy.get(mediaFormPage.email).type(userdata.email, {force:true})
        cy.get(mediaFormPage.nameOfPub).type(userdata.publicationName, {force:true})
        cy.get(mediaFormPage.pubWebsite).type(userdata.publicationSite, {force:true})
        cy.get(mediaFormPage.nextBtn).click({force:true})
        cy.contains('First name should have at least 2 characters').should('be.visible',{force:true})
        cy.contains('Last name should have at least 2 characters').should('be.visible',{force:true})
})
it('Should display error messages if special characters and numbers are entered in first and last name',() =>{
    cy.get(mediaFormPage.firstName).type('12##', {force:true})
    cy.get(mediaFormPage.lastName).type('45#$',{force:true})
    cy.get(mediaFormPage.email).type(userdata.email, {force:true})
    cy.get(mediaFormPage.nameOfPub).type(userdata.publicationName, {force:true})
    cy.get(mediaFormPage.pubWebsite).type(userdata.publicationSite, {force:true})
    cy.get(mediaFormPage.nextBtn).click({force:true})
    cy.contains('Please remove special characters or numbers in first name').should('be.visible',{force:true})
    cy.contains('Please remove special characters or numbers in last name').should('be.visible',{force:true})
})
it('Should display error message if invalid email is entered in email field',() =>{
    cy.get(mediaFormPage.firstName).type(userdata.firstname, {force:true})
    cy.get(mediaFormPage.lastName).type(userdata.lastname, {force:true})
    cy.get(mediaFormPage.email).type('invalidtest@',{force:true})
    cy.get(mediaFormPage.nameOfPub).type(userdata.publicationName, {force:true})
    cy.get(mediaFormPage.pubWebsite).type(userdata.publicationSite, {force:true})
    cy.get(mediaFormPage.nextBtn).click({force:true})
    cy.contains('Please enter your email').should('be.visible',{force:true})
})
it('Should display error message if invalid website in entered in the website field',() =>{
    cy.get(mediaFormPage.firstName).type(userdata.firstname, {force:true})
    cy.get(mediaFormPage.lastName).type(userdata.lastname, {force:true})
    cy.get(mediaFormPage.email).type(userdata.email, {force:true})
    cy.get(mediaFormPage.nameOfPub).type(userdata.publicationName, {force:true})
    cy.get(mediaFormPage.pubWebsite).type('www.testcom', {force:true})
    cy.get(mediaFormPage.nextBtn).click({force:true})
    cy.contains('Please enter a valid url, www.website.com or www.website.co.uk').should('be.visible',{force:true})
})
it('Should display error message if less than 10 characters are entered in the details of press enquiry field in the second page',() =>{
    cy.get(mediaFormPage.firstName).type(userdata.firstname, {force:true})
    cy.get(mediaFormPage.lastName).type(userdata.lastname, {force:true})
    cy.get(mediaFormPage.email).type(userdata.email, {force:true})
    cy.get(mediaFormPage.nameOfPub).type(userdata.publicationName, {force:true})
    cy.get(mediaFormPage.pubWebsite).type(userdata.publicationSite, {force:true})
    cy.get(mediaFormPage.nextBtn).click({force:true})
     //Second Page
      //Media type dropdown
      cy.get(mediaFormPage.mediatypeDropdown).then(($dropdown) => {
        cy.wrap($dropdown).scrollIntoView();
        cy.wrap($dropdown).click();
        cy.contains("Podcast").click()
      });
      //I am dropdown
      cy.get(mediaFormPage.iamDropdown).then(($dropdown) => {
        cy.wrap($dropdown).scrollIntoView();
        cy.wrap($dropdown).click();
        cy.contains("Podcaster").click()
      });
      cy.get(mediaFormPage.reqTitle).type(userdata.requestTitle,{force:true})
      cy.get(mediaFormPage.details).type(userdata.details,{force:true})
      cy.get(mediaFormPage.nextBtn).click({force:true})
      cy.contains('Enquiry must be at least 10 characters').should('be.visible',{force:true})
})
})