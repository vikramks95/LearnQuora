const mongoose = require('mongoose')

const contactScheam = new mongoose.Schema({
        firstName : {
            type : String ,
            trim : true
        },
        lastName : {
            type : String ,
            trim : true
        },
        information : {
            type : String
        },
        email : {
            type : String ,
            trim : true 
        },
        contactNumber : {
            type : String ,
        }
})

module.exports = mongoose.model("Contact" , contactScheam);