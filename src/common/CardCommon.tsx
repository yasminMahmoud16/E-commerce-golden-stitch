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
  mainPrice,
  discount,
  onClickCard,
  onClickCart,
  onClickWishList

}:cardProps) {
  return <>
    <Card
onClick={() => onClickCard?.()}
      className="group  cursor-pointer w-96 p-0 bg-transparent relative border-none overflow-hidden rounded-none">
      <CardContent className=" w-full p-0">


        <div className=" w-96 h-76">

          <img
  src={image}
  alt={title || "product"}
  className="
    w-full h-full object-fill overflow-hidden
    transition-transform duration-500 ease-in-out
    group-hover:scale-110
  "
/>

        {/* <img src={image} alt={title || "product"} className="w-full h-full object-fill  overflow-hidden" /> */}
        </div>
            <div
          className="
      
        absolute inset-0 
        before:content-[''] before:absolute 
        before:top-[100%] before:left-[-100%]
        before:w-[200%] before:h-[200%] 
        before:bg-gradient-to-br before:from-transparent before:via-white/10 before:to-transparent
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
      <CardHeader className="absolute opacity-0  -bottom-10 bg-gray-900/30 w-full p-2 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:bottom-0">
        <CardTitle className="text-gray-300 font-semibold text-xl capitalize flex justify-between px-3">
          <p>

          {title}
          </p>
          <p className="text-[hsl(22,55%,44%)] ">

          {discount}%
          </p>

        </CardTitle>
        <CardDescription className="flex items-center justify-center " >
          <p className="capitalize text-gray-300">{description.slice(0, 60)}</p>
          <div>

          <del className="font-light text-sm text-[hsl(22,55%,44%)]  w-25">{mainPrice} EGP</del>
          <p className="font-bold text-lg text-[#fdd888] w-25 ">{price} EGP</p>
          </div>
        </CardDescription>
        
        {/* <CardAction>Card Action</CardAction> */}
      </CardHeader>
      

    </Card>
  </>
}
