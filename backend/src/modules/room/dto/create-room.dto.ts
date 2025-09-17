import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Status } from '../enum/status.enum';
import { Type as RoomType } from '../enum/type.enum'; // Renomeado para evitar conflito com 'Type' do class-transformer

export class CreateRoomDto {
  @ApiProperty({ example: 'Sala 101' })
  @IsNotEmpty()
  roomName: string;

  @ApiProperty({ example: 30 })
  @IsNotEmpty()
  @IsNumber({ allowNaN: false }, { message: 'Duration must be a valid number' })
  duration: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber({ allowNaN: false }, { message: 'Capacity must be a valid number' })
  capacity: number;

  @ApiProperty({ example: 'Bloco A' })
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: 'disponivel' })
  @IsNotEmpty()
  @IsEnum(Status, {
    message: 'Status must be one of: available, scheduled, maintenance',
  })
  status: Status;

  @ApiPropertyOptional({ example: 'Sala com projetor' })
  @IsOptional()
  @IsString()
  description: string | null;

  @ApiPropertyOptional({ example: 'https://imagem.com/sala.jpg' })
  @IsOptional()
  @IsString()
  imageUrl: string | null;

  @ApiProperty({ example: 'aula' })
  @IsNotEmpty()
  @IsEnum(RoomType, { message: 'Type must be one of: room, laboratory' })
  type: RoomType;
}
