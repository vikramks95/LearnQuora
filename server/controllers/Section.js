const Section = require('../models/Section');
const Course = require('../models/Course');
const mongoose = require('mongoose');


exports.createSection = async (req , res) => {
    try{

        //fetch the data from the req body
        
        const {sectionName , courseId} = req.body ;

        console.log("Section Name = " , sectionName);
        console.log("Course Id = " , courseId);

        // validation
        if(!sectionName || !courseId){
            return res.status(404).json({
                success : false ,
                message : "All fields are required"
            })
        }

        // create the entry in the Section Schema
        const sectionDetails = await Section.create({
            sectionName : sectionName ,
        })

        // update the Course Schema
        const updatedCourse = await Course.findByIdAndUpdate(
            {_id : courseId} ,
            {
                $push : {
                    courseContent : sectionDetails._id 
                }
            },
            {new : true }
        ).populate({
            path : "courseContent" ,
            populate : "subSection"
        })

        // return res
        return res.status(200).json({
            success : true ,
            message : "Section has created successfully",
            data : updatedCourse

        })
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success : false ,
            message : "Error while create Section ",
            error : error.message ,
        })
    }
}


// update the Section
exports.updateSection = async (req , res) => {
    try{
        // fetch the data
        const {sectionName , sectionId , courseId} = req.body;
        console.log("Section Name " , sectionName);
        console.log("Section Id" , sectionId);
        // data validation
        if(!sectionName || !sectionId || !courseId){
            return res.status(404).json({
                success : false ,
                message : "All the field are required"
            })
        }

        // update kar lo data ko
        const updatedSectionDetails = await Section.findByIdAndUpdate(
            {_id : sectionId} ,
            {
                sectionName : sectionName ,
            },
            {
                new : true 
            }
        )

        // update the course 
        const updatedCourse = await Course.findById(courseId)
                                            .populate({
                                                path : "courseContent",
                                                populate : {
                                                    path : "subSection"
                                                }
                                            })

        return res.status(200).json({
            success : true ,
            message : "Section Update ho gaya hai",
            data : updatedCourse ,
        })
    }
    catch(error){
        console.log("Error : " , error.message);
        return res.status(500).json({
            success : false ,
            message : "Error while updating the Section",
            message2 : error.message
        })
    }
}


// delete the Section

exports.deleteSection = async (req , res) => {
    try{
        // fetch the data from the req body
        const {sectionId , courseId} = req.body;

        // validate the sectionId
        if(!sectionId || !courseId){
            return res.status(400).json({
                success : false ,
                message : "All the data is required "
            })
        }


        // delete from the Course
        console.log(typeof (new mongoose.Types.ObjectId(sectionId)))
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({
                success : false ,
                message : "Course Section update nahi hua hai2"
            })
        }
        
        // update the course
        const courseDetails = await Course.findByIdAndUpdate(
                        courseId ,
                        {
                            $pull : {
                                courseContent : new mongoose.Types.ObjectId(sectionId)
                            }
                        },
                        {
                            new : true
                        }
        )
        .populate({
            path : "courseContent",
            populate : ({
                path : "subSection"
            })
        })

        if(!courseDetails){
            return res.status(404).json({
                success : false ,
                message : "Course Section update nahi hua hai"
            })
        }


        // delete the Section entry
        const deletedSection = await Section.findByIdAndDelete({_id : sectionId});

        // return the res
        return res.status(200).json({
            success : true ,
            message : "Section deleted  Successfully",
            data : courseDetails
        })
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({
            success : false ,
            message : "Error while deleting the Section",
            error : error.message
        })
    }
}


// find the Section 

exports.showAllSection = async (req , res) => {
    try{
        // find the data
        const sectionDetails  = await Section.find({});

        res.status(200).json({
            success : true ,
            message : "All the data of the Section fetched Successfully",
            data : sectionDetails
        })
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({
            success : false ,
            message : "Error while  showAllSection handler",
            message2 : error.message
        })
    }
}