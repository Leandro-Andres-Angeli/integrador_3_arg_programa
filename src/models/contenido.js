const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');

const Contenido = sequelize.define(
  'Contenido',
  {
    contenido_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      alowNull: false,
    },
    resumen: {
      type: DataTypes.STRING,
      alowNull: false,
    },
    temporadas: {
      type: DataTypes.INTEGER || DataTypes.STRING,
      alowNull: true,

      get() {
        if (!this.getDataValue('temporadas')) return 'N/A';
        return this.getDataValue('temporadas');
      },
    },

    poster: {
      type: DataTypes.STRING,
      alowNull: false,
      default: '',
      get() {
        return process.env.POSTER_ROUTE + this.getDataValue('poster');
      },
    },
    trailer: {
      type: DataTypes.STRING,

      get() {
        if (!this.getDataValue('trailer')) return '';
        return this.getDataValue('trailer');
      },
    },
    categoria_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'Contenido',
    timestamps: false,
  }
);
// Contenido.hasOne(Categorias);
// Categorias.hasMany(Contenido);
module.exports = Contenido;
