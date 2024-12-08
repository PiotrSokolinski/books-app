describe('List and Pagination Test', () => {
  it('checks if there are elements in the list', () => {
    const newBook = {
      title: 'NEWBOOK',
      author: 'J.R.R. Tolkien',
      isbnNumber: '1234567890',
      numberOfPages: 1178,
      rating: 5,
    };

    cy.createBook(newBook).then((createdBook) => {
      const bookId = createdBook.id;
      cy.createBook(newBook);

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
