import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room) private roomRepository: Repository<Room>) {}
  
  create(createRoomDto: CreateRoomDto) {
    let room = this.roomRepository.create(createRoomDto);
    room.createdAt = new Date();
    room.updatedAt = new Date();
    return this.roomRepository.save(room);
  }

  findAll() {
    return this.roomRepository.find();
  }

  findOne(id: number) {
    return this.roomRepository.findOne({ where: { id } });
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return this.roomRepository.update(id, updateRoomDto);
  }

  remove(id: number) {
    return this.roomRepository.delete(id);
  }

  
}
