/// <reference types="cypress" />

describe('Repositories Testing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/')
  })

  it('should search for test and check if it has any return', () => {
    const value = 'boostrap';

    cy.intercept('GET', '**/search/repositories?**').as('searchRequest')
    cy.get('#input-field').click().clear().type(value);
    cy.wait(500).get('#content .repository').should('have.length', 10);

    cy.wait('@searchRequest').then((interception) => {
      const { request } = interception;

      expect(request.url).to.contain(`/repositories?q=${value}`);
      expect(request.url).to.contain('page=0');
      expect(request.url).to.contain('per_page=10');
    });
  });

  it('should clean search and show initial message', () => {
    cy.get('#input-field').click().clear().type('boostrap');
    cy.get('#close-button').click();
    cy.get('.empty-state').contains('Tente digitar alguma coisa na busca acima');
  });

  it('should search name repository unknown and show not found message', () => {
    cy.get('#input-field').click().clear().type('asdasdasdasd');
    cy.get('#content .repository').should('not.exist');
    cy.get('.empty-state').contains('Não há repositórios condizentes com a sua busca');
    cy.get('.empty-state').contains('Tente uma busca diferente');
  });

  it('should search for Node and change page', () => {
    const value = 'node';

    cy.get('#input-field').click().clear().type(value);

    cy.intercept('GET', '**/search/repositories?**').as('searchRequest')

    cy.wait(800).get('.mat-paginator-navigation-next').click();

    cy.wait('@searchRequest').then((interception) => {
      const { request } = interception;

      expect(request.url).to.contain(`/repositories?q=${value}`);
      expect(request.url).to.contain('page=1');
      expect(request.url).to.contain('per_page=10');
    });
  });

  it('should search for Node and change size', () => {
    const value = 'node';

    cy.get('#input-field').click().clear().type(value);

    cy.wait(800).get('.mat-paginator-page-size > .mat-form-field > .mat-form-field-wrapper').click();

    cy.intercept('GET', '**/search/repositories?**').as('searchRequest')

    cy.contains('25').wait(100).click();

    cy.wait('@searchRequest').then((interception) => {
      const { request } = interception;

      expect(request.url).to.contain(`/repositories?q=${value}`);
      expect(request.url).to.contain('per_page=25');
    });
  });

})
