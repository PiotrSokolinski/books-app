import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Book } from './books.entity';
import { Query } from '../types/books/query';
import { UpdateBookDto } from './dtos/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(bookData: Partial<Book>): Promise<Book> {
    const book = this.bookRepository.create(bookData);
    return this.bookRepository.save(book);
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const { affected } = await this.bookRepository.update(id, updateBookDto);
    if (affected === 0) {
      throw new NotFoundException('Book not found.');
    }

    return this.bookRepository.findOneBy({ id });
  }

  async delete(id: string): Promise<{ message: string }> {
    const { affected } = await this.bookRepository.delete(id);
    if (affected === 0) {
      throw new NotFoundException('Book not found.');
    }

    return { message: `Book with ID ${id} successfully deleted.` };
  }

  async findAll(query: Query): Promise<[Book[], number]> {
    const {
      search,
      isbnNumber,
      rating,
      from = 0,
      to = 9,
      sort = 'id',
      order = 'ASC',
    } = query;
    const queryBuilder = this.bookRepository.createQueryBuilder('book');

    if (search) {
      queryBuilder.andWhere(
        '(book.title ILIKE :search OR book.author ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (isbnNumber) {
      queryBuilder.andWhere('book.isbnNumber = :isbnNumber', {
        isbnNumber,
      });
    }

    if (rating) {
      queryBuilder.andWhere('book.rating = :rating', { rating });
    }

    queryBuilder.orderBy(`book.${sort}`, order);
    queryBuilder.skip(from).take(to - from + 1);

    return queryBuilder.getManyAndCount();
  }

  async findById(id: string): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException('Book not found.');
    }

    return book;
  }
}
