const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    pregunta: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String
    },
    imagenDeApoyo:{
        type: String
    },
    opcionA: {
        type: String,
        required: true
    },
    opcionB: {
        type: String,
        required: true
    },
    opcionC: {
        type: String,
        required: true
    },
    respuesta:{
        type: String,
        required: true
    },
    explicacion: {
        type: String,
        required: true
    },
    imagenExplicativa:{
        type: String
    },
    tema: {
        type: String
    },
    Materia: {
        type:  String,
        required: true
    }
})

const Question = mongoose.model('Question',questionSchema)
module.exports = Question