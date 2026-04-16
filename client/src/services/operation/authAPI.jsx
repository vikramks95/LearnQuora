import { useDispatch } from "react-redux";
import { endpoints } from '../api'
import { apiConnector } from "../apiconnector";
import { setToken, setLoading, setSignupData } from '../../slice/authSlice'
import { toast } from 'react-hot-toast'
import { useSelector } from "react-redux";
import {setUser} from '../../slice/profileSlice'


const { SIGNUP_API, SENDOTP_API, LOGIN_API, RESETPASSTOKEN_API, RESETPASSWORD_API } = endpoints;


// send otp
export function sendOtp (email , navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST" , SENDOTP_API , {email});

            if(!response.data.success){
               
                throw new Error(response.data.message);
                
            }

            console.log("SEND OTP RESPONSE" , response);

            toast.success("Otp send successfully");

            navigate('/verify-otp')

        }
        catch(error){
            console.log("Error while sending otp" , error);
            toast.error(
                error?.response?.data?.message || error.message || "Unable to send the OTP"
            );
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

//signup
export function signup(firstName , lastName , email , password , confirmPassword , otp , accountType, navigate ){
        return async (dispatch) => {
             dispatch(setLoading(true));
             const toastId = toast.loading("Loading...");
             try{
                const response = await apiConnector("POST" , SIGNUP_API , {firstName , lastName , email , password , confirmPassword , otp , accountType})

                console.log("SIGN UP RESPONSE",response);

                if(!response.data.success){
                    throw new Error(response.data.message);
                }

                toast.success("Sign up successfully");
                navigate('/login');
                
             }
             catch(error){
                 console.log("Error while signup", error);
                 toast.error("Sign up failed");
             }
             dispatch(setLoading(false));
             toast.dismiss(toastId);
        }
}

//login
export function login(email , password , navigate){
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId =  toast.loading("Loading...");
        try{
            const response = await apiConnector("POST" , LOGIN_API , {email , password});

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            console.log("LOGIN RESPONSE = " , response );

            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user", JSON.stringify(response.data.user));

            dispatch(setToken(response.data.token));
            dispatch(setUser(response.data.user));
            console.log(response.data.user);
            toast.success("Login successfully");
            navigate('/');
            dispatch(setLoading(false));
        }
        catch(error){
            console.log("Error while login" , error);
            toast.error(
                error?.response?.data?.message || error.message || "unable to login"
            )
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
        
    }
}


// logout
export function logout(navigate){
    return async (dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast.success("Logout successfully");
        navigate('/');
    }
}


// Reset Password token

export function getPasswordResetToken(email, setEmailSent) {

    return async (dispatch) => {
        dispatch(setLoading(true))
        try {

            const response = await apiConnector("POST", RESETPASSTOKEN_API, { email })

            console.log("Reset Password token", response);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Reset Email Successfully");

            setEmailSent(true);
        }
        catch (error) {
            console.log("RESET PASSWORD TOKEN Error", error);
            toast.error("Failed to send email for resetting password");
        }
        dispatch(setLoading(false));
    }
}


export const resetPassword = (password, confirmPassword, token) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", RESETPASSWORD_API, { password, confirmPassword, token })
            console.log("RESET PASSWORD RESPONSE ...", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Password has been reset successfully");

        }
        catch (error) {
            console.log(
                "Error while updating the password:",
                error?.response?.data?.message || error.message
            );
            toast.error(error?.response?.data?.message || "Unable to reset password");
        }
        dispatch(setLoading(false));
    }
}