import OrderComplete from "./OrderComplete";
import OrderConfirmSide from "./OrderConfirmSide";
import corner1 from "@/assets/Images/corner1.png"
export default function OrderConfirm() {
  return (
    <>
      <section className="min-h-screen h-full">
        <div className="grid grid-cols-1 md:grid-cols-6 min-h-screen shadow-[0_0_10px_rgba(242,217,153,0.1)]">
          
          {/* Left Side */}
          <div className="hidden md:block col-span-2 bg-radial from-dark-blue-1 via-dark-blue-2 to-dark-blue-nav h-full">
            <OrderConfirmSide />
            {/* <div className="absolute -bottom-6 -left-5">
              <img src={corner1} alt="corner1" className="w-72" />
            </div> */}
          </div>

          {/* Right Side */}
          <div className="col-span-4 flex items-center justify-center  md:mx-0 bg-gradient-to-t from-gold-dark to-gold-light h-full">
            <OrderComplete />
          </div>

        </div>
      </section>
    </>
  );
}

