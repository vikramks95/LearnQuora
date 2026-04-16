
import {catalogData} from '../api'
import { apiConnector } from '../apiconnector';
import {toast} from "react-hot-toast"



export const getCatalogPageData = async (categoryId) => {
    let result = null;
    
    try {
        console.log("Category Id in service  " , categoryId);
        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API , {categoryId})

        console.log("CATALOG PAGE DETAILS............", response)

        if (!response?.data?.success) {
            throw new Error("ERROR WHILE FETCHING THE CATALOG PAGE DETAILS")
        }

        result = response?.data?.data ;   
    }
    catch (error) {
        console.log("Error while fetching the cataegry page details", error);
        toast.error( error?.response?.data?.message ||error.message);
    }
    
    return result ;
    
}