import React from 'react'

const IconBtn = ({
     text ,
     onclick ,
     children ,
     disabled ,
     outline = false ,
     customClasses ,
     type
    }) => {
  return (
    <button
        disabled = {disabled} 
        onClick = {onclick}
        type = {type}

         className={`flex items-center ${
          outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
        } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
    >
        {
            children ? 
            (
              <>
                <span className={` flex items-center gap-x-2 ${outline && "text-yellow-50"}`}>
                {text}
                {children}
                </span>
              </>
            ) :
            (
                text
            )
        }
    </button>
  )
}

export default IconBtn
