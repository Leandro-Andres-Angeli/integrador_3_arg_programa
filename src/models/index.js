const Actores = require('./actores');
const Categorias = require('./categorias');
const Contenido = require('./contenido');

const ContenidoActores = require('./contenidoactores');
const ContenidoGenero = require('./contenidogeneros');
const TrailerFlixView = require('./catologo_view');
const Generos = require('./generos');
Categorias.hasMany(Contenido, { foreignKey: 'categoria_id' });
Contenido.belongsTo(Categorias, {
  foreignKey: 'categoria_id',
});

Contenido.belongsToMany(Actores, {
  through: 'contenido_actores',
  foreignKey: 'contenido_id',
});
Actores.belongsToMany(Contenido, {
  through: 'contenido_actores',
  foreignKey: 'actores_id',
});

Contenido.belongsToMany(Generos, {
  through: ContenidoGenero,
  foreignKey: 'contenido_id',
});
Generos.belongsToMany(Contenido, {
  through: ContenidoGenero,
  foreignKey: 'genero_id',
});

module.exports = { Categorias, Contenido, Generos, TrailerFlixView };
