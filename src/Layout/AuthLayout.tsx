// import Navbar from "@/Components/Navbar/Navbar";
import NavbarAuth from "@/Pages/Auth/NavbarAuth/NavbarAuth";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return <>
         <div className="min-h-screen ">
            {/* Auth pages will render here */}
        <NavbarAuth/>
      <Outlet />
    </div>
    </>
}
