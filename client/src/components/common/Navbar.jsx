import React, { useEffect, useState } from 'react'
import logo from '../../assets/images/Logo-Full-Light4.png'
import { Link, NavLink, matchPath } from 'react-router-dom'
import { NavbarLinks } from '../../assets/data/navbar-link'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from "react-icons/ai"
import { IoIosArrowDropdownCircle } from "react-icons/io"
import { FiMenu, FiX } from "react-icons/fi"
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/api'

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API)
      setSubLinks(result.data.data);
      console.log("token = " , token);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchSublinks();
  }, [])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  }

  return (
    <div className="flex h-14 items-center justify-center border-b border-[#2C333F] bg-[#161D29]">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">

        {/* Logo */}
        <NavLink to="/">
          <img src={logo} width={160} height={42} loading='lazy' />
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className='flex gap-x-6 text-[#DBDDEA]'>
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="relative flex items-center gap-2 group cursor-pointer">
                    <p>{link.title}</p>
                    <IoIosArrowDropdownCircle />
                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] -translate-x-1/2 translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-richblack-5"></div>
                      {Array.isArray(subLinks) && subLinks.length > 0 ? (
                        subLinks.map((subLink, idx) => (
                          <Link
                            to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                            key={idx}
                          >
                            <p>{subLink.name}</p>
                          </Link>
                        ))
                      ) : (
                        <div className="text-xs text-gray-400">No categories available</div>
                      )}
                    </div>
                  </div>
                ) : (
                  <NavLink to={link?.path}>
                    <p className={`${matchRoute(link?.path) ? "text-[#FFE83D]" : "text-[#DBDDEA]"}`}>
                      {link.title}
                    </p>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right side */}
        <div className="hidden md:flex gap-x-4 items-center text-white">
          {/* Cart */}
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-richblack-600 text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {/* Auth Buttons */}
          {!token ? (
            <>
              <Link to="/login">
                <button className="border border-[#2C333F] bg-[#161D29] px-3 py-2 text-[#AFB2BF] rounded-md">Log in</button>
              </Link>
              <Link to="/signup">
                <button className="border border-[#2C333F] bg-[#161D29] px-3 py-2 text-[#AFB2BF] rounded-md">Sign up</button>
              </Link>
            </>
          ) : (
            <ProfileDropDown />
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FiX size={28} className="text-white" /> : <FiMenu size={28} className="text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-[#161D29] z-[2000] md:hidden">
          <ul className="flex flex-col gap-4 p-4 text-white">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <details className="cursor-pointer">
                    <summary className="flex items-center gap-2">
                      {link.title} <IoIosArrowDropdownCircle />
                    </summary>
                    <div className="ml-4 mt-2 flex flex-col gap-2">
                      {Array.isArray(subLinks) && subLinks.length > 0 ? (
                        subLinks.map((subLink, idx) => (
                          <Link
                            to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                            key={idx}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subLink.name}
                          </Link>
                        ))
                      ) : (
                        <p className="text-xs text-gray-400">No categories</p>
                      )}
                    </div>
                  </details>
                ) : (
                  <NavLink to={link?.path} onClick={() => setIsMenuOpen(false)}>
                    <p className={`${matchRoute(link?.path) ? "text-[#FFE83D]" : "text-white"}`}>
                      {link.title}
                    </p>
                  </NavLink>
                )}
              </li>
            ))}

            {/* Mobile auth buttons */}
            <div className="flex flex-col gap-2">
              {user && user?.accountType !== "Instructor" && (
                <Link to="/dashboard/cart" className="relative">
                  <AiOutlineShoppingCart className="text-2xl" />
                  {totalItems > 0 && (
                    <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-richblack-600 text-xs font-bold text-yellow-100">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}
              {!token ? (
                <>
                  <Link to="/login"><button className="w-full border p-2 rounded-md">Log in</button></Link>
                  <Link to="/signup"><button className="w-full border p-2 rounded-md">Sign up</button></Link>
                </>
              ) : (
                <ProfileDropDown />
              )}
            </div>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Navbar


