import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

export enum BookStatus {
    UNREAD = "unread",
    READ = 'read',
    INPORGRESS = 'inporgress'
}

@Entity()
export class Links extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name: string

    @Column({ type: "bytea" })
    blob: string

    @Column({ unique: true })
    link: string

    @Column({ default: '' })
    type: string
}
