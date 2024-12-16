/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
      cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', function() {
      const longtest = 'susana, susana, susana, susana, susana, susana'
      cy.get('#firstName').type('Susana').should('have.value', 'Susana')
      cy.get('#lastName').type('Mendonca').should('have.value', 'Mendonca')  
      cy.get('#email').type('susana.teste@gmail.com').should('have.value', 'susana.teste@gmail.com') 
      cy.get('#open-text-area').type(longtest, {delay: 0 }).should('have.value', longtest)   
      cy.get('button[type="submit"]').click()
        //cy.should('be.visible', 'Mensagem enviada com sucesso.')
      cy.get('.success').should('be.visible')
      })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
      cy.get('#firstName').type('Susana').should('have.value', 'Susana')
      cy.get('#lastName').type('Mendonca').should('have.value', 'Mendonca')  
      cy.get('#email').type('susana.teste').should('have.value', 'susana.teste') 
      cy.get('#open-text-area').type('susana').should('have.value', 'susana')   
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')
      })
    it('Campo telefone continua vazio quando insere valor difente de nro no campo', function(){
      cy.get('#phone').type('abcdfghik').should('have.value', '')
    }) 
    
    it('exibe msg de erro qdo o tel se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
      cy.get('#firstName').type('Susana').should('have.value', 'Susana')
      cy.get('#lastName').type('Mendonca').should('have.value', 'Mendonca')  
      cy.get('#email').type('susana.teste').should('have.value', 'susana.teste') 
      cy.get('#open-text-area').type('susana').should('have.value', 'susana')  
      cy.get('#phone-checkbox') .check()  
      cy.contains('button', 'Enviar').click()   
      cy.get('.error').should('be.visible')    
    })  
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
      cy.get('#firstName')
          .type('Susana')
          .should('have.value', 'Susana')
          .clear()
          .should('have.value', '')
      cy.get('#lastName')
          .type('Mendonca')
          .should('have.value', 'Mendonca')  
          .clear()
          .should('have.value','')
      cy.get('#email')
          .type('susana.teste')
          .should('have.value', 'susana.teste') 
          .clear()
          .should('have.value','')
      cy.get('#phone')
          .type('abcdfghik')
          .should('have.value', '')
          .clear()
          .should('have.value', '')
        })      
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
     cy.contains('button', 'Enviar')
       .click()
     cy.get('.error')
       .should('be.visible')
    })  
    
    it('envia o formuário com sucesso usando um comando customizado', function(){
      cy.fillMandatoryFieldsAndSubmit()
      cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
      cy.get('#product')
      .select('YouTube')
      .should('have.value','youtube')
    })
   
    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
      cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
      cy.get('#product')
      .select(1)
      .should('have.value', 'blog')

    })
    it('marca o tipo de atendimento "Feedback"', function(){
      cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')

    })
    it('marca cada tipo de atendimento',function(){
      cy.get('input[type="radio"]')
      //comprimento, verificar que tem 3
      .should('have.length', 3)
      //pega cada um deles, 
      .each(function($radio){
        //impacotar cada um dos radios
        cy.wrap($radio).check()
        //
        cy.wrap($radio).should('be.checked')
      })
      })
    it('marca ambos checkboxes, depois desmarca o último', function(){
      cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
    }) 
    it('seleciona um arquivo da pasta fixtures', function(){
      cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
    })
    it('seleciona um arquivo simulando um drag-and-drop', function(){
      cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){
      cy.get('#privacy a')
        .should('have.attr','target', '_blank')
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
      cy.contains ('Talking About Testing').should('be.visible')
        
    })
    
})

