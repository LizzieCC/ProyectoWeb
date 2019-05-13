const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

userSchema.virtual('hasQuestions', {
    ref: 'Question',
    localField: 'name',
    foreignField: 'materia'
})

const Subject = mongoose.model('Subject',subjectSchema)
module.exports = Subject