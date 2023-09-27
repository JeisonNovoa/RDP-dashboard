describe("Line Page", () => {
  beforeEach(() => {
    // Visit the Geography component page
    cy.visit("http://localhost:3000/line");
  });
  it("should select a game, chain, and timelapse, then track coin", () => {
    // Verify that the page loaded correctly
    cy.contains("Coin tracker");
    cy.contains("Select Game");
    cy.contains("Select Chain");
    cy.contains("Select Timelapse");

    // Select a game
    cy.get("#gameSelect").select("EV.io");

    // Verify that the selected game has been updated
    cy.get("#gameSelect").should("have.value", "1");

    // Select a chain
    cy.get("#chainSelect").select("Etherium");

    // Verify that the selected string has been updated
    cy.get("#chainSelect").should("have.value", "2");

    // Select a time interval
    cy.get("#timeSelect").select("15 Days");

    // Verify that the selected time range has been updated
    cy.get("#timeSelect").should("have.value", "16");

    // Click the "Track Coin" button
    cy.contains("Track Coin").click();

    // Verify that the `g` element is within the template (`g` is created when the graph is created)
    cy.get("g");
  });
});
