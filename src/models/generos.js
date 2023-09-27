const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');

const Generos = sequelize.define(
  'Generos',
  {
    generos_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    generos_nombre: {
      type: DataTypes.STRING,
      alowNull: false,
    },
  },
  {
    tableName: 'Generos',
    timestamps: false,
  }
);

module.exports = Generos;
