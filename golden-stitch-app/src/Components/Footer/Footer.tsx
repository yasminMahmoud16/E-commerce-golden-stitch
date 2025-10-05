

import { HashLink } from 'react-router-hash-link';

import cornerBottomRight from "@/assets/Images/cornerBottomRight.png"
import cornerBottomLeft from "@/assets/Images/cornerBottomLeft.png"
import { Icons } from '@/assets/Icons/icons'
import { Input } from '../ui/input'
import { Link } from 'react-router-dom'
export default function Footer() {
    const appName = import.meta.env.VITE_APPLICATION_NAME;

    return <>
        <footer id='contact' className=' md:h-[200px] flex items-center justify-center bg-radial from-dark-blue-1 via-dark-blue-2 to-dark-blue-nav  relative'>

            <img
                src={cornerBottomRight}
                alt="cornerBottomRight"
                className="absolute right-0 bottom-0 pointer-events-none"
            />

            {/* Corner Left */}
            <img
                src={cornerBottomLeft}
                alt="cornerBottomLeft"
                className="absolute left-0 bottom-0 pointer-events-none"
            />

            <div className="container relative z-10">
                <div className="grid p-4 grid-cols-1 md:grid-cols-6 gap-4 ">
                    <div className="col-span-2  flex flex-col items-center justify-center">
                        <h3 className='font-semibold text-xl capitalize text-footer-items '>social app</h3>
                        <div className='flex items-center justify-center gap-2 mt-2'>

                            <span className='w-8 h-8 rounded-full flex items-center justify-center  '><Icons.FaFacebook size={20} className='text-footer-items transition-all duration-500 ease-in-out hover:text-blue-600' /></span>
                            <span className='w-8 h-8 rounded-full flex items-center justify-center  '><Icons.FaXTwitter size={20} className='text-footer-items transition-all duration-500 ease-in-out hover:text-black' /></span>
                            <span className='w-8 h-8 rounded-full flex items-center justify-center  '><Icons.FaInstagram size={20} className='text-footer-items transition-all duration-500 ease-in-out hover:text-pink-700' /></span>
                        </div>
                    </div>
                    <div className="col-span-2 flex  flex-col items-center justify-center gap-4">
                        <p className='text-footer-items'>{`${appName}`}@gmail.com</p>



                        <div className="relative w-55 md:w-80">
                            <Icons.CiSearch
                                className="absolute left-3 top-4 -translate-y-1/2 text-footer-items"
                                size={23}
                            />
                            <Input
                                type="text"
                                placeholder="search"
                                className="w-60 md:w-80 border-footer-items  py-3 px-2 pl-10 mb-2 placeholder:text-footer-items rounded-4xl"
                            />
                        </div>


                    </div>
                    <div className="col-span-2 flex flex-col items-center justify-center">
                        <ul className='capitalize text-[#c4b5a0f3] cursor-pointer '>
                            <li className='mb-2 font-semibold text-footer-items '>pages</li>
                            <li className='transition-all duration-500 ease-in-out hover:text-gold-dark'>
                                <Link to="/">Home</Link>
                            </li>
                            <li className='transition-all duration-500 ease-in-out hover:text-gold-dark'>
                                <Link to="/products">Products</Link>
                            </li>
                            <li className='transition-all duration-500 ease-in-out hover:text-gold-dark'>
                                <HashLink  to="#about">About Us</HashLink>
                            </li>
                            <li className='transition-all duration-500 ease-in-out hover:text-gold-dark'>
                                <HashLink  to="#contact">Contact Us</HashLink>
                            </li>
                        </ul>
                    </div>
                </div>
                                        <p className='text-center text-footer-items text-sm pb-4'>copyright@ {`${appName}`}</p>
















            </div>

        </footer>
    </>
}
