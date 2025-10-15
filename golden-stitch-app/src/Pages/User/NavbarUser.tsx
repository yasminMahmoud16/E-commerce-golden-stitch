import {  useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Icons } from '@/assets/Icons/icons';
import BtnCommon from '@/common/BtnCommon';
import { CardEnum } from '@/Utilities/types';
import ToggleCart from '@/Components/Toggle/ToggleCart';
import ToggleWishList from '@/Components/Toggle/ToggleWishList';
import { useAuthContext, useProfileContext } from '@/Hooks/useAppContexts';


export default function NavbarUser() {
  const { token } = useAuthContext();
  const { profile } = useProfileContext();


  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };
const [openCart, setOpenCart] =useState(false)
const [openWishlist, setOpenWishlist] =useState(false)

const handleToggle = (e:React.MouseEvent) => {
  console.log("toggle");

  if (e.currentTarget.id === CardEnum.cart) {
    setOpenCart(true);
  } else if (e.currentTarget.id === CardEnum.wishList) {
    setOpenWishlist(true);
  }
};


const linkClasses = ({ isActive }: { isActive: boolean }) =>
  `relative block py-2 px-3 rounded md:bg-transparent md:p-0 transition-colors duration-200 
   ${isActive
     ? "text-gold after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-full after:h-[2px] after:bg-gold"
     : "text-[#DBC9A1] hover:text-gold-dark"
   }`;



  return (
    <>
      <nav
        className={`${isLanding?` relative before:content-[''] before:absolute before:-top-4 before:left-0 before:w-full before:h-[2px] before:bg-gold
             after:content-[''] after:absolute after:-top-2 after:left-0 after:w-full after:h-[2px] after:bg-gold`:` border-gray-200 shadow md:flex md:items-center md:justify-around` }  bg-dark-blue-nav border-gray-200 shadow md:flex md:items-center md:justify-around
       `}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between p-4 ">
           
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

<div
   className={`${isNavOpen ? "block" : "hidden"} w-full md:flex md:flex-row items-center justify-center bg-transparent`}
>
  <ul
    className=" w-full  border-none  md:ml-30  font-medium flex flex-col p-4 md:p-0 mt-4 
              border border-gray-100 rounded-lg  
              md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent 
              md:justify-center md:items-center md:mx-auto"
  >
    <li className='mb-2 md:mb-0'>
      <NavLink to="/" className={linkClasses}>Home</NavLink>
    </li>
    <li className='mb-2 md:mb-0'>
      <NavLink to="categories" className={linkClasses}>Products</NavLink>
    </li>

          </ul>
          

          <div className='flex items-center justify-center gap-4 '>

            <div className='flex items-center justify-center gap-4 p-2 '>
             <div id={CardEnum.cart}>
  <Icons.FaShoppingBag
    id={CardEnum.cart}
    onClick={handleToggle}
    size={22}
    className="text-gold drop-shadow-[1px_1px_1px_rgba(0,0,0,0.6)] cursor-pointer"
  />
</div>

<div id={CardEnum.wishList}>
  <Icons.FaHeart
    id={CardEnum.wishList}
    onClick={handleToggle}
    size={22}
    className="text-gold drop-shadow-[1px_1px_1px_rgba(0,0,0,0.6)] cursor-pointer"
  />
</div>

            </div>




            {
              token ? <>
                <div className='flex items-center justify-center'>
                  <div className='w-40'>
                    <p>{ profile?.userName}</p>
                    
                  </div>
           
            </div>
              </> :
                <>
                <div className='flex items-center justify-center'>
                  <Link to={"/register"}>
                    <BtnCommon
                      type="button"
                      text={"SIGN UP / SIGN IN"}
                      className=" w-30 text-xs transition-all duration-700 ease-in-out 
                          hover:from-gold-dark hover:to-[55%] "/>
                    </Link>
                </div>
                </>
              }
          </div>
</div>

    


      </nav>
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

    </>
  );
}
