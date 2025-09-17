import * as dotenv from 'dotenv';
dotenv.config();
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomModule } from '../room/room.module';
import { Room } from '../room/entities/room.entity';
import { User } from '../user/entities/user.entity';
import configuration from '../../config/configuration';
import { Amenity } from 'src/modules/amenities/entities/amenity.entity';
import { UserModule } from '../user/user.module';
import { AmenitiesModule } from '../amenities/amenities.module';
import { RoomAmenitiesModule } from '../room-amenities/room-amenities.module';
import { RoomAmenity } from '../room-amenities/entities/room-amenity.entity';

const config = configuration();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.dbHost,
      port: config.dbPort,
      username: config.dbUser,
      password: config.dbPass,
      database: config.dbName,
      entities: [Room, User, Amenity, RoomAmenity],
      synchronize: true, // Ao invés de usar migrations use synchronize, pra prod usar migrations e setar como false
      ssl: { rejectUnauthorized: false },
    }),
    RoomModule, UserModule, AmenitiesModule, RoomAmenitiesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
