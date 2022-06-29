import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

export enum BookStatus {
    UNREAD = "unread",
    READ = 'read',
    INPORGRESS = 'inporgress'
}

@Entity()
export class Books extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name: string

    @Column()
    icon: string

    @Column()
    status: BookStatus

    @Column()
    description: string
}
