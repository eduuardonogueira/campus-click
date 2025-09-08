import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room) private roomRepository: Repository<Room>) {}
  
  async create(createRoomDto: CreateRoomDto) {
    let room = this.roomRepository.create(createRoomDto);
    room.createdAt = new Date();
    room.updatedAt = new Date();
    return await this.roomRepository.save(room);
  }

  findAll() {
    return this.roomRepository.find();
  }

  async findOne(id: number) {
    const room = await this.roomRepository.findOne({ where: { id } });
    if (!room) {
      throw new Error(`Room with ID ${id} not found`);
    }
    return room;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    // Verifica se a sala existe
    const room = await this.roomRepository.findOne({ where: { id } });
    if (!room) {
      throw new Error(`Room with ID ${id} not found`);
    }

    if (updateRoomDto.name !== undefined) room.name = updateRoomDto.name;
    if (updateRoomDto.locationBloco !== undefined) room.locationBloco = updateRoomDto.locationBloco;
    if (updateRoomDto.locationAndar !== undefined) room.locationAndar = updateRoomDto.locationAndar;
    if (updateRoomDto.amenities !== undefined) room.amenities = updateRoomDto.amenities;

    room.updatedAt = new Date();

    return this.roomRepository.save(room);
  }

  async remove(id: number) {
    const room = await this.roomRepository.findOne({ where: { id } });
    if (!room) {
      throw new Error(`Room with ID ${id} not found`);
    }
    return await this.roomRepository.delete(id);
  }

  
}
