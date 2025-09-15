import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Room')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomName: string;

  @Column()
  capacity: number;

  @Column()
  location: string;

  @Column()
  status: string; // por enquanto string depois mudo pra enum

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'text', nullable: true })
  imageUrl: string | null;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date | null;

  @Column()
  type: string; // por enquanto string depois mudo pra enum
}
