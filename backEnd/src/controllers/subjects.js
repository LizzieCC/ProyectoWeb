const Subject = require('../models/subject')

//Create subject
const createSubject = function(req,res){
    const subject = new Subject({
        nombre: req.body.nombre
    })
    subject.save().then(function(){
        return res.send(subject)
    }).catch(function(error){
        return res.status(400).send({error:error})
    })
}

//Delete subject
const deleteSubject = function(req,res){
    const _id = req.params_id
    Subject.findOneAndDelete({_id}).then(function(subject){
        if(!subject){
            return res.status(404).send({error:`Materia con id ${_id} no encontrada`})
        }
        return res.send(subject)
    }).catch(function(subject){
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
