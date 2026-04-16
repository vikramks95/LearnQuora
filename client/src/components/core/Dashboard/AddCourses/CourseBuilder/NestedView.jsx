import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from 'react-icons/rx'
import { MdEdit } from 'react-icons/md'
import { RiDeleteBin6Line } from "react-icons/ri"
import { AiFillCaretDown } from 'react-icons/ai'
import {FaPlus} from 'react-icons/fa'
import ConfirmationModal from '../../../../common/ConfirmationModal'
import {deleteSection , deleteSubSection} from '../../../../../services/operation/courseAPI'
import SubSectionModal from './SubSectionModal'
import { setCourse } from '../../../../../slice/courseSlice'

const NestedView = ({ handleChangeEditSectionName }) => {
    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);

    const [confimationModal, setConfirmationModal] = useState(null);

    const handleDeleteSection = async (sectionId) => {
         const courseId = course._id ;
         
         const result = await deleteSection(sectionId , courseId , token)

         if(result){
            dispatch(setCourse(result));
         }

         setConfirmationModal(null);
    }

    const handleDeleteSubSection = async(subSectionId, sectionId) => {
            const result = await deleteSubSection(subSectionId , sectionId , token);

            if(result){
                
                let updatedSection =  course?.courseContent?.map((section) => {
                    return section._id === sectionId ? result : result ;
                })

                let updatedCourse = {...course , courseContent : updatedSection}

                dispatch(setCourse(updatedCourse))
                
            }
            setConfirmationModal(null);
    }
    return (
        <div>
            <div className="rounded-lg bg-richblack-700 p-6 px-8 text-richblack-5">
                {
                    course?.courseContent?.map((section) => (
                        <details key={section._id} open>

                            <summary className="flex items-center justify-between gap-x-3 border-b-2 ">
                                <div className="flex items-center gap-x-3">
                                    <RxDropdownMenu />
                                    <p>{section.sectionName}</p>
                                </div>

                                <div className="flex items-center gap-x-3">

                                    {/* edit wala button */}
                                    <button onClick={() => {handleChangeEditSectionName(section._id, section.sectionName)}}>
                                        <MdEdit />
                                    </button>

                                    {/* delete wala button */}
                                    <button
                                        onClick={() => {
                                            setConfirmationModal({
                                                text1: "Delete This Section",
                                                text2: " Selected Section will be deleted",
                                                btn1Text: "Delete",
                                                btn2Text: "Cancel",
                                                btn1Handler: () => handleDeleteSection(section._id),
                                                btn2Handler: () => setConfirmationModal(null)

                                            })
                                        }}>
                                        <RiDeleteBin6Line className="text-xl text-richblack-300" />

                                    </button>

                                    <span className="font-medium text-richblack-300">|</span>
                                    <AiFillCaretDown className={`text-xl text-richblack-300`} />
                                </div>
                            </summary>

                            <div key={section._id}>
                                {
                                    section?.subSection?.map((data) => (
                                        <div key={data._id}
                                            onClick={() => setViewSubSection(data)}
                                            className='flex items-center justify-between gap-x-3 border-b-2'
                                        >
                                            <div className="flex items-center gap-x-3">
                                                <RxDropdownMenu />
                                                <p>{data.title}</p>
                                            </div>

                                            <div className="flex items-center gap-x-3">

                                                <button onClick={() => setEditSubSection({ ...data, sectionId: section._id })}>
    
                                                    <MdEdit />
                                                </button>

                                                <button
                                                    onClick = {() => setConfirmationModal({
                                                            text1: "Delete This Sub Section",
                                                            text2: "Selected Leacture will be deleted",
                                                            btn1Text: "Delete",
                                                            btn2Text: "Cancel",
                                                            btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                                            btn2Handler: () => setConfirmationModal(null)
                                                        })}
                                                >
                                                    <RiDeleteBin6Line className="text-xl text-richblack-300" />
                                                </button>

                                            </div>
                                        </div>
                                    ))
                                }

                                <button
                                    onClick={() => setAddSubSection(section._id)}
                                    className="mt-3 flex items-center gap-x-1 text-yellow-50"
                                >
                                    <FaPlus className="text-lg" />
                                    <p>Add Lecture</p>
                                </button>

                            </div>

                        </details>
                    ))
                }
            </div>


            {
                editSubSection && (
                    <SubSectionModal modalData = {editSubSection} setModalData = {setEditSubSection} edit = {true}/>
                )   
            }

            {
                viewSubSection && (
                    <SubSectionModal modalData = {viewSubSection} setModalData = {setViewSubSection} view = {true}/>
                )
            }

            {
                addSubSection && (
                    <SubSectionModal modalData = {addSubSection} setModalData = {setAddSubSection} add = {true}/>
                )
            }

            {
                confimationModal ?
                 (<ConfirmationModal modalData = {confimationModal} />) : (<div></div>)
            }
        </div>
    )
}

export default NestedView
