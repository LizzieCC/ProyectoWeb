const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema({
    name: String,
    materia: String
})

const Topic = mongoose.model('Topic',topicSchema)
module.exports = Topic