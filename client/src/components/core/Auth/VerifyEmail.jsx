import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OtpInput from 'react-otp-input';
import { signup } from '../../../services/operation/authAPI';
import { Navigate, useNavigate } from 'react-router-dom';
import { RxCountdownTimer } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { sendOtp } from '../../../services/operation/authAPI';

const VerifyEmail = () => {
  
    const dispatch = useDispatch();
    const [otp, setOtp] = useState("");
    const { loading } = useSelector((state) => state.auth);
    const { signupData } = useSelector((state) => state.auth);

    console.log("signUp Data = ", signupData);

    useEffect(() => {
        if (!signupData) {
            navigate('/signup');
        }
    } , [])

    const navigate = useNavigate();

    function submitHandler(e) {
        e.preventDefault();

        const { firstName, lastName, email, password, confirmPassword, accountType } = signupData;
        console.log("firstName", firstName);
        console.log("lastName", lastName);
        console.log("email", email);
        console.log("password", password);
        console.log("confirmPassword", confirmPassword);
        console.log("accountType", accountType);
        console.log("otp", otp);

        dispatch(signup(
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            accountType,
            navigate
        ))

    }


    return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {
                loading ?
                    (<div>Loading...</div>) :
                    (
                        <div className="max-w-[500px] p-4 lg:p-8">
                            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Verify Email</h1>
                            <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">A verification code has been sent to you . Enter the code below</p>

                            <form onSubmit={submitHandler}>
                                <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderInput={(props) => (
                                        <input
                                            {...props}
                                            placeholder="-"
                                            style={{
                                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                            }}
                                            className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                        />
                                    )}
                                    containerStyle={{
                                        justifyContent: "space-between",
                                        gap: "0 6px",
                                    }}
                                />

                                <button type="submit" className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900">Verify  Email</button>
                            </form>

                            <div className="mt-6 flex items-center justify-between">
                                <Link to="/signup">
                                    <p className="text-richblack-5 flex items-center gap-x-2">
                                        <BiArrowBack /> Back To Signup
                                    </p>
                                </Link>
                                <button
                                    className="flex items-center text-white gap-x-2"
                                    onClick={() => dispatch(sendOtp(signupData.email , navigate))}
                                >
                                    <RxCountdownTimer />
                                    Resend it
                                </button>
                            </div>
                        </div>


                    )
            }
        </div>
    )
}

export default VerifyEmail
