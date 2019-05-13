const mongoose = require('mongoose')
const validator = require('validator')

const topicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    subject: {
        type: String,
        required: true
    }
})

//Relacion entre schemas
topicSchema.virtual('hasSubject', {
    ref: 'Subject',
    localfield: 'subject',
    foreignField: 'name'
})


const Topic = mongoose.model('Topic',topicSchema)
module.exports = Topic