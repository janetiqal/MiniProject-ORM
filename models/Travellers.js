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
            //only allows letters doesnt allow spaces between first and last name
            //write a regex for this
            // validate:{
            //     isAlpha:true
            // }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // prevents duplicate email addresses in DB
            unique: true,
            validate:{
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
              len: [8]
            }
          },
          username: {
            type: DataTypes.STRING,
            // only can have numbers and letter
            validate: {
              isAlphanumeric: true,
            },
            unique: true,
            allowNull: false,
          },
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