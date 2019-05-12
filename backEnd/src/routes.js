const express = require('express')
const router = express.Router()

const users = require('./controllers/users.js')
const subjects = require('./controllers/subjects.js')
const topics = require('./controllers/topics.js')
const questions = require('./controllers/questions.js')
const auth = require('./middleware/auth')

const cors = require('cors')
router.all('*', cors())

//USERS ADMINISTRATION-------------------------
//Login and Logout
router.post('/users/login', users.login)
router.post('/users/logout', auth, users.logout)

//Get User lists
//router.get('/users', auth, users.getUser)
//router.delete('/users', auth, users.deleteUser)
//router.patch('/users', auth, users.updateUser)

//Create Users
router.post('/users', users.createUser)

//SUBJECT (Materias)
//Create subject
router.post('/subjects',subjects.createSubject)
//Delete subject
router.delete('/subjects/:id',subjects.deleteSubject)
//Update subject

//Get all subjects

//TOPICS
//Create topic

//Delete topic 

//Update topic

//Get all topics (by subject)

//QUESTIONS------------------------------------
//Add question
//Delete Question
//Update Question
//Get Questions by topic

//HANDLE ERRORS---------------------------------
router.get('*', function(req, res) {
  res.send({
    error: 'This route does not exist, try /users or /todos'
  })
})

module.exports = router