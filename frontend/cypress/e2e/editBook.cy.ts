import { Book } from '../../src/types/book';
import { form } from '../support/selectors';

describe('Book Creation Form', () => {
  it('fills out the form and updates the book', () => {
    cy.fixture('book').then((book: Book) => {
      book.title = 'EDITME';
      cy.createBook(book).then((createdBook: Book) => {
        const bookId = createdBook.id;
        const newTitle = 'NEWEDITME';

        cy.visitLocalhost();

        cy.contains(createdBook.title);
        cy.contains(bookId).click();

        cy.contains('Edit').click();

        cy.get('input[name="title"]').clear().type(newTitle);

        cy.contains('Save').click();

        cy.url().should('include', `/books/${bookId}`);
        cy.contains('Back to list');
        cy.contains(newTitle);

        cy.deleteBook(bookId).then(() => {
          cy.visitLocalhost();
          cy.contains(bookId).should('not.exist');
        });
      });
    });
  });
});
