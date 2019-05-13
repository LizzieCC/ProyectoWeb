const User = require('../models/user')

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

module.exports = {
  login : login,
  logout : logout,
  createUser : createUser
}