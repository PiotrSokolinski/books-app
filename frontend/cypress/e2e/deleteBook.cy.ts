import { Book } from '../../src/types/book';
import { form } from '../support/selectors';

describe('Book Creation Form', () => {
  it('fills out the form and updates the book', () => {
    cy.fixture('book').then((book: Book) => {
      book.title = 'REMOVEME';
      cy.createBook(book).then((createdBook: Book) => {
        const bookId = createdBook.id;

        cy.visitLocalhost();
        cy.contains(bookId).click();

        cy.contains(form.edit).click();

        cy.contains(form.delete).click();
        cy.contains(form.confirm).click();

        cy.url().should('include', '/books');
        cy.get('body').should('not.contain', createdBook.title);
      });
    });
  });
});
