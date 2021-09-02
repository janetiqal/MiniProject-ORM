const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connect');


class Traveller extends Model {}

Traveller.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            //only allows letters 
            validate:{
                is:["^[a-z]+$",'i']
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                isEmail: true,
            }
        }
    },
    {
        sequelize,

        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'traveller',
    }
);

module.exports = Traveller;