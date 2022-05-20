
import { sequelize } from "../src/db";
import { DataTypes, Model } from 'sequelize';

export enum BookStatus {
    UNREAD = "unread",
    READ = "read",
    INPORGRESS = "inprogress"
}

export class Books extends Model {
    declare id: number
    declare name: string
    declare icon: string
    declare status: BookStatus
    declare description: string
}

Books.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        icon: {
            type: DataTypes.STRING(500),
            unique: false
        },
        status: {
            type: DataTypes.STRING,
            unique: false
        },
        description: {
            type: DataTypes.STRING(5000),
            unique: false
        },
    },
    {
        sequelize,
        modelName: 'Books',
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
    }
);
