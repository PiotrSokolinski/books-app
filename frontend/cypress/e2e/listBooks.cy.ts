import { Book } from '../../src/types/book';

describe('List and Pagination Test', () => {
  it('checks if there are elements in the list', () => {
    cy.fixture('book').then((book: Book) => {
      book.title = 'NEWBOOK';
      cy.createBook(book).then((createdBook: Book) => {
        const bookId = createdBook.id;

        cy.visitLocalhost();

        cy.get('table').should('exist');

        cy.get('table tbody tr').should('have.length.greaterThan', 0);

        cy.deleteBook(bookId).then(() => {
          cy.visitLocalhost();
          cy.contains(bookId).should('not.exist');
        });
      });
    });
  });
});
