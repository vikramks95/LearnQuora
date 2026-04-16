const User = require('../models/User')
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt')
const crypto = require('crypto')


// reset Password Token
exports.resetPasswordToken = async (req, res) => {
    try {
        // fetch the email from the req body
        const { email } = req.body;

        // validate the email
        if (!email) {
            return res.status(404).json({
                success: false,
                message: 'Email registered nahi hai'
            })
        }

        // check that user is present or not
        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User is not Present'
            })
        }

        // generate the token
        const token = crypto.randomUUID()  // it will create a string

        // update user by token and reset password 
        const updatedDetails = await User.findOneAndUpdate(
            {
                email: email    // find one the basis of the email
            },
            {
                token: token,     // token ko User model mai insert kar diya
                resetPasswordExpires: Date.now() + 5 * 60 * 1000
            },
            {
                new: true,  // updated result milega
            }
        )

        // create the url
        const url = `http://localhost:5173/update-password/${token}`

        // send the mai
        await mailSender(email, "Password Reset Link", `Password Reset Link : ${url}`);

        // return the response
        res.status(200).json({
            success: true,
            message: 'Reset Password ka email send ho gaya hai',
            data : token

        })

    }
    catch (error) {
        console.log("Error while Reset Password Token", error.message);
        res.status(500).json({
            success: false,
            message: "Error while resetPasswordToken",
            "message2" : error.message
        })
    }
}

// reset Password

exports.resetPassword = async (req, res) => {
    try {
        // data fetch kar lo body se (token to hamra parameter mai hai , token to frontend ne req ke body mai wrap kiya hai password aur confirm password ke sath)
        const { password, confirmPassword, token } = req.body;

        // validation of data
        if (password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: 'Password and Confirm Password are not matched'
            })
        }

        // get user details by the token
        const user = await User.findOne({ token: token });

        // if not entry - invalid token
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User is not registered'
            })
        }
        //check the time of the token
        if (user.resetPasswordExpires < Date.now()) {
            return res.status(401).json({
                success: false,
                message: "Time has Expired"
            })
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // update the password
        await User.findOneAndUpdate(
            { token },
            { password: hashedPassword },
            { new: true }
        )

        // send the email
        const emailResponce = await mailSender(user.email , "Reset Password" , `Reset password successfully ${password}`)

        // return the res
        return res.status(200).json({
            success: true,
            message: "Password Reset Successfully"
        })
    }
    catch (error) {

        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Error while reset Password",
            message2 : error.message 
        })
    }
}