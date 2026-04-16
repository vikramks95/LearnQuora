import React, { useState , useEffect} from 'react'
import { MdClose } from "react-icons/md"
import { useSelector } from 'react-redux';

const ChipInput = ({ name, label, placeholder, register, setValue, getValues, errors }) => {

    const {course , editCourse} = useSelector((state) => state.course)

    const [chips, setChips] = useState([]);

    const chipDeleteHandler = (chipIndex) => {
    
        const newChip = chips.filter((_, index) => index !== chipIndex);
        setChips(newChip);
    }

    useEffect(() => {
        if (editCourse) {
            // console.log(course)
            setChips(course?.tag)
        }
        register(name, { required: true, validate: (value) => value.length > 0 })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setValue(name, chips)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chips])

    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === ",") {

            event.preventDefault();

            const chipValue = event.target.value.trim();

            if (chipValue && !chips.includes(chipValue)) {
                const newChip = [...chips, chipValue];
                setChips(newChip);
                event.target.value = ""
            }
        }
    }
    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor={name} className="text-sm text-richblack-5">{label} <sup>*</sup></label>

            {/* render the chips */}
            <div className="flex w-full flex-wrap gap-y-2">
                {
                    chips.length > 0 && (
                        chips.map((chip, index) => (
                            <div
                                key={index}
                                className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
                            >
                                {chip}
                                <button
                                    type="button"
                                    onClick={() => chipDeleteHandler(index)}
                                    className="ml-2 focus:outline-none"
                                >
                                    <MdClose className="text-sm" />
                                </button>
                            </div>
                        ))
                    )
                }
            </div>

            <input
                id={name}
                name={name}
                placeholder={placeholder}
                type="text"
                onKeyDown={handleKeyDown}

                className=" rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none"

            />

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

export default ChipInput
