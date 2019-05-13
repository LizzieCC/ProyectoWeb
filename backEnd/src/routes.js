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
router.post('/users/login', users.login)
router.post('/users/logout', auth, users.logout)
router.post('/users', users.createUser) //Create Users

//SUBJECT (Materias)
router.post('/subjects',auth,subjects.createSubject) //Create subject
router.delete('/subjects/:id',auth,subjects.deleteSubject) //Delete subject
//Update subject
router.get('/subjects',auth,subjects.getSubjects) //Get all subjects


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