const express = require('express')
const router = express.Router()

const users = require('./controllers/users.js')
const todos = require('./controllers/questions.js')
const auth = require('./middleware/auth')

const cors = require('cors')
router.all('*', cors())

//USERS ADMINISTRATION-------------------------
//Login and Logout
router.post('/users/login', users.login)
router.post('/users/logout', auth, users.logout)

//Get User lists
router.get('/users', auth, users.getUser)
router.delete('/users', auth, users.deleteUser)
router.patch('/users', auth, users.updateUser)

//Create Users
router.post('/users', users.createUser)


//QUESTIONS------------------------------------
//Get All Questions
//Add question
//Delete Question
//Update Question

//HANDLE ERRORS---------------------------------
router.get('*', function(req, res) {
  res.send({
    error: 'This route does not exist, try /users or /todos'
  })
})

module.exports = router