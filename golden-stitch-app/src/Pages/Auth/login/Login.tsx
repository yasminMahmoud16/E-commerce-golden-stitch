

import corner2 from "@/assets/Images/corner2.png"
import NoAccount from "./NoAccount"
import LoginInput from "./LoginInputs"



export default function Login() {






  return <>
    <section className=' min-h-screen flex items-center justify-center bg-radial from-dark-blue-1 via-dark-blue-2 to-dark-blue-nav overflow-hidden'>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-6  md:shadow-[0_0_10px_rgba(242,217,153,0.1)]  rounded-4xl my-5 ">
           <div className="col-span-4 flex flex-col items-center justify-center rounded-4xl md:rounded-l-4xl md:rounded-r-none mx-2 md:mx-0  bg-gradient-to-t from-gold-dark  to-gold-light ">
            <LoginInput/>
          </div>
          <div className=" hidden md:block md:relative col-span-2 rounded-tr-4xl  bg-radial from-dark-blue-1 via-dark-blue-2 to-dark-blue-nav ">
            <NoAccount  />
            <div className="absolute -bottom-3 -right-6 z-0">
              <img src={corner2} alt="corner1" className="w-72 z-0"/>
            </div>
          </div>
         
        </div>

      </div>




    </section>
  </>
}


