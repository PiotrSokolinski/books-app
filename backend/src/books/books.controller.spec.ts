import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Book } from './books.entity';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { UpdateBookDto } from './dtos/update-book.dto';

// TODO: B1 - Add more unit tests across the application
describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  beforeEach(async () => {
    const mockBooksService = {
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: mockBooksService,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call findById and return a book', async () => {
    const book: Book = {
      id: 'e34b92f7-9bda-4d8c-9b9b-2e1f68f7b2f3',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbnNumber: '9780743273565',
      numberOfPages: 180,
      rating: 4,
    } as Book;

    jest.spyOn(service, 'findById').mockResolvedValue(book);

    const result = await controller.findOne(
      'e34b92f7-9bda-4d8c-9b9b-2e1f68f7b2f3',
    );
    expect(result).toEqual(book);
  });

  it('should call findById with wrong id return an error', async () => {
    jest.spyOn(service, 'findById').mockResolvedValue(null);

    const result = await controller.findOne('123');
    expect(result).toBeNull();
  });

  it('should call findById and return null if book not found', async () => {
    jest.spyOn(service, 'findById').mockResolvedValue(null);

    const result = await controller.findOne('non-existing-id');
    expect(result).toBeNull();
  });

  it('should call findAll and return an array of books', async () => {
    const books: Book[] = [
      {
        id: 'e34b92f7-9bda-4d8c-9b9b-2e1f68f7b2f3',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        isbnNumber: '9780743273565',
        numberOfPages: 180,
        rating: 4,
      },
      {
        id: 'ab92f7-9bda-4d8c-9b9b-2e1f68f7b2f4',
        title: '1984',
        author: 'George Orwell',
        isbnNumber: '9780451524935',
        numberOfPages: 328,
        rating: 5,
      },
    ] as Book[];

    jest.spyOn(service, 'findAll').mockResolvedValue([books, books.length]);

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      setHeader: jest.fn().mockReturnThis(),
    };

    const mockQueryParams = {
      filter: '{"author": "F. Scott Fitzgerald"}',
      range: '[0,10]',
      sort: '["id", "ASC"]',
    };
    const result = await controller.findAll(
      mockQueryParams.filter,
      mockQueryParams.range,
      mockQueryParams.sort,
      mockResponse as any,
    );
    expect(result).toEqual(books);
  });

  it('should call update and return updated book', async () => {
    const book: Book = {
      id: 'e34b92f7-9bda-4d8c-9b9b-2e1f68f7b2f3',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbnNumber: '9780743273565',
      numberOfPages: 180,
      rating: 4,
    } as Book;
    const updateDto: UpdateBookDto = {
      id: book.id,
      title: book.title,
      author: book.author,
      isbnNumber: book.isbnNumber,
      numberOfPages: book.numberOfPages,
      rating: book.rating,
    };

    jest.spyOn(service, 'update').mockResolvedValue(book);

    const result = await controller.update(book.id, updateDto);
    expect(result).toEqual(book);
  });

  it('should return an error when trying to update a non-existent book', async () => {
    const updateDto: UpdateBookDto = {
      id: 'non-existing-id',
      title: 'Non-existent Book',
      author: 'Unknown Author',
      isbnNumber: '1234567890',
      numberOfPages: 0,
      rating: 1,
    };

    jest.spyOn(service, 'update').mockResolvedValue(null);

    const result = await controller.update('non-existing-id', updateDto);
    expect(result).toBeNull();
  });

  it('should call delete and return success message', async () => {
    const successMessage = { message: 'Book deleted successfully.' };
    jest.spyOn(service, 'delete').mockResolvedValue(successMessage);

    const result = await controller.delete(
      'e34b92f7-9bda-4d8c-9b9b-2e1f68f7b2f3',
    );
    expect(result).toEqual(successMessage);
  });

  it('should return an error message when deleting a non-existent book', async () => {
    jest.spyOn(service, 'delete').mockResolvedValue(null);

    const result = await controller.delete('non-existing-id');
    expect(result).toBeNull();
  });

  it('should call create and return the created book', async () => {
    const newBook: Book = {
      id: 'e34b92f7-9bda-4d8c-9b9b-2e1f68f7b2f3',
      title: 'New Book',
      author: 'New Author',
      isbnNumber: '1234567890',
      numberOfPages: 300,
      rating: 5,
    } as Book;
    const createDto = {
      title: 'New Book',
      author: 'New Author',
      isbnNumber: '1234567890',
      numberOfPages: 300,
      rating: 5,
    };

    jest.spyOn(service, 'create').mockResolvedValue(newBook);

    const result = await controller.create(createDto);
    expect(result).toEqual(newBook);
  });

  it('should throw a BadRequestException if findAll is called with invalid query parameters', async () => {
    const invalidQueryParams = {
      filter: 'invalid-filter',
      range: '[0,10]',
      sort: '["rating", "UP"]',
    };

    jest
      .spyOn(service, 'findAll')
      .mockImplementation(() => Promise.reject(new BadRequestException()));

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    try {
      await controller.findAll(
        invalidQueryParams.filter,
        invalidQueryParams.range,
        invalidQueryParams.sort,
        response as any,
      );
    } catch (error) {
      expect(error.response.statusCode).toBe(400);
      expect(error.response.message).toBe(
        `Invalid sort order. Use one of [ASC, DESC].`,
      );
    }
  });
});
