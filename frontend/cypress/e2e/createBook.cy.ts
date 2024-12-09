import { Book } from '../../src/types/book';
import { form } from '../support/selectors';

// TODO: F3 - More E2E tests across the application
describe('Book Creation Form', () => {
  it('fills out the form and creates the book', () => {
    cy.fixture('book').then((book: Book) => {
      cy.visitLocalhost();

      cy.contains(form.create).click();

      cy.get(form.title).type(book.title);
      cy.get(form.author).type(book.author);
      cy.get(form.isbnNumber).type(book.isbnNumber);
      cy.get(form.numberOfPages).type(String(book.numberOfPages));
      cy.get(form.rating).type(String(book.rating));

      cy.contains(form.save).click();

      cy.url().should('include', '/books');
      cy.contains(book.title);
    });
  });
});
