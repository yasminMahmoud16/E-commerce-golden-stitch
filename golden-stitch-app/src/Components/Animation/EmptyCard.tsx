import Lottie from "lottie-react"
import emptyCartAnimation from "@/assets/lottie/rCTktxbHFz.json"
export default function EmptyCard() {
    return <>
        
        <div className="flex flex-col items-center justify-center py-10">
      <Lottie animationData={emptyCartAnimation} loop={true} className="w-60 h-60 " />
      <p className="mt-4 text-gray-400  text-xl font-bold">
        Your cart is empty 
      </p>
    </div>
    </>
}
