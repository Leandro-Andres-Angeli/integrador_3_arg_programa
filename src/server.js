const dotenv = require('dotenv');
const sequelize = require('./connection/connection');
// const Categorias = require('./models/categorias');
// const Contenido = require('./models/contenido');
const { Categorias, Contenido, Generos } = require('./models/index');
const {
  handleError,
  resNoResult,
  validateNum,
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

const server = express();

// Middlewares
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
// Middlewares

server.use(express.json());

// server.get('/', (req, res) => {
//   console.log(path.join('http://' + process.env.HOST + '/public/posters'));
//   res.json({ prods: 'data' });
// });
// e. /catalogo (servirá el catálogo completo ‘la vista SQL’)
// i. /catalogo/:id (filtrar por código de la película/serie)
// ii. /catalogo/:nombre (filtrar por nombre o parte del nombre)
// iii. /catalogo/:genero (filtrar por género del contenido)
// iv. /catalogo/:categoria (filtrar por serie - película o cualquier otra categoría
// que pueda existir
server.get('/catalogo/', async (req, res) => {
  try {
    const content = await Contenido.findAll({
      attributes: [
        'contenido_id',
        'titulo',
        'resumen',
        'temporadas',
        'poster',
        'trailer',
      ],
    });

    return res.status(200).send(content);
  } catch (err) {
    console.log(err);
    return res.status(404).send(handleError(err));
  }
});

//e.i. /catalogo/:id (filtrar por código de la película/serie)
server.get('/catalogo/id/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!validateNum(id)) {
      return res.status(400).send({ error: 'debe ingresar un numero' });
    }
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
    const movie = await Contenido.findOne({
      where: { titulo: { [Op.like]: `%${nombre}%` } },
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
// ii. /catalogo/:nombre (filtrar por nombre o parte del nombre)
// iii. /catalogo/:genero (filtrar por género del contenido)
server.get('/catalogo/genero/:genero', async (req, res) => {
  let { genero } = req.params;

  try {
    const movie = await Generos.findAll({
      // include: [{ model: Contenido }],

      include: [
        {
          model: Contenido,
        },
      ],
      where: { generos_nombre: { [Op.like]: `%${genero}%` } },
    });
    // const movie = await Generos.findAll({
    //   include: [
    //     {
    //       model: Contenido,
    //       attributes: [
    //         'contenido_id',
    //         'titulo',
    //         'resumen',
    //         'temporadas',
    //         'poster',
    //         'trailer',
    //       ],
    //     },
    //   ],

    //   where: {
    //     generos_nombre: { [Op.eq]: 'Fantasia' },
    //   },
    //   attributes: ['generos_nombre'],
    //   // right: true,
    // });

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
