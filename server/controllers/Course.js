const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const { uploadFileToCloudinary } = require('../utils/imageFileUploader')
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");


exports.createCourse = async (req, res) => {
    try {
        //fetch the data from the req bodyouWillLearn
        const { courseName, courseDescription, price, whatYouWillLearn, tag, category, instructions, status } = req.body;

        // fetch the thumbnail
        const thumbnail = req.files.thumbnailImage;

        console.log(courseName, courseDescription, price, whatYouWillLearn, tag, category);

        // validate the data
        if (!courseName || !courseDescription || !price || !whatYouWillLearn || !whatYouWillLearn || !category || !status || !instructions) {
            return res.status(401).json({
                success: false,
                courseName,
                courseDescription,
                price,
                whatYouWillLearn,
                tag,
                category,
                message: "All fields are required",

            })
        }

        // check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById({ _id: userId });
        console.log("Instructor Details : ", instructorDetails);

        // 
        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor Details not found"
            })
        }

        // check given category is valid or not
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Such type of category is not found"
            })
        }

        // upload the image to the cloudinary
        const thumbnailImage = await uploadFileToCloudinary(thumbnail, process.env.FOLDER_NAME);
        if (!thumbnailImage) {
            return res.status(401).json({
                success: false,
                message: "Error while uploading to the cloudinary"
            })
        }

        // create the course

        const courseDetails = await Course.create({
            courseName: courseName,
            courseDescription: courseDescription,
            price: price,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            thumbnail: thumbnailImage.secure_url,
            tag: tag,
            category: categoryDetails._id,
            status: status,
            instructions: instructions

        })


        //add the new course to the user schema of the instrucor
        const userDetails = await User.findByIdAndUpdate(
            { _id: instructorDetails._id },
            {
                $push: {
                    courses: courseDetails._id
                }
            },
            {
                new: true
            }
        );

        // update the Category Schema
        const updatedCategory = await Category.findByIdAndUpdate(
            { _id: categoryDetails._id },
            {
                $push: {
                    courses: courseDetails._id
                }
            }
        )

        // return the response 
        res.status(200).json({
            success: true,
            message: "Course Created SuccessFully",
            data: courseDetails
        })

    }
    catch (error) {
        console.log("Error : ", error.message);
        res.status(500).json({
            success: false,
            message: "Error while creation the Course",
            message2: error.message

        })
    }
}

// exports.editCourse = async (req, res) => {

//   try {
//     const { courseId } = req.body
//     const updates = req.body
//     const course = await Course.findById(courseId)

//     if (!course) {
//       return res.status(404).json({ error: "Course not found" })
//     }

//     // If Thumbnail Image is found, update it
//     if (req.files) {
//       console.log("thumbnail update")
//       const thumbnail = req.files.thumbnailImage
//       const thumbnailImage = await uploadFileToCloudinary(
//         thumbnail,
//         process.env.FOLDER_NAME
//       )
//       course.thumbnail = thumbnailImage.secure_url
//     }

//     // Update only the fields that are present in the request body
//     for (const key in updates) {
//       if (updates.hasOwnProperty(key)) {
//         if (key === "tag" || key === "instructions") {
//           course[key] = JSON.parse(updates[key])
//         } else {
//           course[key] = updates[key]
//         }
//       }
//     }

//     await course.save()

//     const updatedCourse = await Course.findOne({
//       _id: courseId,
//     })
//       .populate({
//         path: "instructor",
//         populate: {
//           path: "additionalDetails",
//         },
//       })
//       .populate("category")
//       .populate("ratingAndReviews")
//       .populate({
//         path: "courseContent",
//         populate: {
//           path: "subSection",
//         },
//       })
//       .exec()

//     res.json({
//       success: true,
//       message: "Course updated successfully",
//       data: updatedCourse,
//     })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     })
//   }
// }

exports.editCourse = async (req, res) => {
    try {
        const { courseId } = req.body;

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required",
            });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        // If thumbnail updated
        if (req.files && req.files.thumbnailImage) {
            const thumbnail = req.files.thumbnailImage;
            const uploadedImage = await uploadFileToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            );
            course.thumbnail = uploadedImage.secure_url;
        }

        // Convert req.body to plain object (in case FormData)
        const updates = Object.fromEntries(Object.entries(req.body));

        // Update only present fields
        for (const key in updates) {
            if (Object.prototype.hasOwnProperty.call(updates, key)) {
                if ((key === "tag" || key === "instructions") && updates[key]) {
                    try {
                        course[key] = JSON.parse(updates[key]);
                    } catch (err) {
                        console.log(`Failed to parse ${key}:`, err.message);
                    }
                } else if (key !== "courseId") {
                    course[key] = updates[key];
                }
            }
        }

        await course.save();

        const updatedCourse = await Course.findById(courseId)
            .populate({
                path: "instructor",
                populate: { path: "additionalDetails" },
            })
            .populate("category")

            .populate({
                path: "courseContent",
                populate: { path: "subSection" },
            })
            .exec();

        return res.json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        });
    } catch (error) {
        console.error("Error in editCourse:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

exports.deleteCourse = async(req , res) => {
    try{
        const {courseId} = req.body;
        const userId = req.user.id ;

        if(!courseId){
            res.status(404).json({
                success : false ,
                message : "Course Id is not required"
            })
        }
        const course = await Course.findById(courseId);

        if(!course){
            res.status(401).json({
                success : false ,
                message : "Course is not available"
            })
        }


        // delete from the student list 
        const studentsEnrolled = course.studentEnrollement ;
        for(const studentId of studentsEnrolled){
            await User.findByIdAndUpdate(
                {
                    studentId
                },
                {
                    $pull : {
                        courses : course._id ,
                    }
                }
            )
        }

        // before deleting the course (delete the section and subSection)
        const courseSection = course.courseContent ;

        for(const sectionId of courseSection){
            const section = await Section.findById(sectionId) ;
            if(section){
                const subSection = section.subSection ;
                for(const subSectionId of subSection){
                    await SubSection.findByIdAndDelete(subSectionId);
                }
                
            }
            await Section.findByIdAndDelete(sectionId);
        }

        await Course.findByIdAndDelete(courseId);


        res.status(200).json({
            success : true ,
            message : "Course Deleted Successfully"
        })
    }
    catch(error){
        console.log("Error while deleting the course" , error.message);
        res.status(500).json({
            success : false ,
            message : "Error while deleting the course",
            error : error.message
        })

    }
}

exports.instructorCourse = async (req, res) => {
    try {
        const instrucorId = req.user.id;

        const instrucorCourses = await Course.find({
            instructor: instrucorId
        })
            .sort({ createdAt: -1 })
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            })
            .exec();

        return res.status(200).json({
            success: true,
            message: "Instructor course fetched successfully",
            data: instrucorCourses
        })
    }
    catch(error){
        return res.status(500).json({
             success : false ,
             message : "Error while fetching the instructor course",
             error : error.message 
        })
    }
}

// getAllCourses
exports.getAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({});

        return res.status(200).json({
            success: true,
            message: "All courses mil gaye hai",
            data: allCourses
        })
    }
    catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Error while fetching the course details",
            error: error.message
        })
    }
}



// getCourseDetails

exports.getCourseDetails = async (req, res) => {
    try {
        // fetch the course Id
        const { courseId } = req.body;

        // 
        if (!courseId) {
            return res.status(404).json({
                success: false,
                message: "courseId is not available"
            })
        }
        const courseDetails = await Course.find(
            { _id: courseId }
        ).populate(
            {
                path: "instructor",
                populate: {
                    path: "additionalDetails"
                }
            }
        )
            .populate("category")
            //    .populate("ratingAndReview ")
            .populate(
                {
                    path: "courseContent",
                    populate: {
                        path: "subSection"
                    }
                }
            )

        console.log("Courses detais", courseDetails);

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: "Could not find the course "
            })
        }

        return res.status(200).json({
            success: true,
            message: "course details fetched successfully",
            data: courseDetails
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}