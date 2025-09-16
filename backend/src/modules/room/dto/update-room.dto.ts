import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './create-room.dto';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Status } from '../enum/status.enum';
import { Type as RoomType } from '../enum/type.enum'; // Renomeado para evitar conflito com 'Type' do class-transformer

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
  @IsOptional()
  @IsString()
  roomName: string;

  @IsOptional()
  @IsNumber({ allowNaN: false }, { message: 'Duration must be a valid number' })
  duration: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ allowNaN: false }, { message: 'Capacity must be a valid number' })
  capacity: number;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsEnum(Status, { message: 'Status must be one of: available, scheduled, maintenance' })
  status: Status;

  @IsOptional()
  @IsString()
  description: string | null;

  @IsOptional()
  @IsString()
  imageUrl: string | null;

  @IsOptional()
  @IsEnum(RoomType, { message: 'Type must be one of: room, laboratory' })
  type: RoomType;
}
