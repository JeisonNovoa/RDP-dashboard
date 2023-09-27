// cypress/integration/sidebar.spec.js

describe('Sidebar', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/') // Asegúrate de que la página de inicio es donde se encuentra la barra lateral.
    });
  
    it('should display the sidebar with menu items', () => {
      // Verifica que la barra lateral esté presente.
      cy.get('.pro-sidebar-inner').should('exist');
  
      // Verifica que los elementos de menú estén presentes.
      cy.get('.pro-menu-item').should('have.length', 8);
  
      // Verifica que el título de la barra lateral esté presente.
      cy.contains('Ready Player').should('exist');
  
      // Verifica que el primer elemento de menú esté presente.
      cy.contains('Dashboard').should('exist');
    });
  
    it('should navigate to different pages when menu items are clicked', () => {
      // Haz clic en un elemento de menú específico (por ejemplo, "Vote System").
      
      cy.get('a').get('[href="/vote"]').click({force: true})
        
      // Verifica que la URL haya cambiado a la página de "Vote System".
      cy.url().should('eq', 'http://localhost:3000/vote');
  
      // Vuelve a la página de inicio.
      cy.visit('http://localhost:3000/');
  
      // Haz clic en otro elemento de menú (por ejemplo, "FAQ Page").
      cy.get('a').get('[href="/faq"]').click({force: true})
  
      // Verifica que la URL haya cambiado a la página de "FAQ Page".
      cy.url().should('eq', 'http://localhost:3000/faq');
    });
  
    it('should toggle the sidebar when the collapse/expand button is clicked', () => {
      // Verifica que la barra lateral esté inicialmente visible.
      cy.get('.pro-sidebar-inner').should('be.visible');
      // Verifica que el texto "Brock" se encuentre en la barra cuando este visible
      cy.get('.pro-sidebar-inner').contains('Brock').should('exist')
  
      // Haz clic en el botón de colapsar/expandir.
      cy.get('svg').get('[data-testid="MenuOutlinedIcon"]').click();
  
      // Verifica que el texto "Brock" no se muestra en la barra oculta.
      cy.get('.pro-sidebar-inner').contains('Brock').should('not.exist')
      
  
      // Haz clic nuevamente en el botón de colapsar/expandir.
      cy.get('svg').get('[data-testid="MenuOutlinedIcon"]').click();
  
      // Verifica que el texto "Brock" se muestre nuevamente en la barra visible.
      cy.get('.pro-sidebar-inner').contains('Brock').should('exist')
    });
  });
  