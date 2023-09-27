// cypress/integration/dashboard.spec.js

describe("Dashboard Component", () => {
  // Before each test, visit the URL http://localhost:3000/
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  // Tests if the dashboard component renders correctly.
  it("renders the Dashboard component", () => {
    cy.contains("DASHBOARD");
  });

  // Test the selection of a set and a string.
  it("selects a game and chain", () => {
    cy.get("#gameSelect").select("Axie Infinity");
    cy.get("#chainSelect").select("Etherium");
  });

  // Test whether the coin tracker graph is displayed.
  it("displays the coin tracker chart", () => {
    cy.get("#gameSelect").select("EV.io");
    cy.get("#chainSelect").select("USD");
    cy.get("#timeSelect").select("7 Days");

    cy.contains("Track Coin").click();

    cy.contains("Coin Tracker");
    cy.get("svg").should("be.visible");
  });

  // Test whether recent transactions are displayed.
  it("displays recent transactions", () => {
    cy.contains("Recent Transactions");
  });

  // Tests whether information about deployed backgrounds is displayed.
  it("displays funds deployed information", () => {
    cy.contains("Funds Deployed");
    cy.contains("84%");
  });

  // Test if game categories are displayed.
  it("displays game categories", () => {
    cy.contains("Games Categories");
    cy.get("svg").should("be.visible");
  });

  // Test whether coin volume information is displayed.
  it("displays coin volume information", () => {
    cy.contains("Coin Volume");
    cy.get("svg").should("be.visible");
  });
});
