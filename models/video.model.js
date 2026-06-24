const DataTypes = require('sequelize');
const sequelize = require('../config/db');

const Video = sequelize.define(
    'Video',
    {
        titulo: {
            type: DataTypes.STRING,
        },

        nomeCriador: {
            types: DataTypes.STRING,
        },

        descricao: {
            types: DataTypes.STRING,
        },

        qtdVisualizacoes: {
            types: DataTypes.INTEGER,
        },

        qtdCurtidas: {
            types: DataTypes.INTEGER,
        },

        hastagPrinc: {
            types: DataTypes.STRING,
        },

        urlVideo: {
            types: DataTypes.STRING,
        },

        urlThumb: {
            types: DataTypes.STRING,
        }

    }
)

module.exports = Video;