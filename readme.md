# Entrega TP 3 Integrador Argentina Programa 4.0

- Repositorio GIT : https://github.com/Leandro-Andres-Angeli/integrador_3_arg_programa

## Documentacion

### Configuracion del proyecto

#### Archivo .env.dist

- En el archivo .env.dist se encuentra el boilerplate de las variables de ambiente (PORT ,HOST,DBUSER,PASSWORD,DATABASE,POSTER_ROUTE)
  - La variable de ambiente DATABASE debe llevar por nombre 'trailerflix',
  - La variable de ambiente POSTER_ROUTE pude llevar cualquier nombre , ya que solo cumple la funcion de ejemplificar como añadir una ruta absoluta a la ruta de la columna 'poster' que devuelve la tabla Contenido
  - Completar el resto de las variables con los valores correspondientes

#### Archivo CrearDbTrailerflixYView.sql

- Ejecutar para crear la base de datos Trailerflix y su correspondiente vista MySQL

#### Endpoints

##### 1) '/catalogo'

- Devuelve la vista generada en MySQL llamada 'trailerflix_view' , se mapeo dicha vista al modelo TrailerFlixView que se encuentra en la carpeta models , se adjunta tambien implementacion devolviendo mismo resultado utilizando modelos mapeados a las tablas de la dd bb

##### 2) '/catalogo/id/:id'

- Devuelve el trailer correspondiente al id pasado por parametros .En caso de no existir dicho id en la dd bb arroja status 404 y es manejado el error, en caso de escribir un valor por parametros que no sea un numero es tratado este error con validaciones

- Al buscar por parametro el id 2 la API devolvera el siguiente resultado
  | Campo | Valor |
  |--------------|------------------------------------------------------------|
  | temporadas | 5 |
  | poster | ![Riverdale Poster](https://localhost:8080/static/img/posters/2.jpg) |
  | trailer | |
  | contenido_id | 2 |
  | titulo | Riverdale |
  | resumen | El paso a la edad adulta incluye sexo, romance, escuela y familia. Para Archie y sus amigos, también hay misterios oscuros. |

- En caso de no encontrar resultados la API devolvera el siguiente resultado
  | Campo | Valor |
  |------------|----------------------|
  | resultados | no se encontraron resultados |

- En caso de ingresar un dato no numerico la API devolvera el siguiente resultado
  | Campo | Valor |
  |------------|----------------------|
  |error | debe ingresar un numero |

##### 3) '/catalogo/nombre/:nombre'

Devuelve todas las peliculas cuyo titulo incluya el texto pasado por req.params.nombre

- Se valida que se pueda ingresar solo texto y espacios en blanco entre 2 palabras , el espacio en blanco no puede estar al principio

- En caso de pasar'am'como parametro devolvera :

  | temporadas | poster                                                                        | trailer | contenido_id | titulo             | resumen                                                                                                                                                                                                                                                          | categoria_id |
  | ---------- | ----------------------------------------------------------------------------- | ------- | ------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
  | 1          | ![Gambito de Dama Poster](https://localhost:8080/static/img/posters/5.jpg)    |         | 5            | Gambito de Dama    | En los cincuenta, una joven de un orfanato descubre que tiene un increíble don para el ajedrez y recorre el arduo camino a la fama mientras lucha contra las adicciones.                                                                                         | 1            |
  | N/A        | ![Avengers: End Game Poster](https://localhost:8080/static/img/posters/8.jpg) |         | 8            | Avengers: End Game | Después de los devastadores eventos de los Vengadores: Infinity War (2018), el universo está en ruinas. Con la ayuda de los aliados restantes, los Vengadores se reúnen una vez más para revertir las acciones de Thanos y restaurar el equilibrio del universo. | 2            |

- En caso de pasar 'crown' como parametro devolvera :
  | temporadas | poster | trailer | contenido_id | titulo | resumen | categoria_id |
  |------------|----------------------------------------------------------|---------|--------------|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|
  | 4 | ![The Crown Poster](https://localhost:8080/static/img/posters/1.jpg) | | 1 | The Crown | Este drama narra las rivalidades políticas y el romance de la reina Isabel II, así como los sucesos que moldearon la segunda mitad del siglo XX. | 1 |

- En caso de no encontrar resultados la API devolvera el siguiente resultado
  | Campo | Valor |
  |------------|----------------------|
  | resultados | no se encontraron resultados |

#### 4) '/catalogo/genero/:genero'

Devuelve los generos cuyo nombre contenga o sea igual al parametro pasado traves de req.params.genero

- Se valida que se pueda ingresar solo texto , espacios en blanco entre 2 palabras , y guion medio (para buscar por ejemplo el genero 'Sci-fi') , el espacio en blanco no puede estar al principio

- En caso de pasar 'sci' en req.params.genero devolvera todos los titulos en los cuales uno de sus generos contengan en su nombre dicho texto , en esta caso devolvera todos las peliculas que contengan como genero 'sci-fi'
  | generos_id | generos_nombre | Contenidos.temporadas | Contenidos.poster | Contenidos.trailer | Contenidos.contenido_id | Contenidos.titulo | Contenidos.resumen |
  |------------|----------------|-----------------------|-------------------|--------------------|------------------------|------------------|---------------------|
  | 11 | Sci-Fi | N/A | ![Avengers: End Game Poster](https://localhost:8080/static/img/posters/8.jpg) | | 8 | Avengers: End Game | Después de los devastadores eventos de los Vengadores: Infinity War (2018), el universo está en ruinas. Con la ayuda de los aliados restantes, los Vengadores se reúnen una vez más para revertir las acciones de Thanos y restaurar el equilibrio del universo. |
  | 11 | Sci-Fi | N/A | ![Archivo Poster](https://localhost:8080/static/img/posters/20.jpg) | [Trailer](https://www.youtube.com/embed/VHSoCnDioAo) | 20 | Archivo | 2038: George Almore está trabajando en una verdadera IA equivalente a la humana. Su último prototipo está casi listo. Esta fase sensible también es la más arriesgada. Especialmente porque tiene un objetivo que debe ocultarse a toda costa: reunirse con su esposa muerta. |
  | 11 | Sci-Fi | N/A | ![DOOM: Aniquilación Poster](https://localhost:8080/static/img/posters/27.jpg) | [Trailer](https://www.youtube.com/embed/nat3u3gAVLE) | 27 | DOOM: Aniquilación | Doom: Aniquilación sigue a un grupo de marines espaciales que han respondido a una llamada de alerta de una base en la luna marciana, solo para descubrir que ha sido tomada por criaturas demoníacas que amenazan con desatar el infierno en la tierra. |
  | 11 | Sci-Fi | N/A | ![The Martian Poster](https://localhost:8080/static/img/posters/30.jpg) | [Trailer](https://www.youtube.com/embed/XvB58bCVfng) | 30 | The Martian | Durante una misión a Marte de la nave tripulada Ares III, una fuerte tormenta se desata dando por desaparecido y muerto al astronauta Mark Watney (Matt Damon), sus compañeros toman la decisión de irse pero él ha sobrevivido. Está solo y sin apenas recursos en el planeta. Con muy pocos medios deberá recurrir a sus conocimientos, su sentido del humor y un gran instinto de supervivencia para lograr sobrevivir y comunicar a la Tierra que todavía está vivo esperando que acudan en su rescate. |
  | 11 | Sci-Fi | N/A | ![Ex-Machina Poster](https://localhost:8080/static/img/posters/31.jpg) | [Trailer](https://www.youtube.com/embed/XRYL5spvEcI) | 31 | Ex-Machina | Un programador multimillonario selecciona a Caleb, un joven empleado de su empresa, para que pase una semana en un lugar remoto con el objetivo de que participe en un test en el que estará involucrada su última creación: un robot-mujer en el que inteligencia artificial lo es todo. |
  | 11 | Sci-Fi | N/A | ![Titanes del Pacífico - La Insurrección Poster](https://localhost:8080/static/img/posters/35.jpg) | | 35 | Titanes del Pacífico - La Insurrección | Han pasado 10 años tras la primera invasión que sufrió la humanidad, pero la lucha aún no ha terminado. El planeta vuelve a ser asediado por los Kaiju, una raza de alienígenas colosales, que emergen desde un portal interdimensional con el objetivo de destruir a la raza humana. Ante esta nueva amenaza, los Jaegers, robots gigantes de guerra pilotados por dos personas para sobrellevar la inmensa carga neuronal que conlleva manipularlos, ya no están a la altura de lo que se les viene encima. Será entonces cuando los supervivientes de la primera invasión, además de nuevos personajes como el hijo de Pentecost, tendrán que idear la manera de sorprender al enorme enemigo, apostando por nuevas estrategias defensivas y de ataque. Con la Tierra en ruinas e intentando reconstruirse, esta nueva batalla puede ser decisiva para el futuro. |

- En caso de no encontrar resultados la API devolvera el siguiente resultado

| Campo      | Valor                        |
| ---------- | ---------------------------- |
| resultados | no se encontraron resultados |

#### 5) '/catalogo/categoria/:categoria'

Devuelve todos el catalogo que pertenezca a una determinada categoria, en este caso el parametro tiene que ser estrictamente igual al valor "serie" o "pelicula" , en caso de contener el parametro 'categoria' otro valor diferente se mostrar un mensaje de que no se encontraron resultados.

- Se valida que se pueda ingresar solo texto , no permite espacios en blanco ni numeros

- Resultados de pasar el string 'serie' como parametro

| categoria_nombre | Contenidos.temporadas | Contenidos.poster                                                                    | Contenidos.trailer                                   | Contenidos.contenido_id | Contenidos.titulo        | Contenidos.resumen                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------- | --------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------- | ----------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Serie            | 4                     | ![The Crown Poster](https://localhost:8080/static/img/posters/1.jpg)                 |                                                      | 1                       | The Crown                | Este drama narra las rivalidades políticas y el romance de la reina Isabel II, así como los sucesos que moldearon la segunda mitad del siglo XX.                                                                                                                                                                                                                                                                                                                                          |
| Serie            | 5                     | ![Riverdale Poster](https://localhost:8080/static/img/posters/2.jpg)                 |                                                      | 2                       | Riverdale                | El paso a la edad adulta incluye sexo, romance, escuela y familia. Para Archie y sus amigos, también hay misterios oscuros.                                                                                                                                                                                                                                                                                                                                                               |
| Serie            | 2                     | ![The Mandalorian Poster](https://localhost:8080/static/img/posters/3.jpg)           | [Trailer](https://www.youtube.com/embed/aOC8E8z_ifw) | 3                       | The Mandalorian          | Ambientada tras la caída del Imperio y antes de la aparición de la Primera Orden, la serie sigue los pasos de un pistolero solitario en las aventuras que protagoniza en los confines de la galaxia, donde no alcanza la autoridad de la Nueva República.                                                                                                                                                                                                                                 |
| Serie            | 1                     | ![The Umbrella Academy Poster](https://localhost:8080/static/img/posters/4.jpg)      |                                                      | 4                       | The Umbrella Academy     | La muerte de su padre reúne a unos hermanos distanciados y con extraordinarios poderes que descubren impactantes secretos y una amenaza que se cierne sobre la humanidad.                                                                                                                                                                                                                                                                                                                 |
| Serie            | 1                     | ![Gambito de Dama Poster](https://localhost:8080/static/img/posters/5.jpg)           |                                                      | 5                       | Gambito de Dama          | En los cincuenta, una joven de un orfanato descubre que tiene un increíble don para el ajedrez y recorre el arduo camino a la fama mientras lucha contra las adicciones.                                                                                                                                                                                                                                                                                                                  |
| Serie            | 8                     | ![Juego de tronos Poster](https://localhost:8080/static/img/posters/9.jpg)           |                                                      | 9                       | Juego de tronos          | En un mundo fantástico y en un contexto medieval varias familias, relativas a la nobleza, se disputan el poder para dominar el territorio ficticio de Poniente (Westeros) y tomar el control de los Siete Reinos desde el Trono de Hierro, lugar donde el rey ejerce el poder.                                                                                                                                                                                                            |
| Serie            | 6                     | ![The Flash Poster](https://localhost:8080/static/img/posters/10.jpg)                |                                                      | 10                      | The Flash                | Sigue las veloces aventuras de Barry Allen, un joven común y corriente con el deseo latente de ayudar a los demás. Cuando una inesperada partícula aceleradora golpea por accidente a Barry, de pronto se encuentra cargado de un increíble poder para moverse a increíbles velocidades. Mientras Barry siempre ha tenido el alma de un héroe, sus nuevos poderes le han dado la capacidad de actuar como tal.                                                                            |
| Serie            | 12                    | ![The Big Bang Theory Poster](https://localhost:8080/static/img/posters/11.jpg)      | [Trailer](https://www.youtube.com/embed/WBb3fojgW0Q) | 11                      | The Big Bang Theory      | Leonard y Sheldon son dos físicos que comparten trabajo y apartamento. La serie comienza con la mudanza de Penny, su nueva y atractiva vecina, y hace hincapié en la dificultad de los físicos para relacionarse con personas fuera de su entorno para dar lugar a situaciones cómicas.                                                                                                                                                                                                   |
| Serie            | 10                    | ![Friends Poster](https://localhost:8080/static/img/posters/12.jpg)                  |                                                      | 12                      | Friends                  | 'Friends' narra las aventuras y desventuras de seis jóvenes de Nueva York: Rachel, Monica, Phoebe, Ross, Chandler y Joey. Ellos forman una unida pandilla de amigos que viven en Manhattan y que suelen reunirse en sus apartamentos o en su bar habitual cafetería, el Central Perk. A pesar de los numerosos cambios que se producen en sus vidas, su amistad es inquebrantable en la dura batalla por salir adelante en sus periplos profesionales y personales.                       |
| Serie            | 2                     | ![Anne with an 'E' Poster](https://localhost:8080/static/img/posters/13.jpg)         |                                                      | 13                      | Anne with an 'E'         | Anne Shirley es una niña huérfana que vive en un pequeño pueblo llamado Avonlea que pertenece a la Isla del Príncipe Eduardo, en el año 1890. Después de una infancia difícil, donde fue pasando de orfanato a hogares de acogida, es enviada por error a vivir con una solterona y su hermano. Cuando cumple 13 años, Anne va a conseguir transformar su vida y el pequeño pueblo donde vive gracias a su fuerte personalidad, intelecto e imaginación. Basada en la inolvidable novela. |
| Serie            | 11                    | ![Expedientes Secretos 'X' Poster](https://localhost:8080/static/img/posters/14.jpg) | [Trailer](https://www.youtube.com/embed/KKziOmsJxzE) | 14                      | Expedientes Secretos 'X' | Fox Mulder y Dana Scully son dos investigadores del FBI que investigan casos sin resolución ni explicación, ya sea por razones paranormales (espírit                                                                                                                                                                                                                                                                                                                                      |

- En caso de no encontrar resultados la API devolvera el siguiente resultado

| Campo      | Valor                        |
| ---------- | ---------------------------- |
| resultados | no se encontraron resultados |

#### 6) Endpoint adicional '/catalogo/actor/:actor'

Recibe nombre o apellido de actor/actriz o parte de su nombre o apellido , busca en la dd bb aquellas peliculas o series en las cuales haya participado

- Se valido que se pueda ingresar texto y espacios en blanco en el param , el espacio en blanco no puede estar al principio (se implemento de esta forma para buscar por nombre y apellido ej : "Lili Reinhart","Al Pacino" ,etc)

- Si se le pasa por ejemplo "Lili reinhart" como parametro devolvera las peliculas en las que haya actuado Lili reinhart dentro del listado

| actores_id | actores_nombre | Contenidos.temporadas | Contenidos.poster                                                 | Contenidos.trailer                                   | Contenidos.contenido_id | Contenidos.titulo | Contenidos.resumen                                                                                                                                                                                                                                                                                                                                          |
| ---------- | -------------- | --------------------- | ----------------------------------------------------------------- | ---------------------------------------------------- | ----------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 37         | Robert De Niro | N/A                   | ![Guasón Poster](https://localhost:8080/static/img/posters/7.jpg) | [Trailer](https://www.youtube.com/embed/zAGVQLHvwOY) | 7                       | Guasón            | Arthur Fleck (Phoenix) es un hombre ignorado por la sociedad, cuya motivación en la vida es hacer reír. Pero una serie de trágicos acontecimientos le llevarán a ver el mundo de otra forma. Película basada en el popular personaje de DC Comics Joker, conocido como archivillano de Batman, pero que en este film tomará un cariz más realista y oscuro. |

- En caso de no encontrar resultados la API devolvera el siguiente resultado

| Campo      | Valor                        |
| ---------- | ---------------------------- |
| resultados | no se encontraron resultados |
