const express = require('express');
const router = express.Router();



// import the Category Handler
const {createCategory , showAllCategory , categoryPageDetails} = require('../controllers/Category')

// import the Course Handler
const {createCourse , editCourse , deleteCourse , getAllCourses , getCourseDetails , instructorCourse } = require('../controllers/Course')

// import the Section Handler
const {createSection , updateSection , deleteSection , showAllSection} = require('../controllers/Section');

// import the SubSection Handler
const {createSubSection , updateSubSection , deleteSubSection} = require('../controllers/SubSection');


//import the authentication
const {auth , isInstructor , isAdmin} = require('../middlewares/auth')


// create the routes

router.post('/createCategory' ,auth , isAdmin , createCategory );
router.get('/showAllCategories' , showAllCategory);
router.post('/categoryPageDetails' , categoryPageDetails)

router.post('/createCourse' ,auth , isInstructor,  createCourse);
router.post('/editCourse' , auth , isInstructor , editCourse);
router.get('/getAllCourses' , getAllCourses);
router.post('/getCourseDetails' , getCourseDetails);
router.get("/getInstructorCourse" , auth , isInstructor , instructorCourse );
router.delete("/deleteCourse" , auth , isInstructor , deleteCourse);

router.post('/createSection' , auth , isInstructor ,createSection);
router.put('/updateSection' ,auth , isInstructor ,  updateSection);
router.delete('/deleteSection' ,auth , isInstructor , deleteSection);
router.get('/showAllSection' , showAllSection);

router.post('/createSubSection' ,auth , isInstructor , createSubSection);
router.put('/updateSubSection' ,auth , isInstructor    , updateSubSection);
router.delete('/deleteSubSection' ,auth , isInstructor, deleteSubSection);


module.exports = router ;