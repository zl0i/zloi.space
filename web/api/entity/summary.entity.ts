
import { sequelize } from "../src/db";
import { DataTypes, Model } from 'sequelize';


export class Summary extends Model {
    declare id: number
    declare key: string
    declare position: string
    declare language: string
    declare value: unknown
}

Summary.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        key: {
            type: DataTypes.STRING,
            unique: false
        },
        position: {
            type: DataTypes.STRING,
            unique: false
        },
        language: {
            type: DataTypes.STRING,
            unique: false
        },
        value: {
            type: DataTypes.JSON,
            unique: false
        },
    },
    {
        sequelize,
        modelName: 'Summary',
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    }
);
