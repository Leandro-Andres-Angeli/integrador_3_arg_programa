# Entrega TP 3 Integrador Argentina Programa 4.0

## Documentacion

### Configuracion del proyecto

#### Archivo .env.dist

En el archivo .env.dist se encuentra el boilerplate de las variables de ambiente (PORT ,HOST,DBUSER,PASSWORD,DATABASE,POSTER_ROUTE)
-La variable de ambiente DATABASE debe llevar por nombre 'trailerflix',
-La variable de ambiente POSTER_ROUTE pude llevar cualquier nombre , ya que solo cumple la funcion de ejemplificar como añadir una ruta absoluta a la ruta de la columna 'poster' que devuelve la tabla Contenido
-Completar el resto de las variables con los valores correspondientes

#### Archivo CrearDbTrailerflixYView.sql

-Ejecutar para crear la base de datos Trailerflix y su correspondiente vista MySQL

#### Endpoints

##### 1) '/catalogo'

Devuelve la vista generada en MySQL llamada 'trailerflix_view' , se mapeo dicha vista al modelo TrailerFlixView que se encuentra en la carpeta models , se adjunta tambien implementacion devolviendo mismo resultado utilizando modelos mapeados a las tablas de la dd bb

##### 2) '/catalogo/id/:id'

Devuelve el trailer correspondiente al id pasado por parametros .En caso de no existir dicho id en la dd bb arroja status 404 y es manejado el error, en caso de escribir un valor por parametros que no sea un numero es tratado este error con validaciones

- Al buscar por parametro el id 2 la API devolvera el siguiente resultado
  | Campo | Valor |
  |--------------|------------------------------------------------------------|
  | temporadas | 5 |
  | poster | ![Riverdale Poster](https://localhost:8080/static/img/posters/2.jpg) |
  | trailer | |
  | contenido_id | 2 |
  | titulo | Riverdale |
  | resumen | El paso a la edad adulta incluye sexo, romance, escuela y familia. Para Archie y sus amigos, también hay misterios oscuros. |

-En caso de no encontrar resultados la API devolvera el siguiente resultado
| Campo | Valor |
|------------|----------------------|
| resultados | no se encontraron resultados |
-En caso de ingresar un dato no numerico la API devolvera el siguiente resultado
| Campo | Valor |
|------------|----------------------|
|error | debe ingresar un numero |

##### 3) '/catalogo/nombre/:nombre'

Devuelve todas las peliculas cuyo titulo incluya el texto pasado por req.params.nombre

- En caso de pasar'am'como parametro devolvera :
  | temporadas | poster | trailer | contenido_id | titulo | resumen | categoria_id |
  |------------|----------------------------------------------------------|---------|--------------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|
  | 1 | ![Gambito de Dama Poster](https://localhost:8080/static/img/posters/5.jpg) | | 5 | Gambito de Dama | En los cincuenta, una joven de un orfanato descubre que tiene un increíble don para el ajedrez y recorre el arduo camino a la fama mientras lucha contra las adicciones. | 1 |
  | N/A | ![Avengers: End Game Poster](https://localhost:8080/static/img/posters/8.jpg) | | 8 | Avengers: End Game | Después de los devastadores eventos de los Vengadores: Infinity War (2018), el universo está en ruinas. Con la ayuda de los aliados restantes, los Vengadores se reúnen una vez más para revertir las acciones de Thanos y restaurar el equilibrio del universo. | 2 |
- En caso de pasar 'crown' como parametro devolvera :
  | temporadas | poster | trailer | contenido_id | titulo | resumen | categoria_id |
  |------------|----------------------------------------------------------|---------|--------------|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|
  | 4 | ![The Crown Poster](https://localhost:8080/static/img/posters/1.jpg) | | 1 | The Crown | Este drama narra las rivalidades políticas y el romance de la reina Isabel II, así como los sucesos que moldearon la segunda mitad del siglo XX. | 1 |

  -En caso de no encontrar resultados la API devolvera el siguiente resultado
  | Campo | Valor |
  |------------|----------------------|
  | resultados | no se encontraron resultados |

#### 4) '/catalogo/genero/:genero'

Devuelve los generos cuyo nombre contenga o sea igual al parametro pasado traves de req.params.genero
