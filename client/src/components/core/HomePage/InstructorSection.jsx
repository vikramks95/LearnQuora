import React from 'react'
import Instructor from '../../../assets/images/img17.jpeg'
import HighlightText from './HighlightText'
import CTAButton from '../HomePage/Button'
import {FaArrowRight} from 'react-icons/fa'
const InstructorSection = () => {
  return (
    <div className="mt-16">
      <div className="flex flex-row gap-20 items-center">

        <div className="w-[50%]">
          <img src={Instructor} alt=""
            className="shadow-white shadow-[-20px_-20px_0_0]" />
        </div>

        <div className="lg:w-[50%] flex flex-col gap-10">
          <div className="lg:w-[50%] text-4xl font-semibold">
             Become an
            <HighlightText text={"Instrucor"} />
          </div>

          <div className="font-medium text-[16px] text-justify w-[90%] text-richblack-300">
            Instructor from around world teach millions of students on Learn Quora. We provide the tools and skills to teach what you love
          </div>

          <div className = "w-fit">
            <CTAButton active = {true} linkto={"/signup"}>
              <div className = "flex gap-3 items-center">
                  Start Learning Today 
                  <FaArrowRight />
              </div>
          </CTAButton>
          </div>
        </div>

      </div>
    </div>
  )
}

export default InstructorSection
