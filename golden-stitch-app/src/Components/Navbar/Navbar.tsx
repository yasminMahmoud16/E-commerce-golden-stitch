import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '@/assets/Images/logo.png';
import { Icons } from '@/assets/Icons/icons';
import BtnCommon from '@/common/BtnCommon';
import { CardEnum, logoutEnum, } from '@/Utilities/types';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import PopupCommon from '@/common/PopupCommon';
import useGlobal from '@/Hooks/useGlobal';
import { useAuthContext, useProfileContext } from '@/Hooks/useAppContexts';
import ToggleCart from '../Toggle/ToggleCart';
import ToggleWishList from '../Toggle/ToggleWishList';

export default function Navbar() {
  const { openPopup, setOpenPopup, navigate, location } = useGlobal();
  const { profile } = useProfileContext();
  const { token, logout } = useAuthContext();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const isLanding = location.pathname === "/";

  const toggleNavbar = () => setIsNavOpen(!isNavOpen);

  const handleToggle = (e: React.MouseEvent<SVGElement>) => {
    if (e.currentTarget.id === CardEnum.cart) {
      setOpenCart(true)
    }
    else if (e.currentTarget.id === CardEnum.wishList) { setOpenWishlist(true); }
  };

  const handleLogoutClick = async (flag: logoutEnum) => {
    await logout({ flag })
    navigate("/login")
  };


  const handleClickProfile = () => {
    if (profile?.role === 'admin' || profile?.role === 'super-admin') {
      navigate('/admin/profile');
    } else {
      navigate('/profile');
    }
  }


  const handleScrollToSection = (id: string) => {
  const section = document.querySelector(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};


  return (
    <>
      <nav
        className={`${isLanding
            ? `p-3 relative before:content-[''] before:absolute before:-top-4 before:left-0 before:w-full before:h-[2px] before:bg-gold
            after:content-[''] after:absolute after:-top-2 after:left-0 after:w-full after:h-[2px] after:bg-gold`
            : ` bg-radial from-dark-blue-1 to-dark-blue-nav border-gray-200 shadow md:flex md:items-center md:justify-around`
          }  bg-radial from-dark-blue-1 to-dark-blue-nav border-gray-200 shadow md:flex md:items-center md:justify-around`}
      >
        {/* Logo + Toggle */}
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between p-4 ">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            {!isLanding && <img src={logo} className="h-10 w-10" alt="Logo" />}
          </div>
          <button
            onClick={toggleNavbar}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none"
            aria-controls="navbar-default"
            aria-expanded={isNavOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Links */}
        <div
          className={`${isNavOpen ? "block" : "hidden"} w-full md:flex md:flex-row items-center justify-center bg-transparent`}
        >
          <ul
            className="relative w-full border-none md:ml-30 font-medium flex flex-col p-4 md:p-0 mt-4 
            border border-gray-100 rounded-lg  
            md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent 
            md:justify-center md:items-center md:mx-auto"
          >
            <li>
              <NavLink
                to="/#hero"
                className={`relative 
        ${location.hash === "#hero" ? "text-gold-light after:w-full" : "text-gold after:w-0"} 
        after:content-[''] after:absolute after:left-0 after:-bottom-1 
        after:h-[2px] after:bg-amber-100 after:transition-all after:duration-300 
        hover:after:w-full
      `}
              >
                Home
              </NavLink>

            </li>

            <li className={`relative text-gold after:w-0"} 
        after:content-[''] after:absolute after:left-0 after:-bottom-1 
        after:h-[2px] after:bg-amber-100 after:transition-all after:duration-300 
        hover:after:w-full cursor-pointer
      `} onClick={() => handleScrollToSection("#about")}>
              {/* <NavLink
                to="/#about"
                className={`relative 
        ${location.hash === "#about" ? "text-gold-light after:w-full" : "text-gold after:w-0"} 
        after:content-[''] after:absolute after:left-0 after:-bottom-1 
        after:h-[2px] after:bg-amber-100 after:transition-all after:duration-300 
        hover:after:w-full
      `}
              > */}
                About Us
              {/* </NavLink> */}
            </li>

            <li>
              <NavLink
                to="/products"
                className={`relative 
        ${location.hash === "/products" ? "text-gold-light after:w-full" : "text-gold after:w-0"} 
        after:content-[''] after:absolute after:left-0 after:-bottom-1 
        after:h-[2px] after:bg-amber-100 after:transition-all after:duration-300 
        hover:after:w-full
      `}
              >
                Products
              </NavLink>
            </li>

            {/* <li> */}
              <li
                className={`relative text-gold after:w-0"} 
        after:content-[''] after:absolute after:left-0 after:-bottom-1 
        after:h-[2px] after:bg-amber-100 after:transition-all after:duration-300 
        hover:after:w-full cursor-pointer
      `}  onClick={() => handleScrollToSection("#contact")}
              >
                Contact Us
              </li>
            {/* </li> */}
          </ul>



          {/* Right Section */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center justify-center gap-4 p-2">
              <div id={CardEnum.cart} className='relative'>
                <Icons.FaShoppingBag
                  id={CardEnum.cart}
                  onClick={handleToggle}
                  size={22}
                  className="text-gold drop-shadow-[1px_1px_1px_rgba(0,0,0,0.6)] cursor-pointer  transition-all duration-300 ease-in-out hover:text-[hsl(22,55%,44%)] hover:-translate-y-1"
                />
               
              </div>

              <div id={CardEnum.wishList}>
                <Icons.FaHeart
                  id={CardEnum.wishList}
                  onClick={handleToggle}
                  size={22}
                  className="text-gold drop-shadow-[1px_1px_1px_rgba(0,0,0,0.6)] cursor-pointer  transition-all duration-300 ease-in-out hover:text-[hsl(22,55%,44%)] hover:-translate-y-1"
                />
              </div>

            </div>

            {/* Auth Section */}
            {token ? (
              <div className="w-30 flex items-center justify-center gap-3  bg-transparent mr-2">

                <p className='capitalize  text-gold cursor-pointer transition-all duration-300 ease-in-out hover:text-[hsl(22,55%,44%)] ' onClick={handleClickProfile}>
                  {profile?.firstName || 'user'}
                </p>

                <Icons.IoLogOut className='text-2xl text-gold cursor-pointer   transition-all duration-300 ease-in-out hover:text-[hsl(22,55%,44%)]'
                  onClick={() => { setOpenPopup(true) }}
                />


              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Link to="/register">
                  <BtnCommon
                    type="button"
                    text="SIGN UP / SIGN IN"
                    className="w-30 text-xs transition-all duration-700 ease-in-out hover:from-gold-dark hover:to-[55%]"
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Cart + Wishlist Toggles */}
      <ToggleCart
        openCart={openCart}
        setOpenCart={setOpenCart}
        title="Your Cart"
        type={CardEnum.cart}
      />

      <ToggleWishList
        openCart={openWishlist}
        setOpenCart={setOpenWishlist}
        title="Your Wishlist"
        type={CardEnum.wishList}
      />

      <PopupCommon
        open={openPopup}
        onOpenChange={setOpenPopup}
        title="Choose an Option"
        text="Select what you want to do:"
        options={[
          {
            label: "Logout from this device",
            onClick: () => handleLogoutClick(logoutEnum.only),
          },
          {
            label: "Logout from all devices",
            onClick: () => handleLogoutClick(logoutEnum.all),
          },
        ]}
        showCancel={true}
        showAction={false}
      />


    </>
  );
}
