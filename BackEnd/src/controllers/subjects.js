const Subject = require('../models/subject')

//Create subject
const createSubject = function(req,res){
    const subject = new Subject({
        name: req.body.name
    })
    subject.save().then(function(){
        return res.send(subject)
    }).catch(function(error){
        return res.status(400).send(error)
    })
}

//Delete subject 
const deleteSubject = function(req,res){
    const _id = req.params.id
    Subject.findOneAndDelete({_id: req.params.id}).then(function(subject){
        if(!subject){
            return res.status(404).send({error:`Materia con id ${_id} no encontrada`})
        }
        return res.send(subject)
    }).catch(function(error){
        res.status(505).send({error:error})
    })
}

//Get all subjects
const getSubjects = function(req,res){
    Subject.find({}).then(function(subjects){
        res.send(subjects)
    }).catch(function(error){
        res.status(500).send(error)
    })
}

//Update subject
const updateSubject = function(req,res){
    const _id = req.params.id
    const updates = Object.keys(req.body)
    Subject.findByIdAndUpdate(_id,req.body).then(function(subject){
        if(!subject){
            return res.status(404).send({ error: `Subject with id ${_id} not found.`})
        }
        return res.send(subject)
    }).catch(function(error){
        res.status(500).send({error:error})
    })
}


//Export
module.exports = {
    createSubject : createSubject,
    deleteSubject : deleteSubject,
    getSubjects : getSubjects,
    updateSubject : updateSubject
}
