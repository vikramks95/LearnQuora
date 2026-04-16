import React from 'react'
import { FaArrowRight } from "react-icons/fa"
import { Link } from 'react-router-dom'
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from '../components/core/HomePage/Button'
import video from '../assets/images/banner2.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
//import ExploreMore from '../components/core/HomePage/ExploreMore'
import TimeLineSection from '../components/core/HomePage/TimeLineSection'
import LearningLanguage from '../components/core/HomePage/LearningLanguage'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import Footer from '../components/common/Footer'

const Home = () => {
    return (
        <div>
            {/* section 1 */}

            <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">

                <Link to={"/signup"}>

                    <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
                        <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>

                    </div>

                </Link>

                <div className="text-center text-4xl font-semibold mt-7">
                    Empower Your Future 
                    <HighlightText text={"Coding Skills"} />
                </div>

                <div className="w-[90%] text-center text-lg font-bold text-richblack-300 mt-4">
                    With our online coding courses , you can learn at your own pace , from anywhere in the world , and get access to a wealth of resources , including hands-on projects , quizzes , and personalized leedback from the instructor.
                </div>

                <div className="flex flex-row gap-7 mt-8">
                    <CTAButton active={true} linkto={"/signup"} >
                        Learn More
                    </CTAButton>

                    <CTAButton active={false} linkto={"/login"}>
                        Book a demo
                    </CTAButton>
                </div>

                {/* video */}
                <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200 ">
                    <video
                        className="shadow-[20px_20px_rgba(255,255,255)]"
                        muted
                        loop
                        autoPlay
                    >
                        <source src={video} type="video/mp4" />
                    </video>
                </div>


                {/* Code Section 1 */}

                <div>
                    <CodeBlocks
                        position={"lg:flex-row"}
                        heading={
                            <div className='text-4xl font-semibold'>
                                unlock Your
                                <HighlightText text={"coding potential"} />
                                with out online courses
                            </div>
                        }
                        subheading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }

                        ctabtn1={
                            {
                                btnText: "try it yourself",
                                linkto: '/signup',
                                active: true
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "learn more",
                                linkto: '/signup',
                                active: false
                            }
                        }

                        codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                        backgroundGradient={<div className="codeblock1 absolute"></div>}
                        codeColor={"text-yellow-25"}

                    />

                    <CodeBlocks
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className='text-4xl font-semibold'>
                                Start
                                <HighlightText text={"coding in seconds"} />
                                
                            </div>
                        }
                        subheading={
                            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }

                        ctabtn1={
                            {
                                btnText: "Continue Lesson",
                                linkto: '/signup',
                                active: true
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "learn more",
                                linkto: '/signup',
                                active: false
                            }
                        }

                        codeblock={`<!DOCTYPE html> \n <html lang="en"> \n <head> \n <meta charset="UTF-8">\n <meta name="viewport"> \n <title>Document</title> \n </head> \n <body> \n <p>This is study-notion app</p> \n </body> \n </html> `}
                        backgroundGradient={<div className="codeblock2 absolute"></div>}
                        codeColor={"text-white"}

                    />



                </div>

                {/* Explore Section */}
                  {/* <ExploreMore/> */}

            </div>

            


            {/* section 2 */}

            <div className="bg-pure-greys-5 text-richblack-700">


                {/* button */}

                <div className='homepage_bg h-[320px]'>

                    <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
                        <div className="lg:h-[150px]"></div>
                        <div className="flex flex-row gap-7 text-white lg:mt-8">
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className='flex items-center gap-3'>
                                    Explore Full Catlog
                                    <FaArrowRight />
                                </div>
                            </CTAButton>

                            <CTAButton active={false} linkto={"/signup"}>
                                Learn More
                            </CTAButton>
                        </div>
                    </div>

                </div>


                <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7  mt-[50px]'>

                    <div className='mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0'>
                        <div className="text-4xl font-semibold w-[45%]">
                            Get the Skills you need for a
                            <HighlightText text={"Job that is in demand"} />
                        </div>

                        <div className="flex flex-col gap-10 lg:w-[40%] items-start">
                            <div className="text-[16px]">
                                The modern StudyNotion is the dictates its own terms . Today , to be a competitve specialist requires more than professional skills.
                            </div>

                            <CTAButton active={true} linkto={"signup"}>
                                Learn more
                            </CTAButton>
                        </div>


                    </div>
                     
                        
                     <TimeLineSection />

                     <LearningLanguage />

                </div>



            </div>






            {/* section 3 */}


            <div  className="relative my-20 flex w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8
            first-letter bg-richblack-900 text-white">
                    
                    <InstructorSection />
                    <p className = "text-center text-4xl font-semibold mt-10 text-white">Review from Other Learners</p>

                    {/* Review Slider here */}

            </div>


            
            {/* Footer */}

           <Footer />
        </div>
    )
}

export default Home
