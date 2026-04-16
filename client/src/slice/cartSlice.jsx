import {createSlice} from "@reduxjs/toolkit";
import {toast} from 'react-hot-toast'

const initialState = {
    cart : localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [] ,
    totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0 ,
    total : localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0 ,
}

const cartSlice = createSlice({
    name : "cart",
    initialState : initialState ,
    reducers : {
        // add to cart
        addToCart : (state , action) => {
            const course = action.payload ;
            const index = state.cart.findIndex((item) => item._id === course._id) 

            if(index >= 0){
                // course is already present in the cart
                toast.error("Course already in cart")
                return
            }

            // if the course is not present in the cart
            // add it to the cart
            state.cart.push(course);

            // increment the total items
            state.totalItems++ ;

            // update the total price
            state.total = state.total + course.price ;

            // update to the localstorage
            localStorage.setItem("cart" , JSON.stringify(state.cart));
            localStorage.setItem("totalItems" , JSON.stringify(state.totalItems));
            localStorage.setItem("total" , JSON.stringify(state.total));

            toast.success("Course added to cart")
        } ,

        // remove from the cart
        removeFromCart : (state , action) => {
            const courseId = action.payload ;
            const index = state.cart.findIndex((item) => item._id === courseId);

            if(index >= 0){
                
                state.totalItems-- ;
                state.total = state.total - state.cart[index].price ;
                state.cart.slice(index , 1);

                // update the local storage
                localStorage.setItem("cart" , JSON.stringify(state.cart));
                localStorage.setItem("totalItems" , JSON.stringify(state.totalItems));
                localStorage.setItem("total" , JSON.stringify(state.total));

                toast.success("Course removed from cart");
            }
        },

        // reset the cart
        resetCart : (state) => {
            state.cart = [] 
            state.total = 0 
            state.totalItems = 0 

            // update the local storage
            localStorage.removeItem("cart");
            localStorage.removeItem("totalItems");
            localStorage.removeItem("total");
        }
    }
})


export const {addToCart , removeFromCart , resetCart} = cartSlice.actions ;
export default cartSlice.reducer ;


 