
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import { CardEnum, type cartProps } from "@/Utilities/types"
import { Icons } from "@/assets/Icons/icons"
import BtnCommon from "./BtnCommon"
// import testImg from "@/assets/card1.jpg"

export default function CartCommon({
    image,
    title,
    price,

}: cartProps) {

    
    //   const items = type === CardEnum.cart ? cartList : wishListItems;

    return (
        <>
            {/* {items && items.length === 0 && type === CardEnum.cart ? (
        <EmptyCard />
      ) : ( */}
            <div className="flex flex-col gap-4">
                <Card className="relative z-10 bg-[#b2a384a4] border-none ">
                    <div className="grid grid-cols-6 gap-3">
                        <div className="col-span-3">
                            <CardContent>
                                <div className="w-40">
                                    <img src={image} alt="card1" />
                                </div>
                            </CardContent>
                        </div>
                        <div className="col-span-3">
                            <CardHeader>
                                <CardTitle className="text-dark-blue-2">{title}</CardTitle>

                                <div className="flex">
                                    <div className="w-7 h-5 bg-dark-blue-nav p-1 flex items-center justify-center rounded-sm mr-2 cursor-pointer transition-all duration-500 ease-in-out group hover:bg-dark-blue-1">
                                        <Icons.FiMinus className="text-xs text-gray-300 group-hover:text-gold-light" />
                                    </div>
                                    1
                                    <div className="w-7 h-5 bg-dark-blue-nav p-1 flex items-center justify-center rounded-sm ml-2 cursor-pointer transition-all duration-500 ease-in-out group hover:bg-dark-blue-1">
                                        <Icons.FaPlus className="text-gray-300 text-xs group-hover:text-gold-light" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardFooter>
                                <p className="font-bold text-xl text-gold-dark w-30">{price} $</p>
                            </CardFooter>
                        </div>
                    </div>
                </Card>

                
                {/* issue */}
                {/* {type === CardEnum.wishList && ( */}
                <div className="flex flex-col items-center justify-center gap-3">
                    <BtnCommon
                        text="Add More Products"
                        className="bg-transparent text-dark-blue-2 border border-dark-blue-1 rounded-md w-72 transition-all duration-300 ease-in-out hover:bg-dark-blue-nav hover:text-white"
                    />
                    <BtnCommon
                        text="Complete Your Order"
                        className="bg-dark-blue-2 text-white border border-dark-blue-1 rounded-md w-72 transition-all duration-300 ease-in-out hover:bg-dark-blue-nav hover:text-white"
                    />
                </div>
                {/* )} */}
            </div>
            {/* )} */}
        </>
    );
}
