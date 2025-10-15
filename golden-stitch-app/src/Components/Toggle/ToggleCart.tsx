import cornerBottomRightHero from "@/assets/Images/cornerBottomRightHero.png"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/Components/ui/sheet"

import logo from "@/assets/Images/logo.png"
import border from "@/assets/Images/border.png"
import { CardEnum, type CartItemFromAPI, type ToggleCommonProps } from '@/Utilities/types'
import CartCommon from "@/common/CartCommon"
import { useCartContext } from "@/Hooks/useAppContexts"
import { Icons } from "@/assets/Icons/icons"


export default function ToggleCart({ openCart, setOpenCart, title }: ToggleCommonProps) {
    const { cartItems , clearCart} = useCartContext()

    return (
        <>
            <Sheet open={openCart} onOpenChange={setOpenCart}>


                <SheetContent
                    side="right"
                    className="bg-radial from-[#E6D7B6] to-[#DBC8A0] flex flex-col min-h-screen"
                >
                    <SheetHeader>
                        <div className='flex items-center'>
                            <img src={logo} alt="" className='w-15' />
                            <div className='bg-gradient-to-r from-gold-dark to-gold-light bg-clip-text text-transparent uppercase font-bold text-xl'>
                                golden stitch
                            </div>
                        </div>
                        <span className='flex items-center justify-center'>
                            <img src={border} alt="border" className='w-50' />
                        </span>
                        <SheetTitle className='capitalize  flex justify-between'>
                            {title}
                            <div className="flex items-center justify-end gap-1 transition-all duration-500 ease-in-out cursor-pointer text-red-700 hover:bg-red-600 hover:text-white py-1 px-3 rounded-lg" onClick={()=>{clearCart()}}>

                                <Icons.FaTrash /> 
                                clear
                            </div>
                        </SheetTitle>
                    </SheetHeader>

                    <div className="flex-1 overflow-auto">
                        <SheetDescription asChild>
                            <div>
                                {/* <CartCommon cartList={cartItems} /> */}
                                <CartCommon
                                    cartList={cartItems?.map((item:CartItemFromAPI) => ({
                                        productId: item.productId,
                                        quantityNum:item.quantity
                                     }))}
                                    type={CardEnum.cart}
                                />
                            </div>
                        </SheetDescription>
                    </div>



                    <img
                        src={cornerBottomRightHero}
                        alt="cornerBottomRightHero"
                        className="absolute bottom-0 right-0 z-0"
                    />
                </SheetContent>


            </Sheet>

        </>
    );
}
