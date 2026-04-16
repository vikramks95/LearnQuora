import toast from 'react-hot-toast';
import { settingsEndpoints } from '../api'
import { apiConnector } from '../apiconnector';
import {setUser} from '../../slice/profileSlice'
import {logout} from '../../services/operation/authAPI'
const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,
} = settingsEndpoints;

export function updateProfile(firstName, lastName, gender, dateOfBirth, contactNumber, about , token , navigate) {
    const toastId = toast.loading("Loading...")
    return async (dispatch) => {
        try {
            const response = await apiConnector("PUT" , UPDATE_PROFILE_API , {firstName, lastName, gender, dateOfBirth, contactNumber, about , navigate} , {Authorization: `Bearer ${token}`,})

            console.log("UPDATE PROFILE API RESPONSE" , response);

             if (!response.data.success) {
                throw new Error(response.data.message);
            }
      
            localStorage.removeItem("user")
            localStorage.setItem("user", JSON.stringify(response?.data?.updatedUserDetails));

            dispatch(
               setUser(response.data.updatedUserDetails)
            )
            console.log("EDIT PROFILE RESPONSE", response);

            toast.success("Edit profile successfully");

            navigate("/dashboard/my-profile")
            

        }
        catch (error) {
            console.log("Error while updating the profile", error);
            toast.error(
                error?.response?.data?.message || error.message || "unable to login"
            )
        }
        toast.dismiss(toastId);
    }
}

export function changePassword(currentPassword, newPassword, token) {
    const toastId = toast.loading("Loading...")
    return async (dispatch) => {
        try {
            const response = await apiConnector("PUT", CHANGE_PASSWORD_API, { currentPassword, newPassword }, {
                Authorization: `Bearer ${token}`,
            })



            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            console.log("CHANGE PASSWORD RESPONSE", response);

            toast.success("Password change successfully");


        }
        catch (error) {
            console.log("Error while login", error);
            toast.error(
                error?.response?.data?.message || error.message || "unable to login"
            )
        }
        toast.dismiss(toastId);
    }
}


export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Deleted Successfully")
      dispatch(logout(navigate))
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Delete Profile")
    }
    toast.dismiss(toastId)
  }
}

