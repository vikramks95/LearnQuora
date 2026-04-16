const User = require('../models/User');
const OTP = require('../models/OTP');
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt')
const Profile = require('../models/Profile')
const jwt = require('jsonwebtoken');
const { config } = require('dotenv');
require("dotenv").config()
const mailSender = require('../utils/mailSender')


// Send OTP
exports.sendOTP = async (req , res) => {
    try{
        // fetch the email from the req body
        const {email} = req.body;

        // check if user already exist 
        const checkUserPresent = await User.findOne({email});

        // if user already exist, then return the response
        if(checkUserPresent){
            return res.status(401).json({
                success:false ,
                message : "User already registered"
            })
        }

        // generate the otp
        var otp = otpGenerator.generate(6 , {
            upperCaseAlphabets : false ,
            lowerCaseAlphabets : false ,
            specialChars : false ,
            
        })
        console.log("Generated OTP is : " , otp);

        // check unique otp
        let result = await OTP.findOne({otp : otp});

        while(result){
            otp = otpGenerator.generate(6 , {
            upperCaseAlphabets : false ,
            lowerCaseAlphabets : false ,
            specialChars : false ,
            
            })
            result = await OTP.findOne({otp : otp});
        }

        console.log("Generated OTP is : " , otp);

        // save the otp in the database OTP Schema
        const otpBody = await OTP.create({
            email, 
            otp ,
        })

        return res.status(200).json({
            success:true ,
            message : "OTP Sent Successfully",
            data : otp
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false ,
            message : 'error.message'
        })
    }
}

// sign up
exports.signUp = async (req , res) => {
    try{
        // fetch the data from the req 
        const {firstName , lastName , email , password , confirmPassword , accountType , otp} = req.body;

        // validate the data 
        if(!firstName || !lastName || !email || !password || !confirmPassword || !accountType || !otp){
            return res.status(403).json({
                success:false ,
                message: 'data fill karo sab'
            })
        }
        
        // dono password ko match karo
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false ,
                message : "password aur confirm password same nahi hai"
            })
        }

        // check user already exist or not
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false ,
                message : 'User is already registered'
            })
        }

        // find most recent otp stored for the User
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log("recentOtp : " , recentOtp)

        // validate OTP
        if(recentOtp.length == 0){
            return res.status(400).json({
                success : false ,
                message : 'otp not found'
            })
        }
        console.log("OTP : " , recentOtp[0]);
        if(recentOtp[0].otp !== otp){
            
            return res.status(400).json({
                success:false ,
                message : "otp not matching"
            })
        }


        // hash the password
        const hashedPassword = await bcrypt.hash(password , 10);

        const profileDetails = await Profile.create({
            gender : null ,
            dateOfBirth : null ,
            about : null ,
            contactNumber : null
        })
            

        // create entry in the User Schema
        const user = await User.create({
            firstName ,
            lastName ,
            email ,
            password : hashedPassword ,
            accountType ,
            additionalDetails : profileDetails._id ,
            image : `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        // return res
        return res.status(200).json({
            success:true ,
            message : "User is registered Successfully ",
            user
        })

    }
    catch(error){
        console.log(error.message);
        console.log("Sign Up karne mai dikkat aa rahi hai")
        return res.status(500).json({
            success:false ,
            message : "User can not be registered",
            message2 : error.message 
        })
    }
}

// login 
exports.login = async (req , res) => {
    try{
        // fetch the data from the req
        const {email , password} = req.body;

        // validate the email and password
        if(!email || !password){
            return res.status(403).json({
                success:false ,
                message : "All the fields are required"
            })
        }

        // check that user exist or not
        const user = await User.findOne({email}).populate("additionalDetails");

        if(!user){
            return res.status(401).json({
                success:false ,
                message : "User is not registered "
            })
        }

        // compare the password
        const isPasswordMatch  = await bcrypt.compare(password , user.password);

        if(isPasswordMatch){
            // create the token 
            const payload = {
                email : user.email ,
                id : user._id ,
                role : user.accountType
            }
            const token = jwt.sign(payload , process.env.JWT_SECRET 
                
            )

            user.token = token ;    // isko ek bar dekh ke bhai
            user.password = undefined ;
   
            //cookies generate kar lo
            const options = {
                expiresIn : new Date (Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly : true ,
            }
            res.cookie("token" , token , options).status(200).json({
                success:true ,
                token ,
                user ,
            })
        }

        else{
            // the password is not validated
            return res.status(403).json({
                success : false ,
                message : "the password is not matched"
            })
        }

    }
    catch(error){
        console.log(error);
        console.log("Error while login");
        return   res.status(500).json({
            success:false ,
            message : "Error while login",
            
        })
    }
}

// change Password
exports.changePassword = async (req , res) => {
    try{
        // get data from req body
        const  { currentPassword , newPassword} = req.body;

        const userId = req.user.id;
       
        if(!userId){
           return res.status(401).json({
                success : false ,
                message : "Email is not found"
            })
        }

        // check the user is present or not
        const userDetails = await User.findById(userId);
        if(!userDetails){
            return res.status(401).json({
                success:false ,
                message : "Email is not registered"
            })
        }
        
        // match the password
        const isPasswordMatch = await bcrypt.compare(currentPassword , userDetails.password);
        if(!isPasswordMatch){
            return res.status(401).json({
                success:false ,
                message : "Password is not matching"
            })
        }

        // hash the newPassword
        const hashedPassword = await bcrypt.hash(newPassword , 10);
        
        // update password in the database
        const updatedDetails = await User.findOneAndUpdate(
            {_id : userId} ,
            {password : hashedPassword},
            {new : true}
        )
        // send mail - password updated 
        const emailResponce =  await mailSender(userDetails.email , "Password has Changed" , `The new password is ${newPassword}`)

        // return response
        res.status(200).json({
            success:true ,
            message : "Password Changed Successfully"
        })
    }
    catch(error){
        console.log("Error occur during change password ", error.message);
        res.status(500).json({
            success:false ,
            message : "Error while changing the password",
            message2 : error.message
        })
    }
}


