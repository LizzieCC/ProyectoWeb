const express = require('express')
const router = express.Router()

const users = require('./controllers/users.js')
const subjects = require('./controllers/subjects.js')
const questions = require('./controllers/questions.js')
const auth = require('./middleware/auth')

const cors = require('cors')
router.all('*', cors())

//USERS ADMINISTRATION-------------------------
router.post('/users/login', users.login)
router.post('/users/logout', auth, users.logout)
router.post('/users', auth,users.createUser) //Create Users
router.get('/users',auth,users.getUsers)
router.get('/users',auth,users.getUsers)
router.delete('/users/:id',auth,users.deleteUser)

//SUBJECT (Materias)
router.post('/subjects',auth,subjects.createSubject) //Create subject
router.delete('/subjects/:id',auth,subjects.deleteSubject) //Delete subject
router.patch('/subjects/:id',auth,subjects.updateSubject) //Update subject
router.get('/subjects',auth,subjects.getSubjects) //Get all subjects


//QUESTIONS------------------------------------
router.post('/createQuestion',auth,questions.createQuestion) //Add question
router.delete('/deleteQuestion/:id',auth,questions.deleteQuestion) //Delete Question
router.patch('/updateQuestion/:id',auth,questions.updateQuestion)//Update Question
router.get('/getQuestions/:name',auth,questions.getQuestions)//Get Questions by subject

//HANDLE ERRORS---------------------------------
router.get('*', function(req, res) {
  res.send({
    error: 'This route does not exist, try login in or ask an admin to sign u up ;)'
  })
})

module.exports = router