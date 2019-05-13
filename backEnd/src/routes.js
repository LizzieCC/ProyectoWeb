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
router.post('/users', users.createUser) //Create Users

//SUBJECT (Materias)
router.post('/subjects',auth,subjects.createSubject) //Create subject
router.delete('/subjects/:id',auth,subjects.deleteSubject) //Delete subject
router.patch('/subjects/:id',auth,subjects.updateSubject) //Update subject
router.get('/subjects',auth,subjects.getSubjects) //Get all subjects


//QUESTIONS------------------------------------
router.post('/createQuestion',auth,questions.createQuestion) //Add question
router.delete('/deleteQuestion',auth,questions.deleteQuestion) //Delete Question
router.patch('/updateQuestion/:id',auth,questions.updateQuestion)//Update Question
router.get('getQuestions/:name',auth,questions.getQuestions)//Get Questions by subject

//HANDLE ERRORS---------------------------------
router.get('*', function(req, res) {
  res.send({
    error: 'This route does not exist, try /users or /todos'
  })
})

module.exports = router