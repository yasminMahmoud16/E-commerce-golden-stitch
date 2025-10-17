import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/Components/ui/alert-dialog";
import { Input } from "../ui/input";
import BtnCommon from "@/common/BtnCommon";
import { useOrderContext } from "@/Hooks/useAppContexts";
import { useState } from "react";
import { toast } from "sonner";

export default function Cancel({
    open,
    onOpenChange,
    orderId,
    onStatusChange, // callback from parent
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    orderId: string | null;
    onStatusChange?: (id: string, status: string) => void;
}) {
    const { cancelOrder } = useOrderContext();
    const [reason, setReason] = useState("");

    const handleCancelClick = async () => {
        if (!orderId) {
            toast.error("Order ID not found!");
            return;
        }

        if (!reason.trim()) {
            toast.error("Please enter a reason for cancellation.");
            return;
        }

        const message = await cancelOrder(orderId, reason);

        // call parent callback to update the status immediately
        if (message === "Done" && onStatusChange) {
            onStatusChange(orderId, "cancel");
        }

        onOpenChange(false);
        setReason("");
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="bg-radial from-dark-blue-1 to-dark-blue-nav border-none text-center">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-gold-light capitalize">
                        Cancel order
                    </AlertDialogTitle>

                    <AlertDialogDescription className="text-white">
                        Why do you want to cancel this order?
                        <Input
                            type="text"
                            placeholder="Reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="md:w-full py-3 px-4 pl-10 placeholder:text-gray-400 mt-2 text-black"
                        />
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="flex justify-center gap-3 mt-4">
                    <BtnCommon
                        text="Cancel order"
                        onClick={handleCancelClick}
                    />
                    <BtnCommon
                        text="Close"
                        className="bg-gray-400 text-white"
                        onClick={() => onOpenChange(false)}
                    />
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}
