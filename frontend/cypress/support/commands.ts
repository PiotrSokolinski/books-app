/// <reference types="cypress" />

import { Book } from '../../src/types/book';

Cypress.Commands.add('visitLocalhost', () => {
  cy.visit('');
});

Cypress.Commands.add('createBook', (book: Book) => {
  const API_BASE_URL = Cypress.env('apiBaseUrl');

  return cy
    .request({
      method: 'POST',
      url: `${API_BASE_URL}/books`,
      body: book,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      expect(response.status).to.eq(201);
      console.log(response.body);
      return response.body;
    });
});

Cypress.Commands.add('deleteBook', (bookId: string) => {
  const API_BASE_URL = Cypress.env('apiBaseUrl');
  console.log({ bookId });
  return cy
    .request({
      method: 'DELETE',
      url: `${API_BASE_URL}/books/${bookId}`,
    })
    .then((response) => {
      console.log({ response: response.status });
      expect(response.status).to.eq(200);
      return response.body;
    });
});
