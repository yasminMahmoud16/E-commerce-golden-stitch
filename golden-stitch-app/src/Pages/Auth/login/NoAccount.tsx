import logo from "@/assets/Images/logo.png"
import BtnCommon from "@/common/BtnCommon"
import { Link } from "react-router-dom"
export default function NoAccount() {
  return <>
    <div className="flex flex-col items-center justify-center gap-3 p-10  relative z-10 ">
      <div>
        <img src={logo} alt="golden-stitch" />
      </div>
      <div className="flex flex-col items-center justify-center gap-6 mb-4">

        <h1 className="md:text-xl lg:text-2xl capitalize font-bold text-center text-gold leading-relaxed">Sign up to discover the newest in golden stitch </h1>

        
        <Link to={"/register"}>
        <BtnCommon
          type="button"
          text={"SIGN UP"}
          className="transition-all duration-700 ease-in-out 
              hover:from-gold-dark hover:to-[55%] "/>
        </Link>


      </div>

    </div>
  </>
}
