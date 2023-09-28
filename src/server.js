const dotenv = require('dotenv');
const sequelize = require('./connection/connection');
// const Categorias = require('./models/categorias');
// const Contenido = require('./models/contenido');
const {
  Categorias,
  Contenido,
  Generos,
  TrailerFlixView,
} = require('./models/index');
const {
  handleError,
  resNoResult,
  validateNum,
  validateString,
  validateStringAndSpaces,
} = require('./utils/handleErrors');
const bodyParser = require('body-parser');
const path = require('path');
dotenv.config();
// const {
//   DBUSER: username,
//   PASSWORD: password,
//   PORT: port,
//   HOST: host,
//   DATABASE: dbName,
// } = process.env;

// console.log(DBUSER);
const express = require('express');
const { Op } = require('sequelize');
const ContenidoGenero = require('./models/contenidogeneros');
const Actores = require('./models/actores');

const server = express();

// Middlewares
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
// Middlewares

server.use(express.json());

// i. /catalogo/:id (filtrar por código de la película/serie)
// ii. /catalogo/:nombre (filtrar por nombre o parte del nombre)
// iii. /catalogo/:genero (filtrar por género del contenido)
// iv. /catalogo/:categoria (filtrar por serie - película o cualquier otra categoría
// que pueda existir

//d. /categorias (servirá información de todas las categorías existentes)
server.get('/categorias/', async (req, res) => {
  try {
    const categories = await Categorias.findAll();

    res.status(200).send(categories);
  } catch (err) {
    console.log(err);
    return res.status(404).send(handleError(err));
  }
});
//d. /categorias (servirá información de todas las categorías existentes)
// e. /catalogo (servirá el catálogo completo ‘la vista SQL’)
//BUSCANDO TITULOS MEDIANTE VISTAS
server.get('/catalogo/', async (req, res) => {
  try {
    //RAW QUERY
    // const content = await sequelize.query(
    //   'select c.contenido_id as id ,c.poster, c.titulo,cat.categoria_nombre as categoria , (select  group_concat( distinct generos_nombre) from generos join contenido_genero on contenido_genero.genero_id = generos.generos_id join contenido on contenido_genero.contenido_id = c.contenido_id    ) as genero ,c.resumen,c.temporadas,c.trailer, (select  group_concat( distinct actores_nombre) from actores join contenido_actores on contenido_actores.actores_id = actores.actores_id join contenido on contenido_actores.contenido_id = c.contenido_id    ) as reparto  from contenido c  join categorias cat on c.categoria_id = cat.categoria_id ;'
    // );
    //RAW QUERY
    const content = await TrailerFlixView.findAll();

    return res.status(200).send(content);
  } catch (err) {
    console.log(err);
    return res.status(404).send(handleError(err));
  }
});
//BUSCANDO TITULOS MEDIANTE VISTAS
//BUSCANDO TITULOS MEDIANTE MODELOS Y SUS RELACIONES
// server.get('/catalogo_by_model/', async (req, res) => {
//   try {
//     const content = await Contenido.findAll({
//       attributes: [
//         'contenido_id',
//         'titulo',
//         'resumen',
//         'temporadas',
//         'poster',
//         'trailer',
//       ],

//       include: [
//         {
//           model: Actores,
//           attributes: ['actores_nombre'],
//           through: { attributes: [] },
//         },
//         { model: Categorias, attributes: ['categoria_nombre'] },
//         {
//           model: Generos,
//           attributes: ['generos_nombre'],
//           through: { attributes: [] },
//         },
//       ],
//     });

//     return res.status(200).send(content);
//   } catch (err) {
//     console.log(err);
//     return res.status(404).send(handleError(err));
//   }
// });
//BUSCANDO TITULOS MEDIANTE MODELOS Y SUS RELACIONES
// e. /catalogo (servirá el catálogo completo ‘la vista SQL’)

//e.i. /catalogo/:id (filtrar por código de la película/serie)
server.get('/catalogo/id/:id', async (req, res) => {
  try {
    let id = req.params.id;

    if (!validateNum(id)) {
      return res.status(400).send({ error: 'debe ingresar un numero' });
    }
    id = Number(id);
    const movie = await Contenido.findByPk(id, {
      attributes: [
        'contenido_id',
        'titulo',
        'resumen',
        'temporadas',
        'poster',
        'trailer',
      ],
    });

    if (!movie) {
      return resNoResult(res);
    }
    return res.status(200).send(movie);
  } catch (err) {
    console.log(err);
    return res.status(404).send(handleError(err));
  }
});

//e.i. /catalogo/:id (filtrar por código de la película/serie)
// ii. /catalogo/:nombre (filtrar por nombre o parte del nombre)
server.get('/catalogo/nombre/:nombre', async (req, res) => {
  const { nombre } = req.params;
  console.log(nombre);
  try {
    const movies = await Contenido.findAll({
      where: { titulo: { [Op.like]: `%${nombre}%` } },
    });
    if (movies.length < 1) {
      return resNoResult(res);
    }

    return res.status(200).send(movies);
  } catch (err) {
    console.log(err);
    return res.status(404).send(handleError(err));
  }
});
// ii. /catalogo/:nombre (filtrar por nombre o parte del nombre)
// iii. /catalogo/:genero (filtrar por género del contenido)
server.get('/catalogo/genero/:genero', async (req, res) => {
  let { genero } = req.params;
  if (!validateStringAndSpacesAndSpecialChars(genero)) {
    return res.status(400).send({
      error:
        'debe ingresar solo letras  o espacio en blanco, el espacio en blanco no puede estar al principio de la ruta  ',
    });
  }
  try {
    const movie = await Generos.findAll({
      include: [
        {
          model: Contenido,
          attributes: [
            'contenido_id',
            'titulo',
            'resumen',
            'temporadas',
            'poster',
            'trailer',
          ],
          through: { attributes: [] },
        },
      ],
      where: { generos_nombre: { [Op.like]: `%${genero}%` } },
    });

    if (movie.length === 0) {
      return resNoResult(res);
    }

    return res.status(200).send(movie);
  } catch (err) {
    console.log(err);
    return res.status(404).send(handleError(err));
  }
});
// iii. /catalogo/:genero (filtrar por género del contenido)
// iv. /catalogo/categoria/:categoria (filtrar por serie - película o cualquier otra
//   categoría que pueda existir)
server.get('/catalogo/categoria/:categoria', async (req, res) => {
  let { categoria } = req.params;
  if (!validateString(categoria)) {
    return res.status(400).send({ error: 'debe ingresar solo letras' });
  }
  try {
    const movie = await Categorias.findAll({
      include: [
        {
          model: Contenido,
          attributes: [
            'contenido_id',
            'titulo',
            'resumen',
            'temporadas',
            'poster',
            'trailer',
          ],
        },
      ],

      where: {
        categoria_nombre: { [Op.eq]: categoria },
      },
      attributes: ['categoria_nombre'],
      // right: true,
    });

    if (movie.length === 0) {
      return resNoResult(res);
    }

    return res.status(200).send(movie);
  } catch (err) {
    console.log(err);
    return res.status(404).send(handleError(err));
  }
});
// iv. /catalogo/categoria/:categoria (filtrar por serie - película o cualquier otra
//   categoría que pueda existir)

// f. y otros endpoint que consideres interesante crear...
//Endpoint para buscar pelicula que contenga x actor
server.get('/catalogo/actor/:actor', async (req, res) => {
  let { actor } = req.params;
  if (!validateStringAndSpaces(actor)) {
    return res.status(400).send({
      error:
        'debe ingresar solo letras  o espacio en blanco, el espacio en blanco no puede estar al principio de la ruta  ',
    });
  }
  try {
    const movie = await Actores.findAll({
      include: [
        {
          model: Contenido,
          attributes: [
            'contenido_id',
            'titulo',
            'resumen',
            'temporadas',
            'poster',
            'trailer',
          ],
          through: { attributes: [] },
        },
      ],
      where: { actores_nombre: { [Op.like]: `%${actor}%` } },
    });

    if (movie.length === 0) {
      return resNoResult(res);
    }

    return res.status(200).send(movie);
  } catch (err) {
    console.log(err);
    return res.status(404).send(handleError(err));
  }
});
//Endpoint para buscar pelicula que contenga x actor
server.get('*', (req, res) => {
  res.status(404).send({ error: 'ruta no existe' });
});
sequelize
  .authenticate()
  .then(() => {
    //force:true  como param en sync fuerza la dd bb para que coincida con los modelos en NODE
    //BORRA DANGER!
    sequelize.sync().then(() => {
      server.listen(process.env.PORT, process.env.HOST, () => {
        console.log(
          `El servidor está escuchando en: http://${process.env.HOST}:${process.env.PORT}`
        );
      });
    });
  })
  .catch((err) => {
    console.log('error en DB');
  });
