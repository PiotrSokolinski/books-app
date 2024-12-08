import axios from 'axios';

import { Book } from '../src/books/books.entity';

const API_BASE_URL = 'http://localhost:5000';

const deleteBook = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/books/${id}`);
};

const createBook = async (): Promise<Book> => {
  const newBook = {
    title: 'New Book',
    author: 'Author Name',
    isbnNumber: '1234567890',
    numberOfPages: 100,
    rating: 5,
  };
  const response = await axios.post(`${API_BASE_URL}/books`, newBook);
  return response.data;
};

// TODO: B3 - Add more API smoke tests
describe('API Smoke Tests', () => {
  it('should GET /books', async () => {
    const book = await createBook();
    const response = await axios.get(`${API_BASE_URL}/books`);
    expect(response.status).toBe(200);
    expect(response.data.length).toBeGreaterThan(0);
    expect(Array.isArray(response.data)).toBe(true);

    await deleteBook(book.id);
  });

  it('should POST /books', async () => {
    const newBook = {
      title: 'New Book',
      author: 'Author Name',
      isbnNumber: '1234567890',
      numberOfPages: 100,
      rating: 5,
    };

    const response = await axios.post(`${API_BASE_URL}/books`, newBook);
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('id');

    await deleteBook(response.data.id);
  });

  it('should GET /books/:id', async () => {
    const book = await createBook();

    const response = await axios.get(`${API_BASE_URL}/books/${book.id}`);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id', response.data.id);

    await deleteBook(book.id);
  });

  it('should PUT /books/:id', async () => {
    const book = await createBook();
    const updatedBook = {
      ...book,
      title: 'Updated Book',
    };
    const response = await axios.put(
      `${API_BASE_URL}/books/${book.id}`,
      updatedBook,
    );
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('title', 'Updated Book');

    await deleteBook(book.id);
  });

  it('should DELETE /books/:id', async () => {
    const book = await createBook();
    const responseDelete = await axios.delete(
      `${API_BASE_URL}/books/${book.id}`,
    );
    expect(responseDelete.status).toBe(200);
    expect(responseDelete.data).toHaveProperty(
      'message',
      `Book with ID ${book.id} successfully deleted.`,
    );
  });
});
