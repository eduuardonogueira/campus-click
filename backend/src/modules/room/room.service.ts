import { HttpException, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    console.log('DTO recebido:', createRoomDto);
    // Checagem manual para garantir que capacity é um número válido
    if (typeof createRoomDto.capacity !== 'number' || isNaN(createRoomDto.capacity)) {
      throw new HttpException('Capacity must be a valid number', 400);
    }
    const room = this.roomRepository.create(createRoomDto);
    room.createdAt = new Date();
    room.updatedAt = null;
    return await this.roomRepository.save(room);
  }

  findAll() {
    return this.roomRepository.find();
  }

  async findOne(id: number) {
    const room = await this.roomRepository.findOne({ where: { id } });
    if (!room) {
      throw new HttpException(`Room with ID ${id} not found`, 404);
    }
    return room;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    const room = await this.findOne(id);

  if (updateRoomDto.roomName !== undefined) room.roomName = updateRoomDto.roomName;
    if (updateRoomDto.capacity !== undefined)
      room.capacity = updateRoomDto.capacity;
    if (updateRoomDto.status !== undefined) room.status = updateRoomDto.status;
    if (updateRoomDto.description !== undefined)
      room.description = updateRoomDto.description;
    if (updateRoomDto.imageUrl !== undefined)
      room.imageUrl = updateRoomDto.imageUrl;
    if (updateRoomDto.type !== undefined) room.type = updateRoomDto.type;
    if (updateRoomDto.location !== undefined)
      room.location = updateRoomDto.location;

    room.updatedAt = new Date();

    return this.roomRepository.save(room);
  }

  async remove(id: number) {
    const room = await this.findOne(id);
    if (!room) {
      throw new HttpException(`Room with ID ${id} not found`, 404);
    }
    return await this.roomRepository.delete(id);
  }
}
