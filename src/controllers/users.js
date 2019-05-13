const User = require('../models/user')

const getUsers = function(req, res) {
  User.find({}).then(function(users) {
    res.send(users)
  }).catch(function(error){
    res.status(500).send(error)
  })
}

//Get a user
const getUser = function(req,res){
  User.findById(req.user._id).then(function(user){
    if(!user){
      return res.status(404).send({error:`Este usuario no existe aún`})
    }

  }).catch(function(error){

  })
}

//Login 
const login = function(req, res) {
    User.findByCredentials(req.body.email, req.body.password).then(function(user){
      user.generateToken().then(function(token){
        return res.send({user, token})
      }).catch(function(error){
        return res.status(401).send({ error: error })
      })
    }).catch(function(error) {
      return res.status(401).send({ error: error })
    })
  }

//Logout
const logout = function(req, res) {
    req.user.tokens = req.user.tokens.filter(function(token) {
      return token.token !== req.token
    })
    req.user.save().then(function() {
      return res.send()
    }).catch(function(error) {
      return res.status(500).send({ error: error } )
    })
  }

//Create User
const createUser = function(req,res){
    const user = new User(req.body)
    user.save().then(function(){
        return res.send(user)
    }).catch(function(error){
        return res.status(400).send(error)
    })
}

//Delete User 
const deleteUser = function(req,res){
  const _id = req.params.id
  User.findByIdAndDelete(_id).then(function(user){
    console.log(user)
    if(!user){
      return res.status(404).send({error:`Este usuario no existe aún`})
    }
    return res.send(user)
  }).catch(function(error){
    res.status(505).send({error:error})
  })
}


module.exports = {
  getUsers : getUsers,
  login : login,
  logout : logout,
  createUser : createUser,
  deleteUser : deleteUser
}