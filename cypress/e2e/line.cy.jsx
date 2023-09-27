describe("Line Page", () => {
    beforeEach(() => {
        // Visit the Geography component page
        cy.visit("http://localhost:3000/line");
      });
  it("should select a game, chain, and timelapse, then track coin", () => {
    // Verifica que la página se haya cargado correctamente
    cy.contains("Coin tracker");
    cy.contains("Select Game");
    cy.contains("Select Chain");
    cy.contains("Select Timelapse");

    // Selecciona un juego
    cy.get('#gameSelect').select("EV.io");

    // Verifica que el juego seleccionado se haya actualizado
    cy.get('#gameSelect').should("have.value", "1");

    // Selecciona una cadena
    cy.get('#chainSelect').select("Etherium");

    // Verifica que la cadena seleccionada se haya actualizado
    cy.get('#chainSelect').should("have.value", "2");

    // Selecciona un intervalo de tiempo
    cy.get('#timeSelect').select("15 Days");

    // Verifica que el intervalo de tiempo seleccionado se haya actualizado
    cy.get('#timeSelect').should("have.value", "16");

    // Haz clic en el botón "Track Coin"
    cy.contains("Track Coin").click();

    // Verifica que el elemento `g` se encuentre dentro del template (`g` se crea al momento de crear la grafica)
    cy.get('g');
  });
});
