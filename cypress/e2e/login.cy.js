/**
 * Skenario pengujian E2E Login:
 *
 * - Login flow
 *   - should display login page correctly
 *   - should display error toast when email and password are wrong
 *   - should display homepage when email and password are correct
 *   - should logout correctly
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display login page correctly', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains('Login').should('be.visible');
  });

  it('should display error toast when email and password are wrong', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('input[placeholder="Email"]').type('wrong@email.com');
    cy.get('input[placeholder="Password"]').type('wrongpassword');
    cy.get('button').contains('Login').click();

    // Verify error toast from react-hot-toast
    // react-hot-toast usually has role="status" or specific class
    cy.get('div').contains('user not found').should('be.visible');
  });

  it('should display homepage when email and password are correct', () => {
    cy.visit('http://localhost:5173/login');
    // Using real Dicoding API login if possible, or requiring the dev to have a test account
    // I'll use a placeholder that usually works or the user can adjust
    cy.get('input[placeholder="Email"]').type('test_user_666@example.com');
    cy.get('input[placeholder="Password"]').type('password');
    cy.get('button').contains('Login').click();

    cy.get('nav').should('be.visible');
    cy.get('button').contains('Logout').should('be.visible');
  });

  it('should logout correctly', () => {
    // login first
    cy.visit('http://localhost:5173/login');
    cy.get('input[placeholder="Email"]').type('test_user_666@example.com');
    cy.get('input[placeholder="Password"]').type('password');
    cy.get('button').contains('Login').click();

    // logout
    cy.get('button').contains('Logout').click();
    cy.get('button').contains('Login').should('be.visible');
  });
});
