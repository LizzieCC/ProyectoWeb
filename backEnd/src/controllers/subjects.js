const Subject = require('../models/subject')

//Create subject
const createSubject = function(req,res){
    const subject = new Subject({
        name: req.body.name
    })
    console.log(subject)
    subject.save().then(function(){
        return res.send(subject)
    }).catch(function(error){
        return res.status(400).send(error)
    })
}

//Delete subject
const deleteSubject = function(req,res){
    const _id = req.params.id
    console.log(req.params.id)
    Subject.findOneAndDelete({_id: req.params.id}).then(function(subject){
        if(!subject){
            return res.status(404).send({error:`Materia con id ${_id} no encontrada`})
        }
        return res.send(subject)
    }).catch(function(error){
        res.status(505).send({error:error})
    })
}

//Update subject

//Get all subjects

//Export
module.exports = {
    createSubject : createSubject,
    deleteSubject : deleteSubject
}
