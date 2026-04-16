
import { toast } from 'react-hot-toast'
import { apiConnector } from '../apiconnector'
import { courseEndpoints } from '../api'


const {
    COURSE_DETAILS_API ,
    COURSE_CATEGORIES_API,
    CREATE_COURSE_API ,
    EDIT_COURSE_API ,
    CREATE_SECTION_API ,
    UPDATE_SECTION_API ,
    DELETE_SECTION_API , 
    CREATE_SUBSECTION_API ,
    UPDATE_SUBSECTION_AP ,
    DELETE_SUBSECTION_API ,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API
} = courseEndpoints;



export const fetchCourseCategories = async () => {
    let result = [];

    try {
        const response = await apiConnector("GET", COURSE_CATEGORIES_API);

        console.log("COURSE_CATEGORIES_API API RESPONSE in courseAPI ............", response)

        if (!response?.data?.success) {
            throw new Error("Could not fetch the course categories")
        }

        result = response?.data?.data;

        return result;

    }
    catch (error) {
        console.log("Error while fetching all the categories", error);
        toast.error(
            error?.response?.data?.message || error.message
        )
        return [] ;
    }
}


// Course Service
export const addCoursesDetails = async (data, token) => {
    let result = null;
    const {toastId} = toast.loading("Loading...");
    try {
        
        const response = await apiConnector("POST", CREATE_COURSE_API, data, {
            // "Content-Type": "multipart/form-data",
            // Authorization: `Bearer ${token}`,
            Authorization: `Bearer ${token}`
        })

        console.log("CREATE COURSE API RESPONSE............", response)

        if (!response?.data?.success) {
            throw new Error("Could Not Add Course Details")
        }

        result = response?.data?.data ;
        toast.dismiss(toastId);
        toast.success("Course created successfully")
        
        
    }
    catch (error) {
        console.log("Error while creating the course", error);
        toast.dismiss(toastId);
        toast.error( error?.response?.data?.message ||error.message);
    }
    
    return result ;
    
}

export const editCourseDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("EDIT COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details")
    }
    toast.success("Course Details Updated Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("EDIT COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const fetchInstructorCourse = async (token) => {
    let result = null;
    const {toastId} = toast.loading("Loading...");
    try {

        console.log("token in service feild" , token);
        
        const response = await apiConnector("GET", GET_ALL_INSTRUCTOR_COURSES_API, null ,{
             Authorization: `Bearer ${token}`
        })

        console.log("FETCH INSTRUCTOR COURSE RESPONSE............", response)

        if (!response?.data?.success) {
            throw new Error("Could Not fetch the instructor course Details")
        }

        result = response?.data?.data ;
        toast.dismiss(toastId);
        toast.success("Instructor Course  successfully")
        
        
    }
    catch (error) {
        console.log("Error while fetching the instructor course", error);
        toast.dismiss(toastId);
        toast.error( error?.response?.data?.message ||error.message);
    }
    
    return result ;
}

export const fetchCourseDetails = async (courseId) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector("POST", COURSE_DETAILS_API, {
      courseId,
    })
    console.log("COURSE_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data
  } catch (error) {
    console.log("COURSE_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}


export const deleteCourse = async (courseId, token) => {
    let result = null;
    const {toastId} = toast.loading("Loading...");
    try {
        
        const response = await apiConnector("DELETE", DELETE_COURSE_API , {courseId} , {
            // "Content-Type": "multipart/form-data",
            // Authorization: `Bearer ${token}`,
            Authorization: `Bearer ${token}`
        })

        console.log("DELETE COURSE API RESPONSE............", response)

        if (!response?.data?.success) {
            throw new Error("Could Not Delete Course Details")
        }

        result = response?.data?.data ;
        toast.dismiss(toastId);
        toast.success("Course deleted successfully")
        
        
    }
    catch (error) {
        console.log("Error while deleting the course", error);
        toast.dismiss(toastId);
        toast.error( error?.response?.data?.message ||error.message);
    }
    
    return result ;
    
}

// Section Service
export const createSectionDetails = async (sectionName , courseId , token) =>{
    let result = null 
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST" , CREATE_SECTION_API , {sectionName , courseId} , { Authorization: `Bearer ${token}`});

        console.log("CREATE SECTION API RESPONSE............", response)

        if (!response?.data?.success) {
            throw new Error("Could not create section")
        }

        result = response?.data?.data ;

        toast.dismiss(toastId);
        toast.success("Section created successfully")
    }
    catch(error){
        console.log("Error while creating the section " , error);
        toast.dismiss(toastId);
        toast.error(error?.response?.message || error.message);
    }
    return result ;
}

export const updateSectionDetails = async (sectionName , sectionId , courseId , token) => {
    let result = null 
    const toastId = toast.loading("Loading...");
    try{
        
        const response = await apiConnector("PUT" , UPDATE_SECTION_API , {sectionName ,sectionId , courseId} , { Authorization: `Bearer ${token}`});

        console.log("CREATE SECTION API RESPONSE............", response)

        if (!response?.data?.success) {
            throw new Error("Could not create section")
        }

        result = response?.data?.data ;

        toast.dismiss(toastId);
        toast.success("Section updated successfully")
    }
    catch(error){
        console.log("Error while updating the section " , error);
        toast.dismiss(toastId);
        toast.error(error?.response?.message || error.message);
    }
    return result ;
}

export const deleteSection = async (sectionId , courseId , token) => {
     let result = null 
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("DELETE" , DELETE_SECTION_API , {sectionId , courseId} , { Authorization: `Bearer ${token}`});

        console.log("DELETE SECTION API RESPONSE............", response)

        if (!response?.data?.success) {
            throw new Error("Could not create section")
        }

        result = response?.data?.data ;

        toast.dismiss(toastId);
        toast.success("Section deleted successfully")
    }
    catch(error){
        console.log("Error while deleting the section " , error);
        toast.dismiss(toastId);
        toast.error(error?.response?.message || error.message);
    }
    return result ;
}

// SubSection Service
export const createSubSection = async (data , token) => {
    let result = null;
    const {toastId} = toast.loading("Loading...");
    try {
        
        const response = await apiConnector("POST", CREATE_SUBSECTION_API , data, {
            // "Content-Type": "multipart/form-data",
            // Authorization: `Bearer ${token}`,
            Authorization: `Bearer ${token}`
        })

        console.log("CREATE SUB_SECTION API RESPONSE............", response)

        if (!response?.data?.success) {
            throw new Error("Could Not Create Sub_Section Details")
        }

        result = response?.data?.data ;
        toast.dismiss(toastId);
        toast.success("Sub-Section created successfully")
        
        
    }
    catch (error) {
        console.log("Error while creating the SubSection", error);
        toast.dismiss(toastId);
        toast.error( error?.response?.data?.message ||error.message);
    }
    
    return result ;
}
export const updateSubSection = async (data , token) => {
    let result = null;
    const {toastId} = toast.loading("Loading...");
    try {
        
        const response = await apiConnector("PUT", UPDATE_SUBSECTION_AP , data, {
            // "Content-Type": "multipart/form-data",
            // Authorization: `Bearer ${token}`,
            Authorization: `Bearer ${token}`
        })

        console.log("UPDATE SUB_SECTION API RESPONSE............", response)

        if (!response?.data?.success) {
            throw new Error("Could Not Create Sub_Section Details")
        }

        result = response?.data?.data ;
        toast.dismiss(toastId);
        toast.success("Sub-Section updated successfully")
        
        
    }
    catch (error) {
        console.log("Error while updating the SubSection", error);
        toast.dismiss(toastId);
        toast.error( error?.response?.data?.message ||error.message);
    }
    
    return result ;
}
export const deleteSubSection = async (subSectionId , sectionId , token) => {
     let result = null 
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("DELETE" , DELETE_SUBSECTION_API , {subSectionId , sectionId} , { Authorization: `Bearer ${token}`});

        console.log("DELETE SUB SECTION API RESPONSE............", response)

        if (!response?.data?.success) {
            throw new Error("Could not create section")
        }

        result = response?.data?.data ;

        toast.dismiss(toastId);
        toast.success(" Sub Section deleted successfully")
    }
    catch(error){
        console.log("Error while deleting the section " , error);
        toast.dismiss(toastId);
        toast.error(error?.response?.message || error.message);
    }
    return result ;
}




