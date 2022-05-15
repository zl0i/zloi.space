
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
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        markdown: {
            type: DataTypes.STRING,
            unique: false
        },
        html: {
            type: DataTypes.STRING,
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

// (async function () {
//     Instructions.sync({alter: true})
// })()
