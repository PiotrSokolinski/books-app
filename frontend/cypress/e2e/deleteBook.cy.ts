import { Book } from '../../src/types/book';

describe('Book Creation Form', () => {
  it('fills out the form and updates the book', () => {
    const newBook: Omit<Book, 'id'> = {
      title: 'REMOVEME',
      author: 'Test Author',
      isbnNumber: '1234567890',
      numberOfPages: 100,
      rating: 4,
    };

    cy.createBook(newBook).then((createdBook) => {
      const bookId = createdBook.id;

      cy.visitLocalhost();
      cy.contains(bookId).click();

      cy.contains('Edit').click();

      cy.contains('Delete').click();
      cy.contains('Confirm').click();

      cy.url().should('include', '/books');
      cy.get('body').should('not.contain', 'REMOVEME');
    });
  });
});
