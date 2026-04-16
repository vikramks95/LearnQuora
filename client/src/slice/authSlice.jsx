// import {createSlice} from "@reduxjs/toolkit";

// const initialState = {
//     signupData: null ,
//     token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null ,
//     loading : false 
// }

// const authSlice = createSlice({
//     name : "auth",
//     initialState : initialState ,
//     reducers : {
//         setSignupData(state , value){
//             state.signupData = value.payload
//         },
//         setToken(state , value){
//             state.token = value.payload ;
//         },
//         setLoading(state , value){
//             state.loading = value.payload ;
//         }
//     }
// })


// export const {setToken , setLoading , setSignupData} = authSlice.actions ;
// export default authSlice.reducer ;


// // import { createSlice } from "@reduxjs/toolkit";

// // const initialState = {
// //   token: localStorage.getItem("token") || null,
// // };

// // const authSlice = createSlice({
// //   name: "auth",
// //   initialState,
// //   reducers: {
// //     setToken(state, action) {
// //       state.token = action.payload;
// //     },
// //   },
// // });

// // export const { setToken } = authSlice.actions;
// // export default authSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData: null,
    token: localStorage.getItem("token") || null,
    loading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSignupData(state, action) {
            state.signupData = action.payload;
        },
        setToken(state, action) {
            state.token = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        }
    }
});

export const { setToken, setLoading, setSignupData } = authSlice.actions;
export default authSlice.reducer;
