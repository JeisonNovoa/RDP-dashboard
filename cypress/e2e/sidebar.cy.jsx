// cypress/integration/sidebar.spec.js

describe("Sidebar", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should display the sidebar with menu items", () => {
    // Verify that the sidebar is present.
    cy.get(".pro-sidebar-inner").should("exist");

    // Verify that menu items are present.
    cy.get(".pro-menu-item").should("have.length", 8);

    // Verify that the sidebar title is present.
    cy.contains("Ready Player").should("exist");

    // Verify that the first menu item is present.
    cy.contains("Dashboard").should("exist");
  });

  it("should navigate to different pages when menu items are clicked", () => {
    // Clicks a specific menu item (for example, "Vote System").
    cy.get("a").get('[href="/vote"]').click({ force: true });

    // Verify that the URL has changed to the "Vote System" page.
    cy.url().should("eq", "http://localhost:3000/vote");

    // Return to the home page.
    cy.visit("http://localhost:3000/");

    // Clicks another menu item (for example, "FAQ Page").
    cy.get("a").get('[href="/faq"]').click({ force: true });

    // Verify that the URL has changed to the "FAQ Page".
    cy.url().should("eq", "http://localhost:3000/faq");
  });

  it("should toggle the sidebar when the collapse/expand button is clicked", () => {
    // Verify that the sidebar is initially visible.
    cy.get(".pro-sidebar-inner").should("be.visible");
    // Verify that the text "Brock" is in the bar when it is visible
    cy.get(".pro-sidebar-inner").contains("Brock").should("exist");

    // Click the collapse/expand button.
    cy.get("svg").get('[data-testid="MenuOutlinedIcon"]').click();

    // Verify that the text "Brock" is not displayed in the hidden bar.
    cy.get(".pro-sidebar-inner").contains("Brock").should("not.exist");

    // Click the collapse/expand button again.
    cy.get("svg").get('[data-testid="MenuOutlinedIcon"]').click();

    // Verify that the text "Brock" is displayed again in the visible bar.
    cy.get(".pro-sidebar-inner").contains("Brock").should("exist");
  });
});
