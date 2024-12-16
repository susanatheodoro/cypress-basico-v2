Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
  cy.get('#firstName').type('Susana') 
  cy.get('#lastName').type('Mendonca')
  cy.get('#email').type('susana.teste@gmail.com')
  cy.get('#open-text-area').type('teste')
  cy.get('button[type="submit"]').click()


})