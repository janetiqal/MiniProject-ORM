const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connect');

class Trip extends Model {}

Trip.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        trip_budget: {
            type: DataTypes.INTEGER,
            allowNull: true,
            //only numbers in this field
            validate:{
                isNumeric:true
            }
        },
        traveller_amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
             //only numbers in this field
             validate:{
                isNumeric:true
            }
        },
        traveller_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'traveller',
                key: 'id',
                unique:false
            }
        },
        location_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'location',
                key: 'id',
                unique:false
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'trip',
    }
);

module.exports = Trip;