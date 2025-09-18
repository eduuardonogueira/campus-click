import { HttpException, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { AvailabilityService } from '../availability/availability.service';
import { AppointmentService } from '../appointments/appointment.service';
import { RoomDetailsDto } from './dto/room-details.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    private readonly availabilityService: AvailabilityService,
    private readonly appointmentService: AppointmentService,
  ) {}
  async getRoomDetails(id: number): Promise<RoomDetailsDto> {
    const room = await this.findOne(id);
    if (!room) {
      throw new HttpException(`Room with ID ${id} not found`, 404);
    }
    const availability = await this.availabilityService.findAll();
    const roomAvailability = availability.filter((a) => a.room.id === id);
    const appointments = await this.appointmentService.findAll();
    const roomAppointments = appointments.filter((ap) => ap.room.id === id);
    return {
      room,
      availability: roomAvailability,
      appointments: roomAppointments,
    };
  }

  async findAll() {
    const findedRooms = await this.roomRepository.find();
    if (!findedRooms) {
      throw new HttpException(`Rooms Not Found`, 404);
    }
    return findedRooms;
  }

  async findOne(id: number) {
    const room = await this.roomRepository.findOne({ where: { id } });
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
