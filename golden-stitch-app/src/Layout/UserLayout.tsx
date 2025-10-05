// import Navbar from '@/Components/Navbar/Navbar'
// import { Outlet, NavLink } from 'react-router-dom'
// import { useState } from 'react'

// export default function UserLayout() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false)

//   return (
//     <div className="flex min-h-screen bg-radial from-[#E6D7B6] to-[#DBC8A0]">
//       {/* Sidebar */}
//       <aside
//         className={`
//           w-64 ml-4 my-4 bg-dark-blue-nav text-white flex flex-col shadow-lg rounded-3xl
//           transform transition-transform duration-300 ease-in-out
//           ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
//           md:translate-x-0
//         `}
//       >
//         <nav className="flex-1 p-4 space-y-2 mt-16 md:mt-0">
//           <NavLink
//             to="/profile"
//             className={({ isActive }) =>
//               `block px-4 py-2 rounded-md transition ${
//                 isActive ? 'bg-gold text-dark-blue-nav font-semibold' : 'hover:bg-gold/20'
//               }`
//             }
//             onClick={() => setIsSidebarOpen(false)}
//           >
//             Profile
//           </NavLink>
//           <NavLink
//             to="/orders"
//             className={({ isActive }) =>
//               `block px-4 py-2 rounded-md transition ${
//                 isActive ? 'bg-gold text-dark-blue-nav font-semibold' : 'hover:bg-gold/20'
//               }`
//             }
//             onClick={() => setIsSidebarOpen(false)}
//           >
//             Orders
//           </NavLink>
//           <NavLink
//             to="/wishlist"
//             className={({ isActive }) =>
//               `block px-4 py-2 rounded-md transition ${
//                 isActive ? 'bg-gold text-dark-blue-nav font-semibold' : 'hover:bg-gold/20'
//               }`
//             }
//             onClick={() => setIsSidebarOpen(false)}
//           >
//             Wish List
//           </NavLink>
//           <NavLink
//             to="/settings"
//             className={({ isActive }) =>
//               `block px-4 py-2 rounded-md transition ${
//                 isActive ? 'bg-gold text-dark-blue-nav font-semibold' : 'hover:bg-gold/20'
//               }`
//             }
//             onClick={() => setIsSidebarOpen(false)}
//           >
//             Account Settings
//           </NavLink>
//           <NavLink
//             to="/logout"
//             className={({ isActive }) =>
//               `block px-4 py-2 rounded-md transition ${
//                 isActive ? 'bg-gold text-dark-blue-nav font-semibold' : 'hover:bg-gold/20'
//               }`
//             }
//             onClick={() => setIsSidebarOpen(false)}
//           >
//             Logout
//           </NavLink>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main
//         className={`
//           flex-1 p-6 transition-all duration-300 ease-in-out
//           ${!isSidebarOpen ? 'ml-0' : 'md:ml-64'}
//         `}
//       >
//         {/* Button to open/close sidebar on small screens */}
//         <div className="md:hidden mb-4">
//           <button
//             className="px-4 py-2 bg-gold text-dark-blue-nav rounded-md font-semibold"
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//           >
//             {isSidebarOpen ? 'Close Menu' : 'Open Menu'}
//           </button>
//         </div>

//         <Navbar />
//         <div className="mt-6 bg-dark-blue-nav rounded-3xl p-4">
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   )
// }


// import { AppSidebar } from '@/Components/sidBar/AppSidebar'
import React from 'react'

export default function userLayout() {
    return <>
        {/* <AppSidebar/> */}
    </>
  
}
