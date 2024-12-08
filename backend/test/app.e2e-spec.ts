import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../src/app.module';
import { Book } from '../src/books/books.entity';
import { BooksService } from '../src/books/books.service';
import { UpdateBookDto } from '../src/books/dtos/update-book.dto';

// TODO: B2 - Add more e2e tests across the application
describe('AppController (e2e)', () => {
  let app: INestApplication;
  let booksService: BooksService;

  const testBook: Book = {
    id: 'e34b92f7-9bda-4d8c-9b9b-2e1f68f7b2f3',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbnNumber: '9780743273565',
    numberOfPages: 180,
    rating: 4,
  } as Book;

  const updatedBookData: UpdateBookDto = {
    id: 'e34b92f7-9bda-4d8c-9b9b-2e1f68f7b2f3',
    title: 'The Great Gatsby (Updated)',
    author: 'F. Scott Fitzgerald',
    isbnNumber: '9780743273565',
    numberOfPages: 200,
    rating: 5,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    booksService = moduleFixture.get<BooksService>(BooksService);
  });

  it('should create a new book (POST /books)', async () => {
    jest.spyOn(booksService, 'create').mockResolvedValue(testBook);

    const response = await request(app.getHttpServer())
      .post('/books')
      .send({
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        isbnNumber: '9780743273565',
        numberOfPages: 180,
        rating: 4,
      })
      .expect(201);

    expect(response.body).toEqual(testBook);
  });

  it('should get all books (GET /books)', async () => {
    const books = [testBook];
    jest
      .spyOn(booksService, 'findAll')
      .mockResolvedValue([books, books.length]);

    const response = await request(app.getHttpServer())
      .get('/books')
      .expect(200);

    expect(response.body).toEqual(books);
  });

  it('should get a book by ID (GET /books/:id)', async () => {
    jest.spyOn(booksService, 'findById').mockResolvedValue(testBook);

    const response = await request(app.getHttpServer())
      .get(`/books/${testBook.id}`)
      .expect(200);

    expect(response.body).toEqual(testBook);
  });

  it('should update a book (PUT /books/:id)', async () => {
    jest
      .spyOn(booksService, 'update')
      .mockResolvedValue(updatedBookData as any);

    const response = await request(app.getHttpServer())
      .put(`/books/${testBook.id}`)
      .send(updatedBookData)
      .expect(200);

    expect(response.body).toEqual(updatedBookData);
  });

  it('should delete a book (DELETE /books/:id)', async () => {
    jest
      .spyOn(booksService, 'delete')
      .mockResolvedValue({ message: 'Book deleted successfully.' });

    const response = await request(app.getHttpServer())
      .delete(`/books/${testBook.id}`)
      .expect(200);

    expect(response.body).toEqual({ message: 'Book deleted successfully.' });
  });

  afterAll(async () => {
    await app.close();
  });
});
