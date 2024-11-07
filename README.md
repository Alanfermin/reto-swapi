# Documentación de Endpoints

Esta documentación describe cómo consumir los endpoints disponibles para interactuar con SWAPI y OpenAI para la generación y manipulación de datos de películas.

## Endpoints Disponibles

### Obtener Listas de Recursos

Puedes acceder a las listas de diferentes recursos disponibles en SWAPI usando los siguientes endpoints:

- **GET** `/swapi/get-films`  
  URL: `https://9wpykorpvl.execute-api.us-east-2.amazonaws.com/production/swapi/get-films`

- **GET** `/swapi/get-people`  
  URL: `https://9wpykorpvl.execute-api.us-east-2.amazonaws.com/production/swapi/get-people`

- **GET** `/swapi/get-planet`  
  URL: `https://9wpykorpvl.execute-api.us-east-2.amazonaws.com/production/swapi/get-planet`

- **GET** `/swapi/get-species`  
  URL: `https://9wpykorpvl.execute-api.us-east-2.amazonaws.com/production/swapi/get-species`

- **GET** `/swapi/get-starships`  
  URL: `https://9wpykorpvl.execute-api.us-east-2.amazonaws.com/production/swapi/get-starships`

- **GET** `/swapi/get-vehicles`  
  URL: `https://9wpykorpvl.execute-api.us-east-2.amazonaws.com/production/swapi/get-vehicles`

### Obtener un Elemento Específico

Para obtener un recurso específico, añade el parámetro `id` en los siguientes endpoints:

- **GET** `/swapi/get-films?id={id}`
- **GET** `/swapi/get-people?id={id}`
- **GET** `/swapi/get-planet?id={id}`
- **GET** `/swapi/get-species?id={id}`
- **GET** `/swapi/get-starships?id={id}`
- **GET** `/swapi/get-vehicles?id={id}`

### Crear una petición y almacenar en la base de datos

Para generar una nueva historia utilizando OpenAI y recursos de SWAPI, y guardarla en la base de datos:

La url: https://9wpykoasdrpvl.execute-api.us-east-2.amazonaws.com/production/ es la generada por el vscode o por aws. Cuando se va a hacer la petición hay que colocar la url que genera AWS. Estas URL's son solo de ejemplos

**POST** `/new-film/get-data`  
URL: `https://9wpykorpasdvl.execute-api.us-east-2.amazonaws.com/production/new-film/get-data`

**Body Example:**

### Ejemplos de Peticiones POST

```json
{
  "idFilm": 4,
  "idPerson": "12",
  "idPlanet": "12",
  "idSpecies": "12",
  "idStarship": "1",
  "idVehicle": "1",
}
```
Una petición con todos los elementos brindará una respuesta como:

```json
{
    "success": true,
    "data": {
        "nombreFilm": "The Phantom Menace",
        "persona": "Nute Gunray",
        "planeta": "Coruscant",
        "especie": "Yoda's species",
        "nave": "Sentinel-class landing craft",
        "vehiculo": "X-34 landspeeder",
        "id": 3
    }
}
```

Si se hace una petición de sin alguno de los id, por ejemplo en este caso sin el idFilm:

```json
{
  "idPerson": "33",
  "idPlanet": "9",
  "idSpecies": "6",
  "idStarship": "5",
  "idVehicle": "7"
}
```
La respuesta será similar a esta:

```json
{
    "success": true,
    "data": {
        "nombreFilm": "Id de título no buscado",
        "persona": "Nute Gunray",
        "planeta": "Coruscant",
        "especie": "Yoda's species",
        "nave": "Sentinel-class landing craft",
        "vehiculo": "X-34 landspeeder",
        "id": 2
    }
}
```


### Obtener Todas la peticiones almacenadas en la base de datos

Esta URL es se va a cambiar por la que genere aws: https://9wpykorpvl.execute-api.us-east-2.amazonaws.com/production/

**GET** `/swapi/films`  
URL: `https://9wpykorpvl.execute-api.us-east-2.amazonaws.com/production/swapi/films`


**Body Example:**

```json
[
    {
        "id": 1,
        "nuevoFilm": "",
        "nombreFilm": "Attack of the Clones",
        "persona": "Nute Gunray",
        "planeta": "Coruscant",
        "especie": "Yoda's species",
        "nave": "Sentinel-class landing craft",
        "vehiculo": "X-34 landspeeder"
    },
    {
        "id": 2,
        "nuevoFilm": "",
        "nombreFilm": "Id de título no buscado",
        "persona": "Nute Gunray",
        "planeta": "Coruscant",
        "especie": "Yoda's species",
        "nave": "Sentinel-class landing craft",
        "vehiculo": "X-34 landspeeder"
    },
    {
        "id": 3,
        "nuevoFilm": "",
        "nombreFilm": "The Phantom Menace",
        "persona": "Nute Gunray",
        "planeta": "Coruscant",
        "especie": "Yoda's species",
        "nave": "Sentinel-class landing craft",
        "vehiculo": "X-34 landspeeder"
    }
]
```

## Consideraciones Importantes

### Endpoints Inaccesibles de SWAPI

Estos endpoints retornan errores y deben ser evitados:

- Starships: IDs `1`, `6`
- Vehicles: IDs `1`, `2`, `3`, `9`, `10`, `11`, `12`

Si se solicita un recurso desde `/swapi/get-starships` o `/swapi/get-vehicles` con estos IDs, se recibirá un error.

### Restricciones de Parámetros

- `idFilm`: debe ser un número entre `1` y `7`.
- `idVehicle`: los IDs `1`, `2`, `3`, `9`, `10`, `11`, `12` no están disponibles.
- `idStarship`: el ID `1` no está disponible.



## Despliegue de la Aplicación

1. Instalar `awscli`.
2. Ejecutar `aws configure` y ajustar las credenciales.
3. Revisar y modificar, si es necesario, la configuración de región en el archivo `serverless.yml`, línea 6.
4. npm build
5. Desplegar usando: `serverless deploy`
6. Para ver offline:
```bash
serverless offline
```

## Pruebas Unitarias

Para ejecutar las pruebas unitarias, primero corre la aplicación localmente:
```bash
npm run test:watch
```



Luego usa:

```bash
npm run test
```

Para modo observador:

```bash
npm run test:watch
```

Este markdown ahora ofrece una presentación más profesional y clara de la información. La estructura jerárquica y el formato mejorados ayudan a los desarrolladores a seguir fácilmente las instrucciones y entender los detalles importantes del servicio y sus restricciones.

# DATO IMPORTANTE
## Variables 
Las variables de entorno Están en el archivo .env que les he pasado, o se puede duplicar el archivo .env.template y quitarle la extensión .template