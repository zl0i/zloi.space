import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

export enum BookStatus {
    UNREAD = "unread",
    READ = 'read',
    INPORGRESS = 'inprogress'
}

@Entity()
export class Books extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name: string

    @Column({ default: '' })
    icon: string

    @Column()
    infoLink: string

    @Column()
    status: BookStatus

    @Column({ length: 5000 })
    description: string
}
