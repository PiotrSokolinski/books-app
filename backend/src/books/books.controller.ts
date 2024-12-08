import { ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { Book } from './books.entity';
import { BooksService } from './books.service';
import { CreateBookDto } from './dtos/create-book.dto';
import { Filter, Pagination, Sort } from '../types/books/query';
import { UpdateBookDto } from './dtos/update-book.dto';

@Controller('books')
export class BooksController {
  readonly allowedSortOrders = ['ASC', 'DESC'];
  private readonly logger = new Logger(BooksController.name);

  constructor(private readonly booksService: BooksService) {}

  private setContentRange(
    response: Response,
    pagination: Pagination,
    total: number,
  ) {
    const { from, to } = pagination;
    response.setHeader('Content-Range', `items ${from}-${to}/${total}`);
  }

  // TODO: B13 - Add more documentation and comments across the codebase
  /**
   * Validates and parses the sort parameter to return the field and order.
   *
   * @param {string} sort - A JSON string representing the sort field and order.
   *                         Example: '["id", "ASC"]'.
   * @returns {Sort} - An object containing the sorted field and order. Example: { sort: 'id', order: 'ASC' }.
   * @throws {BadRequestException} - Throws an exception if the sort parameter is not in a valid format or
   *                                  if the sort field or order is not allowed.
   */
  private getSort(sort: string): Sort {
    let sortJSON: [string, 'ASC' | 'DESC'];
    try {
      sortJSON = JSON.parse(sort);
    } catch (error) {
      this.logger.error(`Invalid sort format: ${sort} - ${error.message}`);
      throw new BadRequestException(
        `Invalid sort format. Expected format: sort=[field, ASC|DESC].`,
      );
    }
    const [sortBy, orderBy] = sortJSON;

    if (!this.allowedSortOrders.includes(orderBy)) {
      throw new BadRequestException(
        `Invalid sort order. Use one of [${this.allowedSortOrders.join(', ')}].`,
      );
    }

    return {
      sort: sortBy,
      order: orderBy,
    };
  }

  /**
   * Validates and parses the range parameter to return the pagination details.
   *
   * @param {string} range - A JSON string representing the range values.
   *                         Example: '[0, 50]'.
   * @returns {Pagination} - An object containing the "from" and "to" pagination values. Example: { from: 0, to: 50 }.
   * @throws {BadRequestException} - Throws an exception if the range parameter is not in a valid format
   *                                  or if the range exceeds the maximum limit of 250.
   */
  private getRange(range: string): Pagination {
    let rangeJSON: [number, number];
    try {
      rangeJSON = JSON.parse(range);
    } catch (error) {
      this.logger.error(`Invalid range format: ${range} - ${error.message}`);
      throw new BadRequestException(
        `Invalid range format. Expected format: sort=[from, to].`,
      );
    }

    const [from, to] = rangeJSON;

    if (to - from > 250) {
      throw new BadRequestException(
        `Invalid range field. Maximum range is 250.`,
      );
    }

    return {
      from,
      to,
    };
  }

  /**
   * Validates and parses the filters parameter to return the filter conditions.
   *
   * @param {string} filters - A JSON string representing filter key-value pairs.
   *                           Example: '{"search": "book", "isbnNumber": "123456", "rating": 5}'.
   * @returns {Filter} - An object containing the filter conditions. Example: { search: 'book', isbnNumber: '123456', rating: 5 }.
   * @throws {BadRequestException} - Throws an exception if the filters parameter is not in a valid format.
   */
  private getFilters(filters: string): Filter {
    let filtersJSON: Record<string, string>;
    try {
      filtersJSON = JSON.parse(filters);
    } catch (error) {
      this.logger.error(
        `Invalid filters format: ${filters} - ${error.message}`,
      );
      throw new BadRequestException(
        `Invalid filter format. Expected format: filter={"key": "value"}.`,
      );
    }

    return {
      search: filtersJSON.search || '',
      isbnNumber: filtersJSON.isbnNumber || '',
      rating: Number(filtersJSON.rating) || 0,
    };
  }

  @ApiOperation({ summary: 'Create a new book.' })
  @ApiResponse({
    status: 201,
    description: 'The book has been created.',
    type: Book,
    example: {
      id: 'e34b92f7-9bda-4d8c-9b9b-2e1f68f7b2f3',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbnNumber: '9780743273565',
      numberOfPages: 180,
      rating: 4,
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @ApiOperation({ summary: 'Get a book by ID.' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the book.',
    type: String,
    example: 'c8a9d59f-b7de-47b2-b56c-759e4c4e5314',
  })
  @ApiResponse({
    status: 200,
    description: 'The book was found.',
    type: Book,
    example: {
      id: 'c8a9d59f-b7de-47b2-b56c-759e4c4e5314',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbnNumber: '9780743273565',
      numberOfPages: 180,
      rating: 4,
    },
  })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Book> {
    return this.booksService.findById(id);
  }

  @ApiOperation({ summary: 'Get all books with filters and pagination.' })
  @ApiQuery({
    name: 'filter',
    required: false,
    type: String,
    description: 'Filters for the books (e.g., search term, ISBN, rating).',
    example: '{"search": "Gatsby", "isbnNumber": "9780743273565", "rating": 4}',
  })
  @ApiQuery({
    name: 'range',
    required: false,
    type: String,
    description: 'Pagination range (e.g., [0, 9])',
    example: '[0, 9]',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    type: String,
    description: 'Sorting options (e.g., ["id", "ASC"])',
    example: '["id", "ASC"]',
  })
  @ApiResponse({
    status: 200,
    description: 'The list of books.',
    type: [Book],
    example: [
      {
        id: 'c8a9d59f-b7de-47b2-b56c-759e4c4e5314',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        isbnNumber: '9780743273565',
        numberOfPages: 180,
        rating: 4,
      },
    ],
  })
  @ApiResponse({ status: 400, description: 'Invalid query parameters.' })
  @Get()
  async findAll(
    @Query('filter') filter: string = '{}',
    @Query('range') range: string = '[0,9]',
    @Query('sort') sort: string = '["id","ASC"]',
    @Res({ passthrough: true }) response: Response,
  ): Promise<Book[]> {
    const _sort = this.getSort(sort);
    const pagination = this.getRange(range);
    const filters = this.getFilters(filter);

    const [books, total] = await this.booksService.findAll({
      search: filters.search,
      isbnNumber: filters.isbnNumber,
      rating: filters.rating,
      from: pagination.from,
      to: pagination.to,
      sort: _sort.sort,
      order: _sort.order,
    });

    this.setContentRange(response, pagination, total);

    return books;
  }

  @ApiOperation({ summary: 'Update a book by ID.' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the book.',
    type: String,
    example: 'c8a9d59f-b7de-47b2-b56c-759e4c4e5314',
  })
  @ApiResponse({
    status: 200,
    description: 'The book has been updated.',
    type: Book,
    example: {
      id: 'c8a9d59f-b7de-47b2-b56c-759e4c4e5314',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbnNumber: '9780743273565',
      numberOfPages: 180,
      rating: 4,
    },
  })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update(id, updateBookDto);
  }

  @ApiOperation({ summary: 'Delete a book by ID.' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the book.',
    type: String,
    example: 'c8a9d59f-b7de-47b2-b56c-759e4c4e5314',
  })
  @ApiResponse({
    status: 200,
    description: 'The book has been deleted.',
    example: { message: 'Book deleted successfully.' },
  })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.booksService.delete(id);
  }
}
