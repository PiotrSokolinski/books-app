import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    description: 'The title of the book',
    example: 'The Great Gatsby',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The author of the book',
    example: 'F. Scott Fitzgerald',
  })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    description: 'The ISBN number of the book',
    example: '9780743273565',
  })
  @IsString()
  @IsNotEmpty()
  isbnNumber: string;

  @ApiProperty({
    description: 'The number of pages in the book',
    example: 180,
  })
  @IsInt()
  @IsNotEmpty()
  numberOfPages: number;

  @ApiProperty({
    description: 'The rating of the book, from 1 to 5',
    example: 4,
    minimum: 1,
    maximum: 5,
  })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  rating: number;
}
