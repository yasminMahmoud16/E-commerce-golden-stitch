import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/Components/ui/alert-dialog"
import BtnCommon from "./BtnCommon";
import type { PopupCommonProps } from "@/Utilities/types";
export default function Delete({ open, onOpenChange, text, title, image }: PopupCommonProps) {
    return <>
        
                <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="bg-radial from-dark-blue-1 to-dark-blue-nav border-none">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-gold-light capitalize">{title}</AlertDialogTitle>
                    <AlertDialogDescription className=" text-center text-3xl flex flex-col items-center justify-center gap-2">
                        {text}
                        <img src={image} alt="" className="w-20" />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => onOpenChange(false)} className="border-none bg-transparent 
              hover:bg-transparent">

                        <BtnCommon text="cancel" className="bg-white border-dark-blue-nav text-dark-blue-2 transition-all duration-700 ease-in-out 
                        hover:from-gold-dark hover:to-[55%] hover:text-white"/>
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => onOpenChange(false)} className="border-none bg-transparent 
              hover:bg-transparent">

                        {/* <Link to={"/"}> */}
                            <BtnCommon text="Delete" className=" bg-red-500 border-dark-blue-nav text-dark-blue-2 transition-all duration-700 ease-in-out 
                        hover:from-gold-dark hover:to-[55%] hover:text-white"/>
                        {/* </Link> */}
                    </AlertDialogAction>

                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>
}
