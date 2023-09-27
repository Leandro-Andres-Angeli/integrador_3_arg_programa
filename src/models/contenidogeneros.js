const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');

const ContenidoGenero = sequelize.define(
  'contenido_genero',
  {
    contenido_genero_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    contenido_id: {
      type: DataTypes.INTEGER,
      alowNull: false,
    },
    genero_id: {
      type: DataTypes.INTEGER,
      alowNull: false,
    },
  },
  {
    tableName: 'contenido_genero',
    timestamps: false,
  }
);
module.exports = ContenidoGenero;
