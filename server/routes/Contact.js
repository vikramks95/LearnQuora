const express = require('express');
const router = express.Router();

// import the Contact Handler
const {createContact} = require('../controllers/Contact');

const {auth , isStudent} = require('../middlewares/auth')
// create the routes
router.post('/createContact', createContact);

// exports the routes
module.exports = router ;