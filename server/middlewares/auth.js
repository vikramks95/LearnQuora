const jwt = require('jsonwebtoken');
require("dotenv").config();




// token authorization
exports.auth =  (req , res , next) => {
    try{
        // fetch the token from the cokkies
       
        const token =  req.cookies?.token || req.body?.token || req.header("Authorization")?.replace("Bearer ", ""); 
        
        //validate the token
        if(!token){
            return res.status(404).json({
                success:false ,
                message:'Token is not found'
            })
        }

        try{
            // varify the token
            const payload = jwt.verify(token , process.env.JWT_SECRET)
            req.user  =  payload ;
        }
        catch(error){
            console.log(error.message);
            return res.status(401).json({
                success:false,
                message : 'token match nahi hua hai'
            })
        }

        next();
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false ,
            message : 'Error while authorization in auth',
            message2 : error.message 
        })
    }
}

// student
exports.isStudent = (req , res , next) => {
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success: false ,
                message : "You are not authorized to access the student page"
            })
        }
        next();
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false ,
            message : "Error while Student Authorization"
        })
    }
    
}

// instructor 
    exports.isInstructor = (req , res , next) => {
    try{
        if(req.user.role !== "Instructor"){
            return res.status(401).json({
                success: false ,
                message : "You are not authorized to access the Instructor page"
            })
        }
        next();
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false ,
            message : "Error while Instructor Authorization"
        })
    }
    
}

// admin
exports.isAdmin = (req , res , next) => {
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success: false ,
                message : "You are not authorized to access the Admin page"
            })
        }
        next();
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false ,
            message : "Error while Admin Authorization"
        })
    }
    
}