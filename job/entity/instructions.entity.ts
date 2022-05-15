
import { sequelize } from "../src/db";
import { DataTypes, Model } from 'sequelize';

export class Instructions extends Model {
    declare id: number
    declare name: string
    declare markdown: string
    declare html: string
}

Instructions.init(
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
        markdown: {
            type: DataTypes.STRING(50000),
            unique: false
        },
        html: {
            type: DataTypes.STRING(50000),
            unique: false
        },
    },
    {        
        sequelize,
        modelName: 'Instructions',
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    }
);
