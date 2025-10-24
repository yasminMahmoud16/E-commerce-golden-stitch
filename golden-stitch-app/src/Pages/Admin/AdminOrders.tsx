import { useOrderContext } from "@/Hooks/useAppContexts"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination"
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/Components/ui/select";

import AdminTitles from "@/common/AdminTitles";
import { Icons } from "@/assets/Icons/icons";
// import { Input } from "@/Components/ui/input";
import { useState } from "react";
import Cancel from "@/Components/cancel/Cancel";
import { StateEnum } from "@/Utilities/types";
import { useNavigate } from "react-router-dom";
export default function ArchiveOrders() {


    const { ordersData, page, setPage, statusFilter, setStatusFilter, onDeliveredByAmin, onWayByAmin } = useOrderContext();
    const [open, setOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    // const [pendingCancelStatus, setPendingCancelStatus] = useState<string | null>(null);
    const [pendingStatus, setPendingStatus] = useState<Record<string, string>>({});
 const navigate = useNavigate(); 
    // console.log({ ordersData });
    const Headers = [
        { id: 3, label: "Customer Name" },
        { id: 1, label: "Address" },
        { id: 9, label: "Product Name" },
        { id: 9, label: "Total Price" },
        { id: 2, label: "Payment-Type" },
        { id: 4, label: "note" },
        { id: 5, label: "Phone" },
        { id: 8, label: "Status" },

    ];

     const handleRowClick = (id: string) => {
        navigate(`/admin/order/order-details/${id}`); 
    };



    return <>


        <AdminTitles
            text="All Orders"
            icon={Icons.BsBoxSeamFill}
        />



        <div className="relative mb-2 mr-4 flex justify-end">
            <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value)}
            >
                <SelectTrigger className="w-[150px] bg-transparent text-gold border-gold-dark border-4">
                    <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent className="bg-dark-blue-nav border-gray-400 text-gray-400">

                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value={StateEnum.placed}>Placed</SelectItem>
                    <SelectItem value={StateEnum.onWay}>On Way</SelectItem>
                    <SelectItem value={StateEnum.delivered}>Delivered</SelectItem>
                    <SelectItem value={StateEnum.cancel}>Cancelled</SelectItem>
                </SelectContent>
            </Select>
        </div>

        <div className="w-full overflow-x-hidden scrollbar-hide">
            <Table className="min-w-full">
                <TableHeader>
                    <TableRow>
                        {Headers.map((header) => (
                            <TableHead
                                key={header.id}
                                className="bg-gold-light w-md text-center text-gold-dark font-semibold mr-8 whitespace-nowrap"
                            >
                                {header.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody className="overflow-hidden scrollbar-hide">
                    {ordersData?.docs?.map((data) => (
                        <TableRow
                            onClick={() => handleRowClick(data.id)}
                            key={data.id}
                            className=" cursor-pointer border-none  transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-white/10 text-gray-400 capitalize
                            "
                        >
                            <TableCell className="font-medium text-center p-0 text-sm ">{data.createdBy?.username}</TableCell>

                            <TableCell className="font-medium text-center  pl-4">{data.address.slice(1,20)}</TableCell>
                            <TableCell className="font-medium text-center  p-0">
                                {data.products?.length
                                    ? `${data.products[0].productId?.name}${data.products.length > 1 ? " ..." : ""
                                    }`
                                    : "-"}

                            </TableCell>
                            <TableCell className="font-medium text-center ">{data.subtotal.toFixed(2)}</TableCell>



                            <TableCell className="font-medium text-center ">{data.paymentType}</TableCell>
                            <TableCell className="font-medium text-xs truncate text-center ">
                                {String(data.note || "no note for this order")}
                            </TableCell>
                            <TableCell className="font-medium text-center text-xs   ">{data.phone}</TableCell>

                            <TableCell className="font-medium text-center ">
                                <Select
                                    value={pendingStatus[data.id] || data.status || StateEnum.placed}
                                    onValueChange={async (value) => {
                                        if (value === StateEnum.cancel) {
                                            setSelectedOrderId(data.id);
                                            setPendingStatus((prev) => ({ ...prev, [data.id]: StateEnum.cancel }));
                                            setOpen(true);
                                        } else if (value === StateEnum.onWay) {
                                            setPendingStatus((prev) => ({ ...prev, [data.id]: StateEnum.onWay }));
                                            await onWayByAmin(data.id);
                                        } else if (value === StateEnum.delivered) {
                                            setPendingStatus((prev) => ({ ...prev, [data.id]: StateEnum.delivered }));
                                            await onDeliveredByAmin(data.id);
                                        }
                                    }}
                                >
                                    <SelectTrigger
                                        className={`w-31 bg-transparent border-gold-dark border-4
                                        ${(pendingStatus[data.id] || data.status) === StateEnum.cancel
                                                ? "text-red-500"
                                                : (pendingStatus[data.id] || data.status) === StateEnum.delivered
                                                    ? "text-green-500"
                                                    : (pendingStatus[data.id] || data.status) === StateEnum.onWay
                                                        ? "text-yellow-400"
                                                        : "text-blue-500"
                                            }`}
                                    >
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {(() => {
                                            const currentStatus = pendingStatus[data.id] || data.status;

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


                            </TableCell>



                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>





        <Pagination className="my-4">
            <PaginationContent>
                {page > 1 && (
                    <PaginationItem>
                        <PaginationPrevious
                            className="cursor-pointer transition-all ease-in-out duration-300 text-gold-dark hover:bg-transparent hover:text-dark-blue-2"
                            onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : 1))}
                        />
                    </PaginationItem>
                )}

                <PaginationItem>
                    <PaginationLink isActive className="cursor-pointer rounded-full">
                        {page}
                    </PaginationLink>
                </PaginationItem>

                {page < (ordersData?.pages || 1) && (
                    <PaginationItem>
                        <PaginationNext
                            className="cursor-pointer transition-all ease-in-out duration-300 text-gold-dark hover:bg-transparent hover:text-dark-blue-2"
                            onClick={() =>
                                setPage((prev) =>
                                    prev < (ordersData?.pages || 1) ? prev + 1 : prev
                                )
                            }
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>

        
        {open && (
            <Cancel open={open} onOpenChange={setOpen} orderId={selectedOrderId} onStatusChange={(id, status) => {
                setPendingStatus(prev => ({ ...prev, [id]: status }));
            }} />
        )}


    </>
}
