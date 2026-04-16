import React, { useState } from 'react'
import { setLoading } from '../slice/authSlice'
import { useDispatch, useSelector } from 'react-redux'
// const {resetPassword} from '../services/operation/authAPI';
import { resetPassword } from '../services/operation/authAPI';
import { IoMdEye , IoMdEyeOff  } from "react-icons/io";


const UpdatedPassword = () => {
    const dispatch = useDispatch();
    const [showPassword , setShowPassword] = useState(false);
    const [showConfirmPassword , setShowConfirmPassword] = useState(false);
    const [data , setData] = useState({
        password : "",
        confirmPassword : ""
    })
    const {loading} = useSelector((state) => state.auth)

    function changeHandler(e){
        setData((prevData) => ({
            ...prevData ,
            [e.target.name] : e.target.value
           
        }))
        console.log(data.password);
        
    }
    
    function submitHandler(e){
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(data.password ,data.confirmPassword , token ))
        console.log(data);
    }
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {
         loading ? 
        (<div className = "text-white">Loading ... </div>) :
        (
            <div  className="max-w-[500px] p-4 lg:p-8">
                <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Choose new password</h1>

                <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">Almost done Enter your new password and your set</p>

                <form onSubmit = {submitHandler}>
                    <label className="w-full">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">New Password</p>
                        <input 
                           type =  {
                                showPassword ? "text" : "password"
                            }
                            name = "password"
                            value = {data.password}
                            required
                            onChange={changeHandler}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                        />
                        <span onClick = {() => {setShowPassword(!showPassword)}}>
                            {
                                showPassword ? (<IoMdEye />) : (<IoMdEyeOff />)
                            }
                        </span>
                    </label>
                    <label className="w-full">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm new password</p>
                        <input 
                            type = {showConfirmPassword ? "text" : "password"}
                            name = "confirmPassword"
                            value = {data.confirmPassword}
                            required
                            onChange={changeHandler}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                         />
                         <span onClick={() => {setShowConfirmPassword(!showConfirmPassword)}}>
                            {
                                showConfirmPassword ? (<IoMdEye />) : (<IoMdEyeOff />)
                            }
                         </span>
                    </label>

                    <button type="submit" className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">Reset Password</button>
                </form>
            </div>
        )
      }
    </div>
  )
}

export default UpdatedPassword
