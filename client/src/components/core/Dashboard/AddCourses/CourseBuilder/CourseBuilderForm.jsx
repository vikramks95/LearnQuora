import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn'
import { IoAddCircleOutline } from 'react-icons/io5'
import { MdNavigateNext } from 'react-icons/md'
import { setStep, setCourse, setEditCourse } from '../../../../../slice/courseSlice';
import { createSectionDetails , updateSectionDetails} from '../../../../../services/operation/courseAPI';
import NestedView from './NestedView';
const CourseBuilderForm = () => {


    const dispatch = useDispatch();
    const { step, editCourse, course } = useSelector((state) => state.course)
    const [editSectionName, setEditSectionName] = useState(null);
    const { token } = useSelector((state) => state.auth)

    const {
        register,
        formState: { errors },
        setValue,
        getValues,
        handleSubmit
    } = useForm();

    const cancelEdit = () => {
        console.log("cancel button is working");
        setEditSectionName(null);
        setValue("sectionName", "");
    }

    const goBack = () => {
        dispatch(setEditCourse(true));
        dispatch(setStep(1));
    }

    const goToNext = () => {
        dispatch(setStep(3));
    }

    const handleChangeEditSectionName = (sectionId, sectionName) => {
        console.log("Yaha tak data pahuch raha hai", sectionId);
        console.log("section name", sectionName)
        if (editSectionName === sectionId) {
            cancelEdit();
            return;
        }
        setEditSectionName(sectionId);
        setValue("sectionName", sectionName);
    }
    const submitHandler = async (data) => {
        
        let result ;
        const courseId = course._id;
        if (editSectionName) {
            console.log("section name" , data.sectionName);
            console.log("section id" , editSectionName);
            result = await updateSectionDetails( data.sectionName , editSectionName , courseId, token);
            console.log("Result of the updated course" , result);
            dispatch(setCourse(result));
        }
        else {
            console.log("course id of the course",);
            result = await createSectionDetails(data.sectionName, courseId, token)
            dispatch(setCourse(result));
        }
    }

    return (
        <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 ">
            <p className="text-richblack-5 text-2xl font-semibold">Course Builder</p>
            <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
                <div className="flex flex-col space-y-2">
                    <label htmlFor="sectionName" className="text-richblack-5 font-semibold">Section Name</label>
                    <input
                        type="text"
                        placeholder='Add a section to build your course'
                        id="sectionName"
                        name="sectionName"
                        {...register("sectionName", { required: true })}
                        className="form-style w-full"
                    />
                    {
                        errors.sectionName && (
                            <span className="ml-2 text-xs text-pink-200">Section Name is required</span>
                        )
                    }
                </div>

                <div className="flex items-end gap-x-4">
                    <IconBtn
                        text={
                            editSectionName ? "Edit Section Name" : "Create Section"
                        }
                        type="submit"
                        outline={true}
                    >
                        <IoAddCircleOutline size={20} className="text-yellow-50" />
                    </IconBtn>

                    {
                        editSectionName && (
                            <button
                                onClick={cancelEdit}
                                className="text-sm text-richblack-300 underline"
                            >
                                Cancel Edit
                            </button>
                        )
                    }
                </div>
            </form>

            {/* section and subSection creation form */}


            {
                course?.courseContent?.length > 0 && (
                    <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
                )
            }

            <div className='flex justify-end gap-x-4'>
                <button
                    onClick={goBack}
                    className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                >
                    Back
                </button>

                <IconBtn
                    text="Next"
                    onclick={goToNext}

                >
                    <MdNavigateNext />
                </IconBtn>
            </div>
        </div>
    )
}

export default CourseBuilderForm
