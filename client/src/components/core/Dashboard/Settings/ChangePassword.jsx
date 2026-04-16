import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import IconBtn from '../../../common/IconBtn'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../../../services/operation/settingAPI';

const ChangePassword = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [data, setData] = useState({
        currentPassword: "",
        newPassword: "",
    });

    function changeHandler(e) {
        setData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    function submitHandler(e) {
        e.preventDefault();
        dispatch(changePassword(data.currentPassword, data.newPassword, token))
        console.log("data of password change", data);
    }
    return (

        <div>
            <form onSubmit={submitHandler}>
                <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                    <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
                    <div className="flex flex-col gap-5 lg:flex-row">

                        <div className="relative flex flex-col gap-2 lg:w-[48%]">
                            <label className="text-richblack-5">
                                <p>Current Password</p>
                                <input
                                    required
                                    type={showCurrentPassword ? "text" : "password"}
                                    name="currentPassword"
                                    onChange={changeHandler}
                                    value={data.currentPassword}
                                    placeholder='Enter Current Password'
                                    className="form-style"
                                />
                                <span onClick={() => { setShowCurrentPassword(!showCurrentPassword) }} className="absolute  top-[38px] z-[10] cursor-pointer"
                                >
                                    {showCurrentPassword ? (
                                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                    ) : (
                                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                    )}
                                </span>
                            </label>
                        </div>

                        <div className="relative flex flex-col gap-5 lg:w-[48%]">
                            <label className = "text-richblack-5">
                                <p>New Password</p>
                                <input
                                    required
                                    type={showNewPassword ? "text" : "password"}
                                    onChange={changeHandler}
                                    name="newPassword"
                                    value={data.newPassword}
                                    placeholder='Enter New Password'
                                    className="form-style"
                                />

                                <span onClick={() => { setShowNewPassword(!showNewPassword) }} className="absolute   top-[38px] z-[10] cursor-pointer"
                                >
                                    {showNewPassword ? (
                                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                    ) : (
                                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                    )}
                                </span>
                            </label>
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
                    <IconBtn type="submit" text="Update" />
                </div>

            </form>
        </div>

    )
}

export default ChangePassword
