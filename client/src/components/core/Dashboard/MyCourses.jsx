import React, { useEffect, useState } from 'react'
import IconBtn from '../../common/IconBtn'
import { useNavigate } from 'react-router-dom'
import { VscAdd } from 'react-icons/vsc'
import { useSelector } from 'react-redux'
import { fetchInstructorCourse } from '../../../services/operation/courseAPI'
import Spinner from '../../common/Spinner'
import CoursesTable from './InstructorCourse/CoursesTable'

const MyCourses = () => {

    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState([]);



    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await fetchInstructorCourse(token);
            if (result) {
                setCourses(result);
            }
            setLoading(false);
        }
        fetchData();
    }, [token])

    return (
        <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-14 gap-y-5">
                <h1 className="text-3xl font-medium text-richblack-5 lg:text-left text-center uppercase tracking-wider">My Courses</h1>
                <div>
                    <IconBtn
                        text="Add Course"
                        type="btn"
                        customClasses="hidden md:block uppercase tracking-wider"
                        onclick={() => { navigate("/dashboard/add-course") }}
                    >
                        <VscAdd />
                    </IconBtn>
                </div>

                <div className='md:hidden'>
                    <IconBtn
                        type="btn"
                        text="Add Course"
                        customClasses="w-full md:w-0 my-5 !py-1 text-center grid place-items-center uppercase tracking-wider"
                        onClickHandler={() => navigate("/dashboard/add-course")}
                    >
                        <VscAdd />
                    </IconBtn>
                </div>
            </div>

            <div>
                {
                    loading ?
                        (<Spinner />) :
                        (

                            !courses || courses.length === 0 ?
                                (
                                    <div>
                                        <div className='h-[1px] mb-10  mx-auto bg-richblack-500' ></div>
                                        <p className='text-center text-2xl font-medium text-richblack-100 select-none' >No Courses Found</p>
                                    </div>
                                ) :
                                (
                                    <CoursesTable courses = {courses} setCourses = {setCourses}/> 
                                )

                        )
                }
            </div>
        </div>
    )
}

export default MyCourses
