const Contact = require('../models/Cantact');
const { getMaxListeners } = require('../models/Category');
const User = require('../models/User');
const mailSender = require('../utils/mailSender')


exports.createContact = async (req , res) => {
    try{
        // fetch the data from the req body
        const {email , firstName , lastName , message , phoneNumber} = req.body ;
        
        // validate the data
        if(!email || !firstName || !message || !lastName || !phoneNumber){
            return res.status(404).json({
                success : false ,
                message : "Data nahi mila hai bhai"
            })
        } 

    

        // create in the Contact model
        // const contactDetails = await Contact.create({
        //     firstName : firstName ,
        //     lastName : lastName ,
        //     email : email ,
        //     information : message ,
        //     contactNumber : phoneNumber
        // })
       

        // authentication
        // const userId = req.user.id ;
        // const userDetails = await User.findById(userId);
        // if(!userId){
        //     return res.status(404).josn({
        //         success : false ,
        //         message : "user is not found in the contact"
        //     })
        // }

        // send the email to the student
        const studentEmailResponse = await mailSender(email , "Message" , {firstName , lastName , email , message , phoneNumber})


        // send the email to the Admin (codeHelp)
        // const adminEmailResponse = await mailSender('codehelp@gmail.com', "Message" , information)


        return res.status(200).json({
            success : true ,
            message : "Contact entry successfully done"
        })
    }
    catch(error){
        return res.status(500).json({
            success: false ,
            message : "Error while contact controller",
            message2 : error.message ,
        })
    }
}