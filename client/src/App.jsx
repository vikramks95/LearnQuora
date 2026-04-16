import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ForgetPassword from './pages/ForgetPassword'
import UpdatedPassword from './pages/UpdatedPassword'
import VerifyEmail from './components/core/Auth/VerifyEmail';
import Contact from './pages/Contact'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/core/Auth/PrivateRoute'
import MyProfile from './components/core/Dashboard/MyProfile'
import Index from './components/core/Dashboard/Settings/Index'
import { useSelector } from 'react-redux'
import AddCourses from './components/core/Dashboard/AddCourses'
import MyCourses from './components/core/Dashboard/MyCourses'
import Catalog from './pages/Catalog'
import CourseDetails from './pages/CourseDetails'



function App() {

   const { user } = useSelector((state) => state.profile)

   return (
      <div className="w-screen min-h-screen bg-[#000814] flex flex-col font-inte ">
         <Navbar />

         <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/signup' element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forget-password" element={<ForgetPassword />}></Route>
            <Route path="/update-password/:id" element={<UpdatedPassword />} />
            <Route path="/verify-otp" element={<VerifyEmail />} />
            <Route path="/about" element={<About />} />
            <Route path = "/catalog/:catalogName" element = {<Catalog />}></Route>
            <Route path="courses/:courseId" element={<CourseDetails/>} />
            <Route path='/contact' element={<Contact/>}/>

            <Route
               element={
                  <PrivateRoute>
                     <Dashboard />
                  </PrivateRoute>

               }
            >
               <Route path="/dashboard/my-profile" element={<MyProfile />}></Route>
               <Route path="/dashboard/settings" element={<Index />}></Route>


               {
                  user?.accountType === "Instructor" && (
                     <>
                        <Route path="/dashboard/add-course" element={<AddCourses />} />
                        <Route path="/dashboard/my-courses" element={<MyCourses />} />
                     </>

                  )

               }
            </Route>
         </Routes>
      </div>
   )
}

export default App


