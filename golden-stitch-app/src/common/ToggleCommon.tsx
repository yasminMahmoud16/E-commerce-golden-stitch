import cornerBottomRightHero from "@/assets/Images/cornerBottomRightHero.png"
import CartCommon from './CartCommon'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/Components/ui/sheet"

import logo from "@/assets/Images/logo.png"
import border from "@/assets/Images/border.png"
import { CardEnum, type ToggleCommonProps } from '@/Utilities/types'
export default function ToggleCommon({ openCart, setOpenCart, title }: ToggleCommonProps) {
    const cartList =[]
    return (
        <>
            <Sheet open={openCart} onOpenChange={setOpenCart}>
                <SheetContent side="right" className="bg-radial from-[#E6D7B6] to-[#DBC8A0]">
                    <SheetHeader >
                        <div className='flex items-center '>

                            <img src={logo} alt="" className='w-15' />
                            <p className='bg-gradient-to-r from-gold-dark to-gold-light bg-clip-text text-transparent uppercase font-bold text-xl'>golden stitch</p>
                        </div>
                            <span className='flex items-center justify-center '><img src={border} alt="" className='w-50' /></span>
                        <SheetTitle className='capitalize'>{title}</SheetTitle>
                        
                        <SheetDescription>
                            
                            {/* <CartCommon type="cart" /> */}
                            <CartCommon  />
                        </SheetDescription>
                    </SheetHeader>

                    
                    
                    
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
