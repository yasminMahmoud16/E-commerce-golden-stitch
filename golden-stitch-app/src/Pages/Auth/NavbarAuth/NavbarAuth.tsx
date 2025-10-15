import { useState } from 'react';
import {Link, useLocation } from 'react-router-dom';
import logo from "@/assets/Images/logo.png"
export default function NavbarAuth() {


  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const isRegisterPage = location.pathname === "/register";
  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };


  return (
    <>
      <nav className="bg-dark-blue-nav border-gray-200 dark:bg-gray-900 shadow md:flex md:items-center md:justify-around">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between p-4">
          <Link to={"/"}>
          <div className=' flex justify-center items-center gap-2'>
            <div>
              <img src={logo} alt=""  className='w-10'/>
                </div>
              <p className='bg-gradient-to-r from-gold-dark to-gold-light bg-clip-text text-transparent uppercase font-bold text-xl'>golden stitch</p>

          </div>
          </Link>

          <button
            onClick={toggleNavbar}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isNavOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        <div className='hidden md:block '>
                       {isRegisterPage ? (
        <Link to={"/login"} className='flex items-center justify-center'>
          <p className='text-gray-300 text-sm capitalize'>have account?</p>
          <span className="bg-gradient-to-r from-gold-dark to-gold-light bg-clip-text text-transparent ml-2 hover:cursor-pointer transition-all duration-300 ease-in-out hover:underline decoration-gold-dark text-xs">
            sign in now
          </span>
        </Link>
      ) : (
        <Link to={"/register"} className='flex items-center justify-center'>
          <p className='text-gray-300 text-sm capitalize'>don't have account?</p>
          <span className="bg-gradient-to-r from-gold-dark to-gold-light bg-clip-text text-transparent ml-2 hover:cursor-pointer transition-all duration-300 ease-in-out hover:underline decoration-gold-dark text-xs">
            sign up now
          </span>
        </Link>
      )}
        </div>
      </nav>
    </>
  );
}
