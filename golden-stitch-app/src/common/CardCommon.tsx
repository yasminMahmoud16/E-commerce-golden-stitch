import {
  Card,
  // CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import type { cardProps } from "@/Utilities/types"
import { Icons } from "@/assets/Icons/icons"

export default function CardCommon({
  image,
    title,
  description,
  price,
  onClickCard,
  onClickCart,
  onClickWishList

}:cardProps) {
  return <>
    <Card
onClick={() => onClickCard?.()}
      className="group  cursor-pointer w-96 p-0 bg-transparent relative border-none overflow-hidden rounded-none">
      <CardContent className=" p-0">
        <img src={image} alt="card1" className="" />
            <div
          className="
      
        absolute inset-0 
        before:content-[''] before:absolute 
        before:top-[100%] before:left-[-100%]
        before:w-[200%] before:h-[200%] 
        before:bg-gradient-to-br before:from-transparent before:via-white/20 before:to-transparent
        before:rotate-0
        before:transition-transform before:duration-900
        group-hover:before:translate-x-[50%] 
        group-hover:before:top-[-100%]
        group-hover:before:translate-y-[50%]
      "
        >
          <span className="absolute top-3 -right-9 transition-all duration-700 ease-in-out group-hover:right-5">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onClickWishList?.()
              }}
              className="w-9 h-9 rounded-full bg-gray-400/15 flex items-center justify-center">

              
            <Icons.FaHeart size={20} className="text-gray-50 transition-all duration-300 ease-in-out hover:text-red-800 hover:cursor-pointer"/>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClickCart?.()
              }}
              className="w-9 h-9 rounded-full bg-gray-400/15 flex items-center justify-center mt-3">

            <Icons.FaShoppingBag size={20} className="text-gray-50 transition-all duration-300 ease-in-out hover:text-gold-light hover:cursor-pointer"/>
            </button>
          </span>
    </div>
      </CardContent>
      <CardHeader className="absolute opacity-0  -bottom-10 bg-gray-50/15 w-full p-2 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:bottom-0">
        <CardTitle className="text-gray-300 font-semibold text-xl capitalize">{title}</CardTitle>
        <CardDescription className="flex items-center justify-center" >
          <p className="capitalize text-gray-300">{description.slice(0,60) }</p>
          <p className="font-bold text-xl text-[#fdd888] w-30">{price} $</p>
        </CardDescription>
        
        {/* <CardAction>Card Action</CardAction> */}
      </CardHeader>
      

    </Card>
  </>
}
