import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import CountryCode from '../../assets/data/CountryCode.json'
import {toast} from 'react-hot-toast';
import { apiConnector } from '../../services/apiconnector';
import {contactusEndpoint} from '../../services/api'


const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);
    const {CONTACT_US_API} = contactusEndpoint ;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm();


    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstName: "",
                lastName: "",
                message: "",
                phoneNo: ""
            }, [isSubmitSuccessful, reset])
        }
    })

    const submitContactForm = async (data) => {
        console.log("data submit ho gaya hai", data);
        setLoading(true);
        try{
            
            const {firstName , lastName , email , message , phoneNumber} = data;
            const response = await apiConnector("POST" , CONTACT_US_API , {firstName , lastName , email , message , phoneNumber});

            if(!response.data.message){
                throw new Error(response.data.message);
            }

            console.log("RESPONSE CONTACT US  : " , response);

            toast.success("Message sent successfully");
        }
        catch(error){
            console.log("Error : " , error);
            toast.error(
                error?.response?.data?.message || "unable to send message"
            )
        }
        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit(submitContactForm)} className="flex flex-col gap-7">

           {/* firstName and Second Name */}
            <div className="flex flex-col gap-5 lg:flex-row">
                <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor="firstName" className="text-[14px] text-richblack-5">FirstName</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder='Enter first Name'
                        {...register("firstName", { required: true })}
                        className=" rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none;"
                    />
                    {
                        errors.firstName && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your name
                            </span>
                        )
                    }
                </div>

                <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor="lastName" className="text-[14px] text-richblack-5">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder='Enter last Name'
                        {...register("lastName")}
                        className=" rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none;"
                    />
                </div>
            </div>


            {/* email */}
            <div className = "flex flex-col gap-2">
                <label htmlFor="email" className="text-[14px] text-richblack-5">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder='Enter email Address'
                    {...register("email", { required: true })}
                    className=" rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none;"
                />
                {
                    errors.email && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter email
                        </span>
                    )
                }
            </div>

            {/* phone */}
            <div className="flex flex-col gap-2">
                <label htmlFor="phoneNumber" className="text-[14px] text-richblack-5">Phone</label>

                <div className="flex gap-5">
                    {/* dropdown */}
                    <div className="flex w-[81px] flex-col gap-2">
                        <select
                            name="dropdown"
                            id="dropdown"
                            {...register("countryCode", { reqired: true })}
                            className=" rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none;"
                        >

                            {
                                CountryCode.map((element, index) => {
                                    return (
                                        <option key={index} value={element.code}>
                                            {element.code} - {element.country}
                                        </option>
                                    )
                                })
                            }

                        </select>
                    </div>

                    <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                        <input
                            type="Number"
                            name="phonenumber"
                            id="phonenumber"
                            placeholder='12345 67890'
                            className=" rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none;"
                            {...register("phoneNumber",
                                {
                                    required: {
                                        value: true,
                                        message: "Please enter phone number"
                                    }
                                    , maxLength: { value: 10, message: "Invalid Phone number" }
                                    , minLength: { value: 10, message: "Invalid Phone number" }
                                })}

                        />

                        {
                            errors.phoneNo && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    {
                                        errors.phoneNo.message
                                    }
                                </span>
                            )
                        }
                    </div>

                </div>
            </div>


            {/* message  */}

            <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-[14px] text-richblack-5">Message</label>
                <textarea
                    name="message"
                    id="message"
                    placeholder='Enter Your message here'
                    rows={7}
                    cols={30}
                    {...register("message", { required: true })}
                    className=" rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none;"
                />



                {
                    errors.message && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter message
                        </span>
                    )
                }
            </div>

            {/* button */}
            <button type="submit"
                className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                  ${!loading &&
                    "transition-all duration-200 hover:scale-95 hover:shadow-none"
                    }  disabled:bg-richblack-500 sm:text-[16px] `}
            >
                Send Message
            </button>
        </form>
    )
}

export default ContactUsForm
