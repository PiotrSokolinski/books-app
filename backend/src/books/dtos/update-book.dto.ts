import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends CreateBookDto {
  @ApiProperty({
    description: 'The unique identifier of the book (UUID)',
    example: 'e34b92f7-9bda-4d8c-9b9b-2e1f68f7b2f3',
  })
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  id: string;
}
