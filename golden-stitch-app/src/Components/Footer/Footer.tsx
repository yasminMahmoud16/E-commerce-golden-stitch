


import cornerBottomRight from "@/assets/Images/cornerBottomRight.png"
import cornerBottomLeft from "@/assets/Images/cornerBottomLeft.png"
import { Icons } from '@/assets/Icons/icons'
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
                            <a href="https://wa.me/01119866111"
                                target="_blank"
                                rel="noopener noreferrer" className='w-8 h-8 rounded-full flex items-center justify-center  '><Icons.FaWhatsapp size={22} className='text-footer-items transition-all duration-500 ease-in-out hover:text-green-400' /></a>
                            <span className='w-8 h-8 rounded-full flex items-center justify-center  '><Icons.FaInstagram size={20} className='text-footer-items transition-all duration-500 ease-in-out hover:text-pink-700' /></span>
                        </div>
                    </div>
                    <div className="col-span-2 flex  flex-col  items-center justify-center gap-2">
                        <div className="flex  items-center justify-center gap-2">

                            <Icons.MdOutlineMail className="text-lg text-footer-items" />
                            <a href="mailto:stitchgolden30@gmail.com" className='text-footer-items text-sm'>stitchgolden30@gmail.com</a>
                        </div>
                        <div className=" flex   items-center justify-center gap-2">
                            <Icons.FaPhoneAlt className="text-md text-footer-items" />
                            <a href="tel:01119866111" className='text-footer-items text-sm'>01119866111</a>
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
                                <p  >About Us</p>
                            </li>
                            <li className='transition-all duration-500 ease-in-out hover:text-gold-dark'>
                                <p  >Contact Us</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <p className='text-center text-footer-items text-sm pb-4'>copyright@ {`${appName}`}</p>
















            </div>

        </footer>
    </>
}
