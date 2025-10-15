
import HaveAccount from "./HaveAccount";
import SignUp from "./SignUp";
import corner1 from "@/assets/Images/corner1.png"



export default function Register() {
 
  return <>



    <section className=' flex items-center justify-center bg-radial from-dark-blue-1 via-dark-blue-2 to-dark-blue-nav min-h-screen overflow-hidden'>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-6   shadow-[0_0_10px_rgba(242,217,153,0.1)]  rounded-4xl my-5 ">
          <div className=" hidden md:block md:relative col-span-2 rounded-tl-4xl  bg-radial from-dark-blue-1 via-dark-blue-2 to-dark-blue-nav ">
            <HaveAccount />
            <div className="absolute -bottom-6 -left-5">
              <img src={corner1} alt="corner1" className="w-72"/>
            </div>
          </div>
          <div className="col-span-4 rounded-r-4xl mx-2 md:mx-0 md:rounded-r-4xl bg-gradient-to-t from-gold-dark  to-gold-light ">
            <SignUp/>
          </div>
        </div>

      </div>




    </section>
    
  </>
}


