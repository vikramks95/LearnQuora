const Category = require('../models/Category');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

exports.createCategory = async (req , res) => {
  try{

    // fetch the data from the req body
    const {name , description} = req.body ;

    // validate the data
    if(!name || !description){
      return res.this.status(401).json({
        succeess:false ,
        message : "All the fiels are required"
      })
    }

    // create the Category
    const categoryDetails = await Category.create({
      name : name ,
      description : description 
    })

    res.status(200).json({
      success : true ,
      message : "Category is created successfully"
    })

  }
  catch(error){
    console.log(error.message);
    return res.status(500).json({
      success: false ,
      message : "Error while creating the Category",
      message2 : error.message
    })
  }
}


exports.showAllCategory = async (req , res) => {
  try{
    const categoryDetails = await Category.find({} , {
      name : true ,
      description : true 
    })

    res.status(200).json({
      success : true ,
      message : "Category ka data nikal chuka hai",
      data : categoryDetails
    })
  }
  catch(error){
    console.log("Error : " , error.message);
    res.status(500).json({
      success : false ,
      message : " Error while getting the data ",
      message2 : error.message

    })
  }
}


// categoryPageDetails
exports.categoryPageDetails = async (req, res) => {
  try {
    const {categoryId} = req.body;
    console.log("category id in controller" , categoryId);

    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        // populate: "ratingAndReview",
      })
      .exec();

    if (!selectedCategory) {
      console.log("Category not found.");
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    if (selectedCategory.courses.length === 0) {
      console.log("No courses found for the selected category.");
      return res.status(200).json({
        success: true,
        message: "No courses found for the selected category.",
      });
    }

    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    });
    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
      .populate({
        path: "courses",
        match: { status: "Published" },
      })
      .exec();
    console.log();

    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
      })
      .exec();
    const allCourses = allCategories.flatMap((category) => category.courses);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);

    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};