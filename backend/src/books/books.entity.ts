import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { IsString, IsInt, IsUUID, Min, Max } from 'class-validator';

@Entity()
@Index('IDX_BOOK_TITLE', ['title'])
@Index('IDX_BOOK_AUTHOR', ['author'])
@Index('IDX_BOOK_ISBNUMBER', ['isbnNumber'])
@Index('IDX_BOOK_RATING', ['rating'])
export class Book {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  author: string;

  @Column()
  @IsString()
  isbnNumber: string;

  @Column('int')
  @IsInt()
  numberOfPages: number;

  @Column('int')
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
}
