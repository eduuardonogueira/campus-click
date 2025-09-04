import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingService {
  constructor(@InjectRepository(Booking) private bookingRepository: Repository<Booking>) {}
  
  create(createBookingDto: CreateBookingDto) {
    return this.bookingRepository.save(createBookingDto);
  }

  findAll() {
    return this.bookingRepository.find();
  }

  findOne(id: number) {
    return this.bookingRepository.findOne({ where: { id } });
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return this.bookingRepository.update(id, updateBookingDto);
  }

  remove(id: number) {
    return this.bookingRepository.delete(id);
  }
}
