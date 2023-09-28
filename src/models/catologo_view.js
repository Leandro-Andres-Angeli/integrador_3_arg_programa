const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');

const TrailerFlixView = sequelize.define(
  'trailerflix_view',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    poster: {
      type: DataTypes.STRING,
      alowNull: false,
      get() {
        return process.env.POSTER_ROUTE + this.getDataValue('poster');
      },
    },
    titulo: {
      type: DataTypes.STRING,
      alowNull: false,
    },
    categoria: {
      type: DataTypes.STRING,
      alowNull: false,
    },
    genero: {
      type: DataTypes.STRING,
      alowNull: false,
    },
    resumen: {
      type: DataTypes.INTEGER,
      alowNull: false,
    },
    temporadas: {
      type: DataTypes.INTEGER,
      alowNull: true,

      get() {
        if (!this.getDataValue('temporadas')) return 'N/A';
        return this.getDataValue('temporadas');
      },
    },
    trailer: {
      type: DataTypes.STRING,

      get() {
        if (!this.getDataValue('trailer')) return '';
        return this.getDataValue('trailer');
      },
    },
    reparto: {
      type: DataTypes.STRING,
      alowNull: false,
    },
  },
  {
    tableName: 'trailerflix_view',
    timestamps: false,
  }
);

module.exports = TrailerFlixView;
