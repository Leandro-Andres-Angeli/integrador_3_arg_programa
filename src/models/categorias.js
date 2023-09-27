const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');

const Categorias = sequelize.define(
  'Categorias',
  {
    categoria_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    categoria_nombre: {
      type: DataTypes.STRING,
      alowNull: false,
    },
  },
  {
    tableName: 'Categorias',
    timestamps: false,
  }
);

module.exports = Categorias;
