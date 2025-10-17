
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
} from "@/Components/ui/sidebar"
import { logoutEnum, type AppSidebarProps, type SidebarLink } from "@/Utilities/types"
import { NavLink } from "react-router-dom"

import logo from '@/assets/Images/logo.png';
import BtnCommon from "./BtnCommon";
import { Icons } from "@/assets/Icons/icons";
// import useLogin from "@/Hooks/useLogin";
import { useAuthContext } from "@/Hooks/useAppContexts";
import useGlobal from "@/Hooks/useGlobal";
import PopupCommon from "./PopupCommon";


export function AppSidebar({ sidebarLinks = [] }: AppSidebarProps) {
  const { logout } = useAuthContext();
    const {openPopup, setOpenPopup, navigate, } = useGlobal();
  
    const handleLogoutClick = async(flag: logoutEnum) => {
    await logout({ flag })
    navigate("/login")
  };
  return <>
   <Sidebar
  collapsible="icon"
  className="flex flex-col items-center justify-center bg-radial from-[#E6D7B6] to-[#DBC8A0] border-none "
>

      {/* <SidebarHeader className=" relative" >
        <SidebarHeader /> */}
      
      <SidebarHeader className="bg-dark-blue-nav">
        <div className=' flex justify-center items-center gap-2'>
            <div>
              <img src={logo} alt="logo"  className='w-10'/>
                </div>
              <p className='bg-gradient-to-r from-gold-dark to-gold-light bg-clip-text text-transparent uppercase font-bold text-xs'>golden stitch</p>

          </div>
      </SidebarHeader>
      {/* <SidebarTrigger className='  text-white absolute left-65 top-6 md:left-2 md:top-9  z-10 ' /> */}
<SidebarContent className="bg-dark-blue-nav pt-5 border-none overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

        <SidebarGroup className="" />
        <SidebarGroupContent className="flex flex-col justify-center mt-6   relative gap-3 ">
          <SidebarMenu className="flex flex-col justify-center  p-1   gap-3 ">
            {sidebarLinks.map((link: SidebarLink, i: number) => (
              <NavLink
                key={i}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3   px-1 py-2 rounded-md transition-all duration-300 ${isActive
                    ? "bg-gold-light"
                    : "hover:bg-gold-light/20"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.icon && (
                      <span
                        className={`text-xl pr-2 ${isActive
                            ? "text-gold-dark"
                            : "text-gray-300"
                          }`}
                      >
                        {link.icon}
                      </span>
                    )}
                    <span
                      className={`${isActive
                          ? "bg-gradient-to-r from-gold-dark to-[#d8be81] bg-clip-text text-transparent"
                          : "text-gray-300"
                        }`}
                    >
                      {link.label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}

            <BtnCommon
              text="   Logout"
              className="absolute -bottom-10 left-0 bg-transparent rounded-xl transition-all duration-500 ease-in-out hover:translate-x-4 hover:bg-gold-dark    "
              icon={Icons.IoLogOut}
              onClick={()=>{setOpenPopup(true);}}
            />

          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      {/* <SidebarFooter className="bg-green-500" /> */}
    </Sidebar>

    
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
}