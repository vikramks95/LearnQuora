const RatingAndReview = require('../models/RatingAndReview') ;
const Course = require('../models/Course');
const { trusted } = require('mongoose');

exports.createRating = async (req , res) => {
    try{
        
        // get userId from the req.user
        const userId = req.user.id ;
        
        // fetch the courseId , Rating , Review  from the body
        const {courseId , rating , review} = req.body ;

        // check the user is enrolled in
        const courseDetails = await Course.findOne(       
                        {_id : courseId ,
                        studentEnrollement : {
                            $elemMatch : {
                                $eq : userId
                            }
                        }}
                       )

        if(!courseDetails){
            return res.status(400).json({
                success : false ,
                message : "The user is not enrolled in the course"
            })
        }

        // check that Student is already review

        const alreadyReviewed = await RatingAndReview.findOne(
                        {
                            user : userId ,
                            course : courseId ,
                        }
        )

        if(alreadyReviewed){
            return res.status(403).json({
                success : false ,
                message : "Student already review de chuka hai"
            })
        }

        // create the rating and review
        const ratingReview = await RatingAndReview.create({
            user : userId ,
            course : courseId ,
            rating : rating  ,
            review : review
        })


        //update the course shema 
        const updatedCourse = await Course.findByIdAndUpdate(
                        courseId , 
                        {
                            $push : {
                                ratingAndReview : ratingReview,
                            }
                        },
                        {new : true}

                 )

        // return the response
        return res.status(200).json({
            
            success : true ,
            message : "Rating and Review created Successfully",
            data : ratingReview
        
        })

        

    }
    catch(error){
        res.status(500).json({
            success : false ,
            message : "Error while creating the rating and review",
            message2 : error.message
        })
    }
}

exports.getAverageRating = async (req , res) => {
        try{
            // get course id
            const {courseId} = req.body ;

            // calculate the average
            const result = await RatingAndReview.aggregate(
                [
                    {
                        $match : {
                            course : new mongoose.Types.ObjectId(courseId),

                        },
                    },
                    {
                        $group : {
                            _id : null ,
                            averageRating : {
                                $avg : "$rating"
                            }
                        }
                    }
                ]
            )
            // return rating
            if(result.length > 0){
                return res.status(200).json({
                    success : true ,
                    averageRating 
                })
            }

            // if no rating
            return res.status(200).json({
                    success : true ,
                    message : "Average Rating is 0",
                    averageRating : 0 
                })
        }
        catch(error){
            return res.status(500).json({
                success : false ,
                message : "Error while getAverageRating",
                message2 : error.message 
            })
        }
}




// get All Rating
exports.getAllRating = async (req , res) => {
      try{
            const allRatingReview = RatingAndReview.find({}) 
                                .sort("des")
                                .populate({
                                    path : "user",
                                    select : "firstName lastName email image"
                                })
                                .populate({
                                    path : "course",
                                    select : "courseName"
                                })
                                .exec()

            return res.status(200).json({
                success : true ,
                message : "All review fetched successfully",
                details : allRatingReview ,
            })

      }
      catch(error){
         console.log(error);
         return res.status(500).json({
            success : false ,
            message : error.message
         })
      }
}