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
import  type {ToggleCommonProps } from '@/Utilities/types'
import { useCategoryContext } from "@/Hooks/useAppContexts"
export default function ToggleCategory({ openCategory, setOpenCategory, title }: ToggleCommonProps) {

    const { allCategoriesData } = useCategoryContext();


    return (
        <>
            <Sheet open={openCategory} onOpenChange={setOpenCategory}>


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
                            <ul className="p-4 ">
                                {allCategoriesData?.map((ct) => (
                                    <li className="list-outside capitalize mb-3 text-md flex p-2 items-center  transition-all duration-300 ease-in-out hover:bg-gold-dark/50 rounded-sm">
                                        <div className="w-15 h-15 rounded-full mr-2">
                                            <img src={`/${ct.image}`} alt="" className="rounded-full w-15 h-15" />
                                        </div>
                                        {ct.name}
                                    </li>


))}


                                {/* <CartCommon
                                    wishListItems={userWishList?.map(item => ({ productId: item }))}
                                    type={CardEnum.wishList}
                                /> */}
                            </ul>
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
