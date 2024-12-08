import { Book } from '../../src/types/book';

declare global {
  namespace Cypress {
    interface Chainable {
      visitLocalhost(): Chainable<void>;
      createBook(book: Omit<Book, 'id'>): Chainable<Book>;
      deleteBook(bookId: string): Chainable<Record<string, string>>;
    }
  }
}

export {};
