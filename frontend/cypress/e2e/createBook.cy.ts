// TODO: F3 - More E2E tests across the application
describe('Book Creation Form', () => {
  it('fills out the form and creates the book', () => {
    cy.visitLocalhost();

    cy.contains('Create').click();

    cy.get('input[name="title"]').type('CREATEME');

    cy.get('input[name="author"]').type('Test Author');

    cy.get('input[name="isbnNumber"]').type('4567890123');

    cy.get('input[name="numberOfPages"]').type('350');

    cy.get('input[name="rating"]').type('4');

    cy.contains('Save').click();

    cy.url().should('include', '/books');
    cy.contains('CREATEME');
  });
});
