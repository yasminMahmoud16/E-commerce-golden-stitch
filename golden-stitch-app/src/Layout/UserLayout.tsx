
import { AppSidebar } from '@/common/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/Components/ui/sidebar'
import { Outlet } from 'react-router-dom'
import { Icons } from '@/assets/Icons/icons'
import border from '@/assets/Images/border.png'
import cornerBottomRightHero from '@/assets/Images/cornerBottomRightHero.png'
import PagesWrapper from '@/common/PagesWrapper'
import NavbarUser from '@/Pages/User/NavbarUser'

export default function userLayout() {

    const userLinks = [
        { label: "Profile", path: "profile", icon: <Icons.CgProfile /> },
        {
            label: "Orders", path: "orders",
            icon: <Icons.BsBoxSeamFill />
            
        },
        {
            label: "Account Setting", path: "account-setting",
            icon: <Icons.IoIosSettings />
            
        },
    ];
    return <>
        <NavbarUser />
        

        <PagesWrapper className='relative'>
            <div className="absolute right-0 bottom-0">
                        <img src={cornerBottomRightHero} alt="cornerBottomRightHero" className="w-40" />
            </div>

        <SidebarProvider className=''>

            <AppSidebar sidebarLinks={userLinks} />

                <section className='relative'>
             

                          <SidebarTrigger className=' text-dark-blue-2   ' />

                     
                        <div className='w-full  flex  justify-center  h-20 relative'>

                            <img src={border} alt="border"  className=' w-20 md:w-70 absolute -bottom-3 '/>
                        </div>
                    <div className="container">

                            
                        <div className='bg-dark-blue-nav md:mt-4  rounded-3xl lg:w-[900px]   p-6'>

                        <Outlet />
                    </div>
                </div>
            </section>
        </SidebarProvider>
        </PagesWrapper>
        
    </>

}
