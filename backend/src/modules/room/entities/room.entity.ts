import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("Room")
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    locationBloco: string;
    
    // @Column()
    // bookings: Booking[];

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}
