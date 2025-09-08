import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("Amenity")
export class Amenity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    icon: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

}
