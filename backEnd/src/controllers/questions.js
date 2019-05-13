const Question = require('../models/question')

//Create question
const createQuestion = function(req,res){
    const question = new Question(req.body)
    question.save().then(function(){
        return res.send(question)
    }).catch(function(error){
        return res.status(400).send(error)
    })
}

//Delete question
const deleteQuestion = function(req,res){
    const _id = req.params.id
    Question.findOneAndDelete({_id: req.params.id}).then(function(question){
        if(!question){
            return res.status(404).send({error:`Pregunta con id ${_id} no encontrada`})
        }
        return res.send(question)
    }).catch(function(error){
        res.status(505).send({error:error})
    })
}

//Update question
const updateQuestion = function(req,res){
    const _id = req.params.id
    Question.findByIdAndUpdate(_id,req.body).then(function(question){
        if(!question){
            return res.status(404).send({ error: `Question with id ${_id} not found.`})
        }
        return res.send(question)
    }).catch(function(error){
        res.status(500).send({error:error})
    })
}

//Get questions by subject
const getQuestions = function(req,res){
    const subject = req.params.name
    Question.find({materia: subject}).then(function(questions){
        res.send(questions)
    }).catch(function(error){
        res.status(500).send(error)
    })
}


module.exports = {
    createQuestion : createQuestion,
    deleteQuestion : deleteQuestion,
    updateQuestion : updateQuestion,
    getQuestions : getQuestions
}