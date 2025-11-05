


import cornerBottomRight from "@/assets/Images/cornerBottomRight.png"
import cornerBottomLeft from "@/assets/Images/cornerBottomLeft.png"
import { Icons } from '@/assets/Icons/icons'
import { Link } from 'react-router-dom'
export default function Footer() {
    // const appName = import.meta.env.VITE_APPLICATION_NAME;

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
                <div className="grid p-4 grid-cols-1 md:grid-cols-6 gap-3 ">
                    <div className="col-span-2  flex flex-col items-center justify-center">
                        <h3 className='font-semibold text-xl capitalize text-footer-items '>social app</h3>
                        <div className='flex items-center justify-center gap-2 mt-2'>

                            <a href="https://www.facebook.com/GoldenStitchLeathers/" target="_blank" className='cursor-pointer w-8 h-8 rounded-full flex items-center justify-center  '>
                                <Icons.FaFacebook size={20} className='cursor-pointer text-footer-items transition-all duration-500 ease-in-out hover:text-blue-600' />
                            </a>


                            <a href="https://wa.me/message/U2EYRCEWKMG6N1"
                                target="_blank"
                                rel="noopener noreferrer" className='cursor-pointer w-8 h-8 rounded-full flex items-center justify-center  '><Icons.FaWhatsapp size={22} className='cursor-pointer text-footer-items transition-all duration-500 ease-in-out hover:text-green-400' />
                            </a>


                            <a href="https://www.instagram.com/gsl3_0/" target="_blank" className='cursor-pointer w-8 h-8 rounded-full flex items-center justify-center  '>
                                <Icons.FaInstagram size={20} className='cursor-pointer text-footer-items transition-all duration-500 ease-in-out hover:text-pink-700' />
                            </a>
                        </div>
                    </div>
                    <div className="col-span-2 flex  flex-col  items-center justify-center gap-2">
                        <div className="flex  items-center justify-center gap-2 group ">

                            <Icons.MdOutlineMail className="text-lg text-footer-items transition-all ease-in-out duration-300 group-hover:text-[hsl(22,55%,44%)] " />
                            <a href="mailto:gstitchlearther@gmail.com" className='text-footer-items text-sm transition-all ease-in-out duration-300 group-hover:text-[hsl(22,55%,44%)] '>gstitchlearther@gmail.com</a>
                        </div>
                        <div className=" flex   items-center justify-center gap-2 group">
                            <Icons.FaPhoneAlt className="text-md text-footer-items transition-all ease-in-out duration-300 group-hover:text-[hsl(22,55%,44%)] " />
                            <a href="https://wa.me/message/U2EYRCEWKMG6N1" target="_blank" className='text-footer-items text-sm transition-all ease-in-out duration-300 group-hover:text-[hsl(22,55%,44%)] '>01119866111</a>
                        </div>
                    </div>
                    <div className="col-span-2 flex flex-col items-center justify-center  ">
                        <ul className='capitalize text-[#c4b5a0f3] cursor-pointer  text-[15px] '>
                            {/* <li className='mb-2 font-semibold text-footer-items '>pages</li> */}
                            <li className='transition-all duration-500 ease-in-out hover:text-gold-dark mb-1'>
                                <Link to="/">Home</Link>
                            </li>
                            <li className='transition-all duration-500 ease-in-out hover:text-gold-dark mb-1'>
                                <Link to="/products">Products</Link>
                            </li>
                            <li className='transition-all duration-500 ease-in-out hover:text-gold-dark mb-1'>
                                <p  >About Us</p>
                            </li>
                            <li className='transition-all duration-500 ease-in-out hover:text-gold-dark mb-1'>
                                <p  >Contact Us</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <p className='text-center text-footer-items text-sm pb-4 '>copyright@Golden-Stitch</p>
















            </div>

        </footer>
    </>
}
