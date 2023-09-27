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
      type: DataTypes.INTEGER,
      alowNull: false,
      default: 0,
      get() {
        if (!this.getDataValue('temporadas')) return;
        return this.getDataValue('temporadas');
      },
    },
    poster: {
      type: DataTypes.STRING,
      alowNull: false,
      default: '',
    },
    trailer: {
      type: DataTypes.STRING,
      alowNull: false,
      default: '',
      get() {
        if (!this.getDataValue('trailer')) return;
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
