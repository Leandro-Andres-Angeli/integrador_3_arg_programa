const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');

const ContenidoActores = sequelize.define(
  'contenido_actores',
  {
    contenido_actores_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    contenido_id: {
      type: DataTypes.INTEGER,
      alowNull: false,
    },
    actores_id: {
      type: DataTypes.INTEGER,
      alowNull: false,
    },
  },
  {
    tableName: 'contenido_actores',
    timestamps: false,
  }
);
module.exports = ContenidoActores;
