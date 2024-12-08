describe('Book Creation Form', () => {
  it('fills out the form and updates the book', () => {
    const newBook = {
      title: 'EDITME',
      author: 'J.R.R. Tolkien',
      isbnNumber: '1234567890',
      numberOfPages: 1178,
      rating: 5,
    };

    cy.createBook(newBook).then((createdBook) => {
      const bookId = createdBook.id;

      cy.visitLocalhost();

      cy.contains('EDITME');
      cy.contains(bookId).click();

      cy.contains('Edit').click();

      cy.get('input[name="title"]').clear().type('NEWEDITME');

      cy.contains('Save').click();

      cy.url().should('include', `/books/${bookId}`);
      cy.contains('Back to list');
      cy.contains('NEWEDITME');

      cy.deleteBook(bookId).then(() => {
        cy.visitLocalhost();
        cy.contains(bookId).should('not.exist');
      });
    });
  });
});
