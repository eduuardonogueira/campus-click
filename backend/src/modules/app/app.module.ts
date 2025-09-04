import * as dotenv from 'dotenv';
dotenv.config();
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomModule } from '../room/room.module';
import { Room } from '../room/entities/room.entity';
import { Booking } from '../booking/entities/booking.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: 'avnadmin',
      password: process.env.PASSWORD,
      database: process.env.DB_NAME,
      entities: [Room, Booking, User],
      synchronize: true,
    }),
    RoomModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
