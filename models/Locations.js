const { Model, DataTypes } = require('sequelize');
const sequelize = require("../config/connect");

class Location extends Model {}

Location.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        location_name: {
            type: DataTypes.STRING,
            allowNull: false,
            // only allows letters
            // validate:{
            //     isAlpha:true
            // }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'location',
    }
);

module.exports = Location;