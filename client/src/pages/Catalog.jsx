import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { apiConnector } from '../services/apiconnector';
import { useParams } from 'react-router-dom'
import { getCatalogPageData } from '../services/operation/catalogAPI'
import Course_Card from '../components/core/Catalog/Course_Card';
import Course_Slider from '../components/core/Catalog/Course_Slider';


import { categories } from '../services/api'

const Catalog = () => {

    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const { catalogName } = useParams();
    const [active, setActive] = useState(1)

    useEffect(() => {
        const fetchAllCategory = async () => {
            let result;
            try {

                result = await apiConnector("GET", categories.CATEGORIES_API);
                console.log("result", result?.data?.data);
                const categoryId = result?.data?.data.filter((category) => category?.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
                setCategoryId(categoryId);
            }
            catch (error) {
                console.log("Error while fetching all the category");
            }
        }
        fetchAllCategory();
    }, [catalogName])

    useEffect(() => {
        const fetchCatalogPageDetails = async () => {
            try {
                if (categoryId) {
                    const result = await getCatalogPageData(categoryId);
                    console.log("result", result);
                    setCatalogPageData(result);
                }
            }
            catch (error) {
                console.log("Error ", error)
            }
        }

        fetchCatalogPageDetails();
    }, [categoryId]);

    return (
        <div>

            {/* Hero Section */}
            <div className=" box-content bg-richblack-800 px-4">
                <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
                    <p className="text-sm text-richblack-300">Home/Catalog <span className="text-yellow-25">{catalogPageData?.selectedCategory?.name}</span></p>
                    <div>
                        <h1 className="text-richblack-5 text-3xl font-semibold">{catalogPageData?.selectedCategory?.name}</h1>
                    </div>
                    <div>
                        <p className="max-w-[870px] text-richblack-200">{catalogPageData?.selectedCategory?.description}</p>
                    </div>
                </div>

            </div>

            {/* Section 1 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="text-2xl text-richblack-5 font-bold lg:text-4xl">Courses to get you started</div>
                <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                    <p
                        className={`px-4 py-2 cursor-pointer ${active === 1 ? "text-yellow-25 border-b border-b-yellow-25" : "text-richblack-50"}`}
                        onClick={() => setActive(1)}>Most Populat</p>
                    <p
                        className={`px-4 py-2 cursor-pointer ${active === 2 ? "text-yellow-25 border-b border-b-yellow-25" : "text-richblack-50"}`}
                        onClick={() => setActive(2)}
                    > new</p>
                </div>
                <Course_Slider
                    Courses={catalogPageData?.selectedCategory
                        ?.courses}
                />
            </div>


            {/* section 2 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="text-2xl text-richblack-5 font-bold lg:text-4xl">
                    Top Courses in {catalogPageData?.differentCategory?.name}
                </div>
                <div className="py-8">
                    <Course_Slider
                        Courses={catalogPageData?.differentCategory?.courses}
                    />
                </div>
            </div>



            {/* section 3 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="text-richblack-5 font-bold text-2xl lg:text-4xl">Frequently Bought</div>
                <div className="py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {
                            catalogPageData?.mostSellingCourses?.slice(0, 4).map((course, index) => (
                                <Course_Card course={course} Height={"h-[400px]"} key={index} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>



    )

}

export default Catalog