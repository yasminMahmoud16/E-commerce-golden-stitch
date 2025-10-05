import logo from "@/assets/Images/logo.png"
import BtnCommon from "@/common/BtnCommon"
import { Link } from "react-router-dom"
export default function HaveAccount() {
  return <>
    <div className="flex flex-col items-center justify-center gap-3 p-10 relative z-10 ">
      <div>
        <img src={logo} alt="golden-stitch" />
      </div>
      <div className="flex flex-col items-center justify-center gap-8">

        <h1 className="text-3xl capitalize font-bold text-center text-gold">Already have an account?</h1>
        <p className="text-sm capitalize font-light text-center text-gold">Stay in the loop — log in now!</p>
        {/* <Button
          className="bg-gradient-to-r from-gold-dark to-gold-light px-10 rounded-3xl uppercase 
              transition-all duration-700 ease-in-out 
              hover:from-gold-dark hover:to-[55%] cursor-pointer"
        >
          signin
        </Button> */}
        <Link to={"/login"}>
        <BtnCommon text={"SIGN IN"} className="transition-all duration-700 ease-in-out 
              hover:from-gold-dark hover:to-[55%] "/>
        </Link>

      </div>

    </div>
  </>
}
