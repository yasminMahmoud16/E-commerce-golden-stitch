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
import { CardEnum, type ToggleCommonProps, type WishListProduct } from '@/Utilities/types'
import CartCommon from "@/common/CartCommon"
import { useProfileContext } from "@/Hooks/useAppContexts"
export default function ToggleWishList({ openCart, setOpenCart, title }: ToggleCommonProps) {

    const { data } = useProfileContext()
    const userWishList: WishListProduct[] | undefined =
  Array.isArray(data?.wishlist) ? (data.wishlist as WishListProduct[]) : undefined;



    // console.log({ userWishList: data?.wishlist });



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
                            <img src={border} alt="" className='w-50' />
                        </span>
                        <SheetTitle className='capitalize'>{title}</SheetTitle>
                    </SheetHeader>

                    <div className="flex-1 overflow-auto">
                        <SheetDescription asChild>
                            <div>

                                <CartCommon
                                
                                    wishListItems={userWishList}
                                    type={CardEnum.wishList}
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
