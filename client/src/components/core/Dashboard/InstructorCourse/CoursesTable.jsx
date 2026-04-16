import React, { useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { COURSE_STATUS } from '../../../../Util/constants'
import { HiClock } from 'react-icons/hi'
import { FaCheck } from 'react-icons/fa'
import { FiEdit2 } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import ConfirmationModal from '../../../common/ConfirmationModal'
import {deleteCourse , fetchInstructorCourse} from '../../../../services/operation/courseAPI'
import { useDispatch, useSelector } from 'react-redux'
import {setCourse} from '../../../../slice/courseSlice'

const CoursesTable = ({courses, setCourses }) => {

    const [confirmationModal, setConfirmationModal] = useState(null);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const {token} = useSelector((state) => state.auth);

    const deleteHandler = async (courseId) => {
        setLoading(true)
           await deleteCourse(courseId , token);
           const result = await fetchInstructorCourse(token);
           if(result){
                console.log("The result of the deleted courses" , result);
                setCourses(result);
           }
        setConfirmationModal(null);
        setLoading(false);
    }
    return (
        <div>
            <Table className="text-white">
                <Thead>
                    <Tr>
                        <Th>Courses</Th>
                        <Th>Duration</Th>
                        <Th>Price</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        courses.length === 0 ?
                            (
                                <Tr>
                                    <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                                        No courses found
                                        {/* TODO: Need to change this state */}
                                    </Td>
                                </Tr>
                            ) :
                            (
                                courses.map((course) => (
                                    <Tr key={course._id}>
                                        <Td colSpan={1} className="flex flex-1 gap-x-4 p-3">
                                            <img src={course.thumbnail} alt="" className="md:h-[148px] md:w-[220px] aspect-video rounded-lg object-cover" />
                                            <div className="flex flex-col gap-1 justify-between">

                                                <p className="text-lg font-semibold text-richblack-5 mt-3 uppercase truncate tracking-wide">{course.courseName}</p>

                                                <ul style={{ listStyle: 'none', padding: 0 }} className="tracking-wider">
                                                    {course.courseDescription.split('\n').splice(0, 1).map((line, index) => (
                                                        <li key={index} style={{ display: 'flex', alignItems: 'flex-start' }} className="text-xs text-richblack-300">
                                                            <span style={{ marginRight: '0.5em' }}>{index + 1}.</span>
                                                            <span>{line.trim().substring(line.indexOf('.') + 1).trim()}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <p className="text-[12px] text-white tracking-widest uppercase lg:text-left text-center" >Created At : </p>
                                                {
                                                    course.status === COURSE_STATUS.DRAFT ?
                                                        (
                                                            <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100 uppercase tracking-wider">
                                                                <HiClock size={14} />
                                                                Drafted
                                                            </p>
                                                        ) :
                                                        (
                                                            <div className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100 uppercase tracking-wider">
                                                                <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                                                                    <FaCheck size={8} />
                                                                </div>
                                                                Published
                                                            </div>
                                                        )


                                                }
                                            </div>
                                        </Td>

                                        <Td className="text-sm font-medium text-richblack-100 mb-1 tracking-wider ">
                                            2hr 30 min
                                        </Td>

                                        <Td className="text-sm font-medium text-richblack-100 mb-1 tracking-wider uppercase">
                                            ₹{course.price}
                                        </Td>

                                        <Td className="text-sm font-medium text-richblack-100 tracking-wider uppercase">
                                            <button
                                                className="pr-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300 mr- mb-"
                                            >
                                                <FiEdit2 size={20} />

                                            </button>

                                            <button
                                                className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                                onClick={() => setConfirmationModal({
                                                    text1: "Do you want to delete this course?",
                                                    text2: "All the data related to this course will be deleted",
                                                    btn1Text: !loading ? "Delete" : "Loading...",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: !loading
                                                        ? () => deleteHandler(course._id)
                                                        : () => { },
                                                    btn2Handler : !loading
                                                        ? () => setConfirmationModal(null) 
                                                        : () => {}
                                                })}
                                            >

                                                <RiDeleteBin6Line size={20} />
                                            </button>
                                        </Td>
                                    </Tr>
                                ))
                            )
                    }
                </Tbody>
            </Table>

            {
                confirmationModal && <ConfirmationModal modalData={confirmationModal} setConfirmationModal = {setConfirmationModal}/>
            }
        </div>
    )
}

export default CoursesTable
