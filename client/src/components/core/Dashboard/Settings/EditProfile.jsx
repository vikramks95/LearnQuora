import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn'
import { updateProfile } from '../../../../services/operation/settingAPI'
import { useNavigate } from 'react-router-dom'
const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]


const EditProfile = () => {

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    function submitHandler(data) {
        console.log("Yaha tak chal raha hai");
        dispatch(updateProfile(data.firstName, data.lastName, data.gender, data.dateOfBirth, data.contactNumber, data.about, token , navigate))
    }

    return (
        <div className="text-white">
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                    <h2 className="text-lg font-semibold text-richblack-5">
                        Profile Information
                    </h2>

                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="firstName" className='text-[14px] text-richblack-5'>First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                placeholder='Enter firstName'
                                {...register("firstName", { required: true })}
                                defaultValue={user?.firstName}
                                className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none"
                            />
                            {
                                errors.firstName && (
                                    <span className="-mt-1 text-[12px] text-yellow-100">
                                        Please enter your first name.
                                    </span>

                                )
                            }
                        </div>

                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="lastName" className='text-[14px] text-richblack-5'>lastName</label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                {...register("lastName", { required: true })}
                                defaultValue={user?.lastName}
                                placeholder='Enter your lastName'
                                className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none"
                            />

                            {
                                errors.lastName && (
                                    <span>
                                        Enter your last Name
                                    </span>
                                )
                            }
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="dateOfBirth" className="text-[14px] text-richblack-5">Enter your Date of Birth</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                id="dateOfBirth"
                                className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                                {...register("dateOfBirth", {
                                    required: {
                                        value: true,
                                        message: "Please enter your Date of Birth.",
                                    },
                                    max: {
                                        value: new Date().toISOString().split("T")[0],
                                        message: "Date of Birth cannot be in the future.",
                                    },
                                })}
                                defaultValue={user?.additionalDetails?.dateOfBirth}
                            />
                            {errors.dateOfBirth && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    {errors.dateOfBirth.message}
                                </span>
                            )}

                        </div>

                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="gender" className=' text-[14px] text-richblack-5'>Gender</label>
                            <select
                                name="gender" id="gender"
                                type="text"
                                {...register("gender", { required: true })}
                                defaultValue={user?.additionalDetails?.gender}
                                className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                            >
                                {
                                    genders.map((element, index) => {
                                        return (
                                            <option key={index} value={element}>
                                                {element}
                                            </option>
                                        )
                                    })
                                }

                            </select>
                            {errors.gender && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your Date of Birth.
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="contactNumber" className='text-[14px] text-richblack-5'>Phone No.</label>
                            <input
                                type="tel"
                                name="contactNumber"
                                id="contactNumber"
                                placeholder='Enter contact number'
                                {...register("contactNumber", {
                                    required: { value: true, message: "Enter the contact number" },
                                    maxLength: { value: 12, message: "Invalid contact number" },
                                    minLength: { value: 8, message: "Invalid contact number" }
                                })}
                                defaultValue={user?.additionalDetails?.contactNumber}
                                className=" rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none"
                            />
                            {
                                errors.contactNumber && (
                                    <span>
                                        {errors.contactNumber.message}
                                    </span>
                                )
                            }
                        </div>

                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="about" className="text-[14px] text-richblack-5">About</label>
                            <input
                                type="text"
                                name="about"
                                id="about"
                                placeholder='Enter bio details'
                                {
                                ...register("about", { required: true })

                                }
                                defaultValue={user?.additionalDetails?.about}
                                className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                <button
                    onClick={() => {
                        navigate("/dashboard/my-profile")
                    }}
                    className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                >
                    Cancel
                </button>
                <IconBtn type="submit" text="Save" />
            </div>
            </form>
            
        </div>
    )
}

export default EditProfile
