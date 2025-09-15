import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Booking')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  roomId: number;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
