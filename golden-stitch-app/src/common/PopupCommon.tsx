

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/Components/ui/alert-dialog";
import type { PopupCommonProps } from "@/Utilities/types";
import BtnCommon from "./BtnCommon";
import { Link } from "react-router-dom";

export default function PopupCommon({
    open,
    onOpenChange,
    text,
    title,
    image,
    showCancel = false,
    showAction = false,
    options,
    actionLink,
    actionText,
    classNameTitle,
    classNameText
}: PopupCommonProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="bg-radial from-dark-blue-1 to-dark-blue-nav border-none text-center">
                <AlertDialogHeader>
                    {title && (
                        <AlertDialogTitle className={` ${classNameTitle} text-gold-light capitalize`}>
                            {title}
                        </AlertDialogTitle>
                    )}

                    {/* ✅ keep only text and image inside AlertDialogDescription */}
                    <AlertDialogDescription className={`text-white ${classNameText}`} >
 
                        {text}

                        {image && <img src={image} alt="popup" className="w-20 mt-3 mx-auto" />}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                {/* ✅ move buttons outside of the <p> tag */}
                {options && options.length > 0 && (
                    <div className="flex  justify-center gap-3 mt-4">
                        {options.map((opt, i) => (
                            <BtnCommon
                                key={i}
                                text={opt.label}
                                onClick={() => {
                                    opt.onClick?.();
                                    onOpenChange(false);

                                }}
                                className={`px-4 py-2 rounded-md font-medium transition-all duration-300
          ${opt.className ?? "bg-gold-light text-dark-blue-1 hover:bg-gold-dark"}`}
                            />
                        ))}
                    </div>
                )}

                {/* ✅ Only show footer buttons if needed */}
                {(showCancel || showAction) && (
                    <AlertDialogFooter className="mt-4 flex justify-center gap-4">
                        {showCancel && (
                            <AlertDialogCancel
                                asChild
                                onClick={() => onOpenChange(false)}
                                className="border-none bg-transparent hover:bg-transparent"
                            >
                                <div>

                                <BtnCommon
                                    text="Cancel"
                                    className="bg-white border-dark-blue-nav text-dark-blue-2 transition-all duration-700 ease-in-out 
                    hover:from-gold-dark hover:to-[55%] hover:text-white"
                                />
                                </div>
                            </AlertDialogCancel>
                        )}

                        {showAction && (
                            <AlertDialogAction
                                onClick={() => onOpenChange(false)}
                                className="border-none bg-transparent hover:bg-transparent"
                            >
                                <Link to={actionLink || "/login"}>
                                    <div>

                                    <BtnCommon
                                        text={actionText || "Go To Login"}
                                        className="border-dark-blue-nav text-dark-blue-2 transition-all duration-700 ease-in-out 
                      hover:from-gold-dark hover:to-[55%] hover:text-white"
                                    />
                                    </div>
                                </Link>
                            </AlertDialogAction>
                        )}
                    </AlertDialogFooter>
                )}
            </AlertDialogContent>
        </AlertDialog>
    );
}





