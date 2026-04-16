const cloudinary = require('cloudinary').v2 ;

exports.uploadFileToCloudinary = async (file , folder , height , quality) => {
    try{
        // create the options
        const options = {folder};

         // if height 
         if(height){
            options.height = height ;
         }

         // if quality is present
         if(quality){
            options.quality = quality ;
         }

         // detect that file is image or video
         options.resource_type = "auto";     // Cloudinary  automatically detect karega file ka type 

         return await cloudinary.uploader.upload(file.tempFilePath , options)
    }
    catch(error){
        console.log("error" , error.message);
    }
}