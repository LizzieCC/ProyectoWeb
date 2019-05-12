const express = require('express')
require('./db/mongoose')

const router = require('./routes')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) // parsea a json
app.use(router)

app.listen(port, function() {
  console.log('Server up and running on port ' + port)
})

//ESTRUCTURA DE LA BASE DE DATOS
/*
-MATERIA
    -Nombre
    -_id (por default de Mongo)

-TEMA
    -Nombre
    -Materia (ref Materia _id)
    -_id

-PREGUNTA (TODAS OPCION MULTIPLE)
    -Pregunta
    -Descripción
    -Imagen de Descripción
    -Opcion A
    -Opcion B
    -Opcion C
    -Respuesta
    -Explicación
    -Imagen de Explicación
    -Tema (ref Tema _id)
    -_id
*/