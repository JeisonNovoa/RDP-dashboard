// cypress/integration/dashboard.spec.js

describe('Dashboard Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('renders the Dashboard component', () => {
    cy.contains('DASHBOARD');
  });

  it('selects a game and chain', () => {
    cy.get('#gameSelect').select('Axie Infinity');
    cy.get('#chainSelect').select('Etherium');
  });

  it('displays the coin tracker chart', () => {
    cy.get('#gameSelect').select('EV.io');
    cy.get('#chainSelect').select('USD');
    cy.get('#timeSelect').select('7 Days');

    cy.contains('Track Coin').click();

    cy.contains('Coin Tracker');
    cy.get('svg').should('be.visible');
  });

  it('displays recent transactions', () => {
    cy.contains('Recent Transactions');
  });

  it('displays funds deployed information', () => {
    cy.contains('Funds Deployed');
    cy.contains('84%');
  });

  it('displays game categories', () => {
    cy.contains('Games Categories');
    cy.get('svg').should('be.visible');
  });

  it('displays coin volume information', () => {
    cy.contains('Coin Volume');
    cy.get('svg').should('be.visible');
  });
});