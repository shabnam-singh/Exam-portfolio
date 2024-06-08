const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');

const userController =require('../controllers/userController')

router.use(express.json());


router.post('/adduser',  userController.addUser);
router.get('/getallexamuser', userController.getAllExamUser);
router.delete('/delallexamuser', userController.deleteAllExamUser);

router.post('/addques',  userController.addQuestions);
router.get('/getallquestions', userController.getAllQuestions);
router.delete('/delallquestions', userController.deleteAllQuestions);

router.post('/userlogin',  userController.userLogin);


router.get('/getallquestionswithexamname', userController.getAllQuestionsWithExamName);

router.post('/submitexam',  userController.submitExam);

router.post('/sendresults',  userController.SendResults);




module.exports = router;