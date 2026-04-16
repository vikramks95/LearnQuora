const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const { uploadFileToCloudinary } = require('../utils/imageFileUploader');
const mongoose = require('mongoose');
require("dotenv").config();

exports.createSubSection = async (req, res) => {
    try {
        // fetch the data from the req body
        const { title, description, sectionId } = req.body;


        // fetch the video from the req files
        const video = req.files.video;

        // validat|| !timeDuration e the data
        if (!title || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required in subSection"
            })
        }

        if (!video) {
            return res.status(404).json({
                message: "Video is also required present"
            })
        }

        // upload the video to the cloudinary
        const uploadDetails = await uploadFileToCloudinary(video, process.env.FOLDER_NAME)

        // create the entry in the SubSection Schema
        const newSubSection = await SubSection.create({
            title: title,
            // timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetails.secure_url
        })

        // update the Section Schema
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                $push: {
                    subSection: newSubSection._id,
                }
            },
            { new: true }
        ).populate("subSection")
        // How updated section here populate query

        res.status(200).json({
            success: true,
            message: "SubSection created Successfully",
            data: updatedSection
        })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "Error while createSubSection",
            error: error.message
        })
    }
}


// update SubSection
exports.updateSubSection = async (req, res) => {
    try {
        // fetch the data from the req body
        const { sectionId , title, description, subSectionId } = req.body;

        // fetch the file
        const video = req.files.video;

        // validate 
        if (!title  || !description || !subSectionId) {
            return res.status(401).json({
                success: false,
                message: "All fields are required for updating"
            })
        }



        //validate the subSection
        const subSectionDetails = await SubSection.findById(subSectionId);
        if (!subSectionDetails) {
            return res.status(404).json({
                success: false,
                message: "SubSection is not found"
            })
        }

        // upload the video to the cloudinary
        let videoUrl = subSectionDetails.videoUrl;
        if (video) {
            const videoUpload = await uploadFileToCloudinary(video, process.env.FOLDER_NAME);
            videoUrl = videoUpload.secure_url;
        }

        // update the subsection
        const updatedSubSection = await SubSection.findByIdAndUpdate(
            subSectionId,
            {
                title: title,
                // timeDuration: timeDuration,
                description: description,
                videoUrl: videoUrl

            },
            { new: true }
        )

        const updatedSection = await Section.findById(sectionId).populate("subSection");

        // return res
        res.status(200).json({
            success: true,
            message: "SubSection updated Successfully",
            data: updatedSection
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while updating the SubSection",
            error : error.message

        })
    }
}

// delete SubSection
exports.deleteSubSection = async (req, res) => {
    try {
        // fetch the data 
        const { subSectionId, sectionId } = req.body;

        console.log(subSectionId);
        console.log(sectionId);

        // validation
        if (!subSectionId || !sectionId) {
            return res.status(401).json({
                success: false,
                message: "all the details shoud be "
            })


            // validation on the subSection Schema
            const subSectionDetails = await SubSection.findById(subSectionId);
            if (!subSectionDetails) {
                return res.status(404).json({
                    success: false,
                    message: "subSection details are not present"
                })
            }

            // remove from the Section Schema

            const sectionDetails = await Section.findByIdAndUpdate(
                sectionId,
                {
                    $pull: {
                        subSection: new mongoose.Types.ObjectId(subSectionId)
                    }
                },
                { new: true }
            ).populate("subSection")

            // delete the subSection
            await SubSection.findByIdAndDelete(subSectionId);

            return res.status(200).json({
                success: true,
                message: "subSection has deleted successfully",
                data: sectionDetails

            })
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while deleting the SubSection",
            error: error.message
        })
    }
}