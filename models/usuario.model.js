const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define(
    'Usuario',
    {
        nome: {
            type: DataTypes.STRING,
        },

        email: {
            type: DataTypes.STRING,
        },

        idade: {
            type: DataTypes.INTEGER,
        }
    }
);

module.exports = Usuario;