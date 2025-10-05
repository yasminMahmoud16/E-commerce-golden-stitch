import Navbar from '../Components/Navbar/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'

export default function Layout() {
      const location = useLocation()
  const isLanding = location.pathname === "/"
    return <>
         {!isLanding && <Navbar />}
        {/* <Navbar /> */}
        <Outlet />
        <Footer/>
    </>
}
