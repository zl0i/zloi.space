
import { sequelize } from "../src/db";
import { DataTypes, Model } from 'sequelize';

export enum BookStatus {
    UNREAD,
    READ,
    INPORGRESS
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
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        icon: {
            type: DataTypes.STRING,
            unique: false
        },
        status: {
            type: DataTypes.STRING,
            unique: false
        },
        description: {
            type: DataTypes.STRING,
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
