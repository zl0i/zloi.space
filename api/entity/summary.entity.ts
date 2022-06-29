import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn } from "typeorm";

@Entity()
export class Summary extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @PrimaryColumn()
    key: string

    @PrimaryColumn({ default: "" })
    position: string

    @PrimaryColumn({ default: "" })
    language: string

    @Column({ type: "json" })
    value: string
}