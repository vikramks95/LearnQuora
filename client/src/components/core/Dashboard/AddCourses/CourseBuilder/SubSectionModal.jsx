import React, { useEffect, useState } from 'react'
import {RxCross2} from 'react-icons/rx'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import Upload from '../Upload'
import IconBtn from "../../../../common/IconBtn"
import {setCourse} from "../../../../../slice/courseSlice"

import {createSubSection , updateSubSection} from '../../../../../services/operation/courseAPI'

const SubSectionModal = (
  {
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false
  }
) => {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      if(view || edit){
        setValue("leactureTitle" , modalData.title)
        setValue("leactureDescription", modalData.description)
        setValue("lectureVideo", modalData.video)
      }
  } , [])

  const isFormUpdated = () => {
      const currentValues = getValues();
      console.log("Modal data  " , modalData);

      if(currentValues.leactureTitle !== modalData.title || 
          currentValues.leactureVideo !== modalData.video ||
          currentValues.leactureDescription !== modalData.description
      ){
        return true ;
      }
      else{
        return false ;
      }
  }

  const handleEditSubSection = async () => {

  const currentValues = getValues()
  const formData = new FormData()

  formData.append("sectionId", modalData.sectionId)
  formData.append("subSectionId", modalData._id)

  if (currentValues.lectureTitle !== modalData.title) {
    formData.append("title", currentValues.lectureTitle)
  }
  if (currentValues.lectureDescription !== modalData.description) {
    formData.append("description", currentValues.lectureDescription)
  }
  if (currentValues.lectureVideo !== modalData.video) {
    formData.append("video", currentValues.lectureVideo)
  }
    setLoading(true)
    const result = await updateSubSection(formData, token)
    if (result) {
      // console.log("result", result)
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setModalData(null)
    setLoading(false)
    
  }

  const submitHandler = async (data) => {

       if(view){
          return ; 
       }

       if(edit){
           if(!isFormUpdated()){
              toast.error("No changes made to the form");
           }
           else{
              handleEditSubSection();
           }
           return ;
       }
       let formData = new FormData();
       formData.append("sectionId" , modalData);
       formData.append("video" , data.leactureVideo);
       formData.append("title" , data.leactureTitle);
       formData.append("description" , data.leactureDescription);

       setLoading(true)
            let result = await createSubSection(formData , token);
            let updatedCourseContent = course?.courseContent?.map((section) => {
                                    
                                              return  section._id === modalData ? result : section
                                })

            
            const updatedCourse = {...course , courseContent:updatedCourseContent}
            dispatch(setCourse(updatedCourse))
            setModalData(null);
       setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className='text-xl font-semibold text-richblack-5'>
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Leacture
          </p>
          <button
            onClick={() => { !loading ? setModalData(null) : {} }}
          >
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>

        {/* form of the subSection */}
        <form  onSubmit={handleSubmit(submitHandler)}
          className='space-y-8 px-8 py-10'
        >

          <Upload
            name="leactureVideo"
            label="Leacture Video"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          ></Upload>

          <div className='flex flex-col space-y-2'>
            <label className = "text-sm text-richblack-5" htmlFor="leactureTitle">Leactur Title {!view && <sup className="text-pink-200">*</sup>}</label>
            <input
              disabled={view || loading}
              type="text"
              id="leactureTitle"
              placeholder = 'Enter Leacture Title'
              {...register("leactureTitle", { required: true })}
              className="form-style w-full"
            />
            {errors.lectureTitle && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture title is required
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label className = "text-sm text-richblack-5" htmlFor="leactureDescription">Lecture Description{" "} {!view && <sup className="text-pink-200">*</sup>}</label>

            <textarea
              disabled={view || loading}
              name="leactureDescription"
              id="leactureDescription"
              placeholder='Enter Leacture Description'
              {...register("leactureDescription", { required: true })}
              className="form-style w-full min-h-[130px] resize-x-none"
            />

            {
              errors.description && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Lecture Description is required
                </span>
              )
            }


          </div>

          {
            !view && (
              <div className = "flex justify-end">
                <IconBtn
                  disabled={loading}
                  text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                >

                </IconBtn>
              </div>
            )
          }

        </form>
      </div>

    </div>
  )
}

export default SubSectionModal
