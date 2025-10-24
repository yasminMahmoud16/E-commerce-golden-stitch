import { useOrderContext } from "@/Hooks/useAppContexts";
import { StateEnum } from "@/Utilities/types";
import { useParams } from "react-router-dom";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/Components/ui/select";
import { useState } from "react";
import Cancel from "@/Components/cancel/Cancel";
export default function AdminOrderDetails() {
    const { id } = useParams();
    const { ordersData, loadingDetails, onDeliveredByAmin, onWayByAmin } = useOrderContext();
    const [pendingStatus, setPendingStatus] = useState<Record<string, string>>({});
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    if (loadingDetails) {
        return <p className="text-center text-gold">Loading...</p>;
    }

    const order = ordersData?.docs?.find((o) => o.id === id);

    if (!order) {
        return <p className="text-center text-red-400">Order not found</p>;
    }

    return (
        <div
            key={order.id}
            className="mb-6 bg-white/10 border w-full border-gold/30 rounded-2xl p-5 text-white shadow-md hover:shadow-lg transition-all duration-300"
        >
            <div className="border-b border-gold/20 pb-3 mb-3">
                <h2 className="text-gold text-xl font-semibold">
                    Order #{order.customId?.slice(0, 8) || order.id.slice(0, 8)}
                </h2>
                <p className="text-sm text-gray-300 mt-1">
                    {new Date(order.createdAt).toLocaleString()}
                </p>
            </div>

            <div className="space-y-4">
                {order.products?.map((p, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-4 bg-white/5 rounded-lg p-3"
                    >
                        <img
                            src={`/${p.productId?.images?.[0]}`}
                            alt={p.productId?.name || "Product"}
                            className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex flex-col">
                            <h3 className="text-gold font-medium">{p.productId?.name}</h3>
                            <p className="text-gray-300 text-sm">
                                <span className="text-gold font-semibold">
                                    {p.finalPrice} EGP
                                </span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-5 space-y-2 text-sm text-gray-200 capitalize">
                <p>
                    <span className="text-gold font-semibold">Username:</span>{" "}
                    {order.createdBy?.username}
                </p>
                <p>
                    <span className="text-gold font-semibold">Address:</span>{" "}
                    {order.address}
                </p>
                <p>
                    <span className="text-gold font-semibold">Phone:</span>{" "}
                    {order.phone}
                </p>
                <p>
                    <span className="text-gold font-semibold">Payment:</span>{" "}
                    {order.paymentType}
                </p>
                <p>
                    <span className="text-gold font-semibold">Note:</span>{" "}
                    {order.note || "No notes"}
                </p>
                <p  className="text-gold font-bold text-lg">
                    Total:
                    <span className=" text-gray-300 ml-2 font-bold text-lg">
                        {order.subtotal}
                    </span>{" "}
                    
                </p>


                <div className=" flex flex-col   gap-3">
                    <Select
                        value={pendingStatus[order.id] || order.status || StateEnum.placed}
                        onValueChange={async (value) => {
                            if (value === StateEnum.cancel) {
                                setSelectedOrderId(order.id);
                                setPendingStatus((prev) => ({ ...prev, [order.id]: StateEnum.cancel }));
                                setOpen(true);
                            } else if (value === StateEnum.onWay) {
                                setPendingStatus((prev) => ({ ...prev, [order.id]: StateEnum.onWay }));
                                await onWayByAmin(order.id);
                            } else if (value === StateEnum.delivered) {
                                setPendingStatus((prev) => ({ ...prev, [order.id]: StateEnum.delivered }));
                                await onDeliveredByAmin(order.id);
                            }
                        }}
                    >
                        <SelectTrigger
                            className={`w-31 bg-transparent border-gold-dark border-4
                                        ${(pendingStatus[order.id] || order.status) === StateEnum.cancel
                                    ? "text-red-500"
                                    : (pendingStatus[order.id] || order.status) === StateEnum.delivered
                                        ? "text-green-500"
                                        : (pendingStatus[order.id] || order.status) === StateEnum.onWay
                                            ? "text-yellow-400"
                                            : "text-blue-500"
                                }`}
                        >
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>

                        <SelectContent>
                            {(() => {
                                const currentStatus = pendingStatus[order.id] || order.status;

                                if (currentStatus === StateEnum.cancel) {
                                    return (
                                        <SelectItem value={StateEnum.cancel} className="text-red-600">
                                            Cancelled
                                        </SelectItem>
                                    );
                                }

                                if (currentStatus === StateEnum.delivered) {
                                    return (
                                        <SelectItem value={StateEnum.delivered} className="text-green-500">
                                            Delivered
                                        </SelectItem>
                                    );
                                }

                                return (
                                    <>
                                        {currentStatus !== StateEnum.onWay &&
                                            currentStatus !== StateEnum.delivered && (
                                                <SelectItem value={StateEnum.placed} className="text-blue-500">
                                                    Placed
                                                </SelectItem>
                                            )}

                                        {currentStatus !== StateEnum.delivered && (
                                            <SelectItem value={StateEnum.onWay} className="text-yellow-500">
                                                On Way
                                            </SelectItem>
                                        )}

                                        {currentStatus !== StateEnum.cancel && (
                                            <SelectItem value={StateEnum.delivered} className="text-green-500">
                                                Delivered
                                            </SelectItem>
                                        )}

                                        {currentStatus !== StateEnum.delivered && (
                                            <SelectItem value={StateEnum.cancel} className="text-red-600">
                                                Cancelled
                                            </SelectItem>
                                        )}
                                    </>
                                );
                            })()}
                        </SelectContent>


                        {/* <SelectContent>
                                        <SelectItem value={StateEnum.placed} className="text-blue-500">
                                            Placed
                                        </SelectItem>

                                        <SelectItem value={StateEnum.onWay} className="text-yellow-500">
                                            On Way
                                        </SelectItem>

                                        <SelectItem value={StateEnum.delivered} className="text-green-500">
                                            Delivered
                                        </SelectItem>

                                        {(pendingStatus[data.id] || data.status) !== StateEnum.delivered && (
                                            <SelectItem value={StateEnum.cancel} className="text-red-600">
                                                Cancelled
                                            </SelectItem>
                                        )}
                                    </SelectContent> */}
                    </Select>
                    Last Updated: {new Date(order.updatedAt).toLocaleString()}
                </div>



            </div>


            {open && (
                <Cancel open={open} onOpenChange={setOpen} orderId={selectedOrderId} onStatusChange={(id, status) => {
                    setPendingStatus(prev => ({ ...prev, [id]: status }));
                }} />
            )}
        </div>
    );
}
