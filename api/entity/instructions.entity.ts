import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Instructions extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ length: 50000 })
    markdown: string

    @Column({ length: 50000 })
    html: string
}

