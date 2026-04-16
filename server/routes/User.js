// intialize the router
const express = require('express');
const router = express.Router();

// import the handler from the Auth Controller
const {sendOTP , signUp , login , changePassword} = require('../controllers/Auth');

// import the handler from the middleware 
const {auth} = require('../middlewares/auth');

// import the handler from the Reset controller
const {resetPasswordToken , resetPassword } = require('../controllers/ResetPassword');


// create the routes 
router.post('/sendotp' , sendOTP);

router.post('/signUp' , signUp);
router.post('/login' , login);
router.put('/changePassword' ,auth , changePassword);


router.post('/reset-password-token' , resetPasswordToken )
router.post('/reset-password' , resetPassword)


// exports the module
module.exports = router ;