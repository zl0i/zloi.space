import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique } from "typeorm";

@Entity()
@Unique(["key", "language"])
export class Summary extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    key: string

    @Column()
    language: string

    @Column({ type: "json" })
    value: unknown
}