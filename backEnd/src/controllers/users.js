const User = require('../models/user')

const getUsers = function(req, res) {
  User.find({}).then(function(users) {
    res.send(users)
  }).catch(function(error){
    res.status(500).send(error)
  })
}

//Login 
const login = function(req, res) {
    User.findByCredentials(req.body.email, req.body.password).then(function(user){
      console.log(user);
      
      user.generateToken().then(function(token){
        console.log('hago token');
        return res.send({user, token})
      }).catch(function(error){
        console.log('no hago token');
        return res.status(401).send({ error: error })
      })
    }).catch(function(error) {
      console.log('salto alv');
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
  getUsers : getUsers,
  login : login,
  logout : logout,
  createUser : createUser
}