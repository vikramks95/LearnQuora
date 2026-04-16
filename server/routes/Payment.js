const express = require('express');
const router = express.Router();


// import the Payment handler
const {capturePayment , verifyPayment , sendPaymentSuccessEmail } = require('../controllers/Payment');

// import the authentication 
const {auth , isStudent} = require('../middlewares/auth');


router.post('/capturePayment' ,auth , isStudent , capturePayment);
router.post("/verifyPayment",auth, isStudent, verifyPayment)
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

module.exports = router ;