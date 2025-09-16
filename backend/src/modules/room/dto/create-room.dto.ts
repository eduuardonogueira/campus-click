import { IsNumber, IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { Status } from '../enum/status.enum';
import { Type as RoomType } from '../enum/type.enum'; // Renomeado para evitar conflito com 'Type' do class-transformer

export class CreateRoomDto {
  @IsNotEmpty()
  roomName: string;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false }, { message: 'Duration must be a valid number' })
  duration: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber({ allowNaN: false }, { message: 'Capacity must be a valid number' })
  capacity: number;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  @IsEnum(Status, { message: 'Status must be one of: available, scheduled, maintenance' })
  status: Status;

  @IsOptional()
  @IsString()
  description: string | null;

  @IsOptional()
  @IsString()
  imageUrl: string | null;

  @IsNotEmpty()
  @IsEnum(RoomType, { message: 'Type must be one of: room, laboratory' })
  type: RoomType;
}
