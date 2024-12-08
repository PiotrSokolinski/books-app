import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Book } from './books.entity';
import { BooksService } from './books.service';
import { Query } from '../types/books/query';
import { UpdateBookDto } from './dtos/update-book.dto';

describe('BooksService', () => {
  let service: BooksService;
  let repository: Repository<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findOneBy: jest.fn(),
            findOne: jest.fn(),
            createQueryBuilder: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    repository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create and return a new book', async () => {
    const bookData: Partial<Book> = {
      title: 'Moby Dick',
      author: 'Herman Melville',
      isbnNumber: '9781853260087',
      numberOfPages: 635,
      rating: 5,
    };

    const book: Book = { ...bookData, id: '1' } as Book;

    const saveSpy = jest.spyOn(repository, 'save').mockResolvedValue(book);
    const createSpy = jest.spyOn(repository, 'create').mockReturnValue(book);

    const result = await service.create(bookData);

    expect(result).toEqual(book);
    expect(createSpy).toHaveBeenCalledWith(bookData);
    expect(saveSpy).toHaveBeenCalledWith(book);
  });

  it('should update and return the updated book', async () => {
    const updateDto: UpdateBookDto = {
      id: 'e34b92f7-9bda-4d8c-9b9b-2e1f68f7b2f3',
      title: 'Updated Title',
      author: 'Updated Author',
      isbnNumber: '1234567890',
      numberOfPages: 100,
      rating: 4,
    };

    const updatedBook: Book = { id: '1', ...updateDto } as Book;

    const updateSpy = jest
      .spyOn(repository, 'update')
      .mockResolvedValue({ affected: 1 } as any);
    const findOneBySpy = jest
      .spyOn(repository, 'findOneBy')
      .mockResolvedValue(updatedBook);

    const result = await service.update('1', updateDto);

    expect(result).toEqual(updatedBook);
    expect(updateSpy).toHaveBeenCalledWith('1', updateDto);
    expect(findOneBySpy).toHaveBeenCalledWith({ id: '1' });
  });

  it('should throw NotFoundException if book not found when updating', async () => {
    const updateDto: UpdateBookDto = {
      id: 'e34b92f7-9bda-4d8c-9b9b-2e1f68f7b2f3',
      title: 'Updated Title',
      author: 'Updated Author',
      isbnNumber: '1234567890',
      numberOfPages: 100,
      rating: 4,
    };

    const updateSpy = jest
      .spyOn(repository, 'update')
      .mockResolvedValue({ affected: 0 } as any);

    try {
      await service.update('1', updateDto);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
      expect(e.response.message).toBe('Book not found.');
    }
    expect(updateSpy).toHaveBeenCalledWith('1', updateDto);
  });

  it('should delete and return a success message', async () => {
    const successMessage = { message: 'Book with ID 1 successfully deleted.' };

    const deleteSpy = jest
      .spyOn(repository, 'delete')
      .mockResolvedValue({ affected: 1 } as any);

    const result = await service.delete('1');

    expect(result).toEqual(successMessage);
    expect(deleteSpy).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException if book not found when deleting', async () => {
    const deleteSpy = jest
      .spyOn(repository, 'delete')
      .mockResolvedValue({ affected: 0 } as any);

    try {
      await service.delete('1');
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
      expect(e.response.message).toBe('Book not found.');
    }
    expect(deleteSpy).toHaveBeenCalledWith('1');
  });

  it('should return all books with given query parameters', async () => {
    const query: Query = {
      search: 'Moby Dick',
      isbnNumber: '9781853260087',
      rating: 5,
      from: 0,
      to: 9,
      sort: 'title',
      order: 'ASC',
    };
    const books: Book[] = [
      {
        id: 'e34b92f7-9bda-4d8c-9b9b-2e1f68f7b2f3',
        title: 'Moby Dick',
        author: 'Herman Melville',
        isbnNumber: '9781853260087',
        numberOfPages: 635,
        rating: 5,
      },
    ] as Book[];
    const total = 1;

    const queryBuilderMock = {
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([books, total]),
    };

    jest
      .spyOn(repository, 'createQueryBuilder')
      .mockReturnValue(queryBuilderMock as any);

    const result = await service.findAll(query);

    expect(result).toEqual([books, total]);
    expect(queryBuilderMock.andWhere).toHaveBeenCalledWith(
      'book.isbnNumber = :isbnNumber',
      { isbnNumber: '9781853260087' },
    );
    expect(queryBuilderMock.andWhere).toHaveBeenCalledWith(
      'book.rating = :rating',
      { rating: 5 },
    );
    expect(queryBuilderMock.orderBy).toHaveBeenCalledWith('book.title', 'ASC');
    expect(queryBuilderMock.skip).toHaveBeenCalledWith(0);
    expect(queryBuilderMock.take).toHaveBeenCalledWith(10);
    expect(queryBuilderMock.getManyAndCount).toHaveBeenCalled();
  });

  it('should throw NotFoundException if no books found when searching', async () => {
    const query: Query = { search: 'Nonexistent Book' } as Query;
    const queryBuilderMock = {
      andWhere: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
      orderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
    };

    jest
      .spyOn(repository, 'createQueryBuilder')
      .mockReturnValue(queryBuilderMock as any);

    const result = await service.findAll(query);
    expect(result).toEqual([[], 0]);
  });

  it('should return a book by ID', async () => {
    const book: Book = {
      id: '1',
      title: 'Moby Dick',
      author: 'Herman Melville',
      isbnNumber: '9781853260087',
      numberOfPages: 635,
      rating: 5,
    } as Book;

    const findOneSpy = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(book);

    const result = await service.findById('1');
    expect(result).toEqual(book);
    expect(findOneSpy).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('should throw NotFoundException if book not found by ID', async () => {
    const findOneSpy = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(null);

    try {
      await service.findById('1');
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
      expect(e.response.message).toBe('Book not found.');
    }
    expect(findOneSpy).toHaveBeenCalledWith({ where: { id: '1' } });
  });
});
