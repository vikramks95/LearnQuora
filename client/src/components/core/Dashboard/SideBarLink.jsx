import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { matchPath, useLocation } from 'react-router-dom'
import * as Icons from "react-icons/vsc"
import { NavLink } from 'react-router-dom'

const SideBarLink = ({ link, iconName }) => {
   

    const Icon = Icons[iconName]
    const { loading: profileLoading } = useSelector((state) => state.profile)
    const { loading: authLoading } = useSelector((state) => state.auth)
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({ path: route, end: true }, location.pathname)
    }
    return (
        <div>
            <NavLink
                to={link.path}
                className={`relative px-8 py-4 text-sm font-medium block w-full h-full
                     ${matchRoute(link.path)
                    ? "bg-yellow-800 text-yellow-50"
                    : "bg-opacity-0 text-richblack-300"
                    } transition-all duration-200`}
            >

                <span
                    className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${matchRoute(link.path) ? "opacity-100" : "opacity-0"
                        }`} >
                </span>

                        
                <div className="flex flex-row items-center gap-x-2">
                    <Icon className="text-lg" />
                    <p>{link.name}</p>
                </div>

                

            </NavLink>
        </div>
    )
}

export default SideBarLink
