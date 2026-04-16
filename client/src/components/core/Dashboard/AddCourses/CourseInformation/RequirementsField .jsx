import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const RequirementsField = ({ name, placeholder, register, setValue, getValues, errors, label }) => {

    const {course , editCourse} = useSelector((state) => state.course);

    const [requirement, setRequirement] = useState("");
    const [requiremntList, setRequirementList] = useState([]);

     useEffect(() => {
    if (editCourse) {
        console.log("course" , course);
      setRequirementList(course?.instructions || [])
      
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setValue(name, requiremntList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requiremntList])


    const handleAddRequirement = () => {
        if(requirement){
            setRequirementList([...requiremntList , requirement])
            setRequirement("");
        }
    }

    const clearHandler = (index) => {
        const updatedRequirementList = [...requiremntList];
        updatedRequirementList.splice(index , 1);
        setRequirementList(updatedRequirementList);
    }


    return (
        <div className="flex flex-col space-y-2 ">
            <label className="text-sm text-richblack-5" htmlFor={name}>{label}</label>
            <div className = "flex flex-col space-y-2 items-start">
                <input
                    type="text"
                    name={name}
                    id={name}
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className = "rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none w-full"
                />

                <button
                    type="button"
                    onClick={handleAddRequirement}
                    className="font-semibold text-yellow-50"
                >
                    Add
                </button>
            </div>

            
                {
                    requiremntList?.length > 0 && (
                        <ul className="mt-2 list-inside list-disc">
                            {
                                
                                  requiremntList?.map((element , index) => (
                                    <li key = {index} className="flex items-center text-richblack-5">
                                        <span>{element}</span>
                                        <button
                                             type = "button"
                                             onClick={() =>  {clearHandler(index)}}
                                              className="ml-2 text-xs text-pure-greys-300 "
                                        >
                                            Clear
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
                {
                    errors[name] && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            {label} is required
                        </span>
                    )
                }
        </div>
    )
}

export default RequirementsField 
