const express = require('express');
const router = express.Router();


// import the handler of the Profile
const {updateProfile , deleteAccount , getAllUserDetails , updateDisplayPicture} = require('../controllers/Profile')

// import the handler of the authentication and authorization
const {auth} = require('../middlewares/auth')


router.put('/updateProfile' , auth ,updateProfile);
router.delete('/deleteAccount' ,auth , deleteAccount);
router.get('/getAllUserDetails' , auth , getAllUserDetails);
router.put('/updateDisplayPicture' , auth , updateDisplayPicture )

module.exports = router ;