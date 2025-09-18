import { HttpException, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async findAll() {
    const findedRooms = await this.roomRepository.find({
      relations: ['roomAmenities', 'roomAmenities.amenity'],
    });
    if (!findedRooms) {
      throw new HttpException(`Rooms Not Found`, 404);
    }
    return findedRooms;
  }

  async findOne(id: number) {
    const room = await this.roomRepository.findOne({
      where: { id },
      relations: ['roomAmenities', 'roomAmenities.amenity'],
    });
    if (!room) {
      throw new HttpException(`Room with ID ${id} not found`, 404);
    }
    return room;
  }

  async create(createRoomDto: CreateRoomDto) {
    const room = this.roomRepository.create({
      ...createRoomDto,
      createdAt: new Date(),
    });
    return await this.roomRepository.save(room);
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    const room = await this.roomRepository.preload({
      id,
      ...updateRoomDto,
      updatedAt: new Date(),
    });

    if (!room) {
      throw new HttpException(`Room with ID ${id} not found`, 404);
    }

    return this.roomRepository.save(room);
  }

  async remove(id: number) {
    const foundRoom = await this.findOne(id);
    return this.roomRepository.delete(foundRoom.id);
  }
}
