const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');

const Actores = sequelize.define(
  'Actores',
  {
    actores_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    actores_nombre: {
      type: DataTypes.STRING,
      alowNull: false,
    },
  },
  {
    tableName: 'Actores',
    timestamps: false,
  }
);

module.exports = Actores;
