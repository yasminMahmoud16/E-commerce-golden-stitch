import PagesWrapper from "@/common/PagesWrapper";
import NavbarUser from "@/Pages/User/NavbarUser";
import cornerBottomRightHero from '@/assets/Images/cornerBottomRightHero.png'
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { AppSidebar } from "@/common/AppSidebar";
import { Icons } from "@/assets/Icons/icons";
import { Outlet,  } from "react-router-dom";
import border from '@/assets/Images/border.png'


export default function AdminLayout() {


    const userLinks = [
        { label: "Profile", path: "/admin/profile", icon: <Icons.CgProfile /> },
        {
            label: "Users", path: "users",
            icon: <Icons.FaUsers />

        },
        {
            label: "Orders", path: "orders",
            icon: <Icons.BsBoxSeamFill />

        },

        {
            label: "Products", path: "products",
            icon: <Icons.FaBoxesStacked />

        },
        {
            label: "Category", path: "category",
            icon: <Icons.BiSolidCategoryAlt />

        },
        {
            label: "Account Setting", path: "account-setting",
            icon: <Icons.IoIosSettings />

        },
    ];


    return <>

        <NavbarUser />
        <PagesWrapper className="relative">
            <div className="absolute right-0 bottom-0">
                <img src={cornerBottomRightHero} alt="cornerBottomRightHero" className="w-40" />
            </div>


            <SidebarProvider>
                <AppSidebar sidebarLinks={userLinks} />
                <section className='relative w-full'>


                    <SidebarTrigger className=' text-dark-blue-2   ' />


                    <div className='w-full  flex  justify-center  h-20 relative mb-9'>

                        <img src={border} alt="border" className=' w-80 md:w-90 absolute -bottom-5 left-9' />
                    </div>
                    <div className="container">

                        


                        <div className='bg-dark-blue-nav  mb-5 rounded-3xl w-90  lg:w-5xl  p-6 shadow-md'>

                            <Outlet />
                        </div>
                    </div>
                </section>
            </SidebarProvider>
        </PagesWrapper>
    </>
}
