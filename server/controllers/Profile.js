const Profile = require('../models/Profile');
const User = require('../models/User');
const {uploadFileToCloudinary} = require('../utils/imageFileUploader');

exports.updateProfile = async (req, res) => {
    try {
        // fetch the data from the req body
        const {firstName  , lastName = "", gender, dateOfBirth = "", about = "", contactNumber } = req.body;

        // fetch the user Id from the req.user which is bind at the time of login and authorization
        const userId = req.user.id;

        // validation
        if (!userId || !gender || !contactNumber) {
            return res.status(404).json({
                success: false,
                message: "userId req ki user field se nahi mil rahi hai"
            })
        }

        // fetch the ProfileId from the User Schema
        const userDetails = await User.findById({ _id: userId });

       

        // fetch the user and update the firstName and lastName
        const updatedUser = await User.findByIdAndUpdate(
                            {_id : userId },
                            {
                                firstName : firstName ,
                                lastName : lastName
                            },
                            {new : true}
        )

        

        // update the profile using the profile Id 
        const updatedProfile = await Profile.findByIdAndUpdate({ _id: userDetails.additionalDetails },
            {
                gender: gender,
                dateOfBirth: dateOfBirth,
                about: about,
                contactNumber: contactNumber
            },
            {
                new : true
            }
        )



        const updatedUserDetails = await User.findById(
                     {_id : userId}
                    ).populate("additionalDetails")
                    .exec();

        updatedUserDetails.password = undefined; 
        
        
        // return the response
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            updatedUserDetails : updatedUserDetails
        })

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while updating the Profile",
            error: error.message
        })
    }
}


// delete the account

exports.deleteAccount = async (req, res) => {
    try {
        // fetch the id 
        const userId = req.user.id;

        // validation
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'id nahi mil raha hai'
            })
        }

        // pahle uska profile delete kar do
        const userDetails = await User.findById({ _id: userId });
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found "
            })
        }

        // profile id nikal lo 
        const profileId = userDetails.additionalDetails;
        await Profile.findByIdAndDelete({ _id: profileId })


        // HomeWork : Course se iska studnetEnrollement wala bhi update kar do

        // fir uska Account delete kar do
        await User.findByIdAndDelete({ _id: userId })

        //return the responce
        res.status(200).json({
            success: true,
            message: "Account delete successfully"
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while Deleting the Account",
            error: error.message
        })
    }
}


// find the all details of the User
exports.getAllUserDetails = async (req, res) => {
    try {
        // fetch the id
        const userId = req.user.id;

        if (!userId) {
            return res.status(404).json({
                success: false,
                    message : "user id nahi mila "
            })
        }

        const userDetails = await User.findById({ _id: userId }).populate("additionalDetails").exec();

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User details nahi mila"
            })
        }

        return res.status(200).json({
            success : true ,
            message : "User details mil gaya hai",
            data : userDetails
        })

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while Deleting the Account",
            error: error.message
        })
    }
}


//update the image of the user
exports.updateDisplayPicture = async (req , res) => {
    try{
            // fetch the data from the req body
            const userId = req.user.id ;
            const image = req.files.imageFile ;   

            // validation on data
            if(!image){
                return res.status(404).json({
                    success : false ,
                    message : "file is not available"
                })
            }
            
            // upload the image on the cloudiary
            const imageDetails = await uploadFileToCloudinary(image , process.env.FOLDER_NAME , 1000 , 1000);

            if(!imageDetails){
                return res.status(401).json({
                    success : false ,
                    message : "image is not uploaded on the cloudinary",
                    
                })
            }

            // update the User Schema
            const updatedUserDetails = await User.findByIdAndUpdate(
                {_id : userId},
                {
                    image : imageDetails.secure_url ,
                },
                {
                    new : true ,
                }
            )

            // return res
            return res.status(200).json({
                success : true ,
                message : "Picture updated Successfully",
                url : imageDetails.secure_url
            })
    }
    catch(error){
        return res.status(500).json({
            success : false ,
            messagge : "Error while the displayPicture",
            error: error.message ,
        })
    }
}