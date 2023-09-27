// describe() describe the test suite
describe("Geography component test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/geography");
  });

  it("should render the Geography component correctly", () => {
    // Assert that the component is rendered
    cy.contains("Coin Trading Volume");
  });

  it("should display the correct options in the game select dropdown", () => {
    // Get the game select dropdown
    const gameSelect = cy.get("#gameSelect");

    // Assert that the dropdown contains the correct options
    gameSelect.should("contain", "EV.io");
    gameSelect.should("contain", "League of Kingdoms");
    gameSelect.should("contain", "Big Time");
    gameSelect.should("contain", "Champions Ascension");
    gameSelect.should("contain", "Axie Infinity");
    gameSelect.should("contain", "The Sandbox");
    gameSelect.should("contain", "Illuvium");
    gameSelect.should("contain", "Castle Crush");
    gameSelect.should("contain", "Castaways");
    gameSelect.should("contain", "Crypto Unicorns");
    gameSelect.should("contain", "Pixels.xyz");
    gameSelect.should("contain", "My Pet Hooligan");
  });

  it("should display the correct options in the chain select dropdown", () => {
    // Get the chain select dropdown
    const chainSelect = cy.get("#chainSelect");

    // Assert that the dropdown contains the correct options
    chainSelect.should("contain", "USD");
    chainSelect.should("contain", "Etherium");
    chainSelect.should("contain", "Bitcoin");
    chainSelect.should("contain", "Great Britain Pound");
    chainSelect.should("contain", "European Monetary Unit (Euro)");
    chainSelect.should("contain", "Japanese yen");
  });

  it("should display the correct options in the timelapse select dropdown", () => {
    // Get the timelapse select dropdown
    const timelapseSelect = cy.get("#timeSelect");

    // Assert that the dropdown contains the correct options
    timelapseSelect.should("contain", "7 Days");
    timelapseSelect.should("contain", "15 Days");
    timelapseSelect.should("contain", "30 Days");
  });

  it("should render the BarComponent when the Track Coin button is clicked", () => {
    // Get the Track Coin button
    const trackCoinButton = cy.get("#Track");

    // Click the Track Coin button
    trackCoinButton.click();
    // Verify that the `g` element is within the template (`g` is created when the graph is created)
    cy.get("g");
  });
});
