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
export default function ArchiveOrders() {


    const { ordersData, page, setPage, statusFilter, setStatusFilter, onDeliveredByAmin, onWayByAmin } = useOrderContext();
    const [open, setOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    // const [pendingCancelStatus, setPendingCancelStatus] = useState<string | null>(null);
    const [pendingStatus, setPendingStatus] = useState<Record<string, string>>({});

    console.log({ ordersData });
    const Headers = [
        { id: 1, label: "Address" },
        { id: 2, label: "Payment-Type" },
        { id: 3, label: "Customer Name" },
        { id: 4, label: "note" },
        { id: 5, label: "Phone" },
        { id: 8, label: "Status" },

    ];

    // const handelCancelClick = async (id: string) => {
    //     setSelectedOrderId(id);
    //     setOpen(true)

    // }

    return <>


        <AdminTitles
            text="archive Products"
            icon={Icons.IoMdArchive}
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

        <div className="w-full overflow-x-auto scrollbar-hide">
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

                <TableBody>
                    {ordersData?.map((data) => (
                        <TableRow
                            key={data.id}
                            className="cursor-pointer border-none rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-white/10 text-gray-400 capitalize"
                        >

                            <TableCell className="font-medium text-center">{data.address}</TableCell>
                            <TableCell className="font-medium text-center">{data.paymentType}</TableCell>
                            <TableCell className="font-medium text-center">{data.createdBy.username}</TableCell>
                            <TableCell className="font-medium text-xs truncate max-w-[200px]">
                                {String(data.note || "").slice(0, 60)}
                            </TableCell>
                            <TableCell className="font-medium text-center">{data.phone}</TableCell>

                            <TableCell className="font-medium text-center">
                                <Select
                                    value={pendingStatus[data.id] || data.status || StateEnum.placed}
                                    onValueChange={async (value) => {
                                        if (value === StateEnum.cancel) {
                                            setSelectedOrderId(data.id);
                                            setPendingStatus((prev) => ({ ...prev, [data.id]: StateEnum.cancel }));
                                            setOpen(true); // open modal for reason
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
                                        className={`w-[150px] bg-transparent border-gold-dark border-4
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
                                        <SelectItem value={StateEnum.placed} className="text-blue-500">
                                            Placed
                                        </SelectItem>
                                        <SelectItem value={StateEnum.onWay} className="text-yellow-500">
                                            On Way
                                        </SelectItem>
                                        <SelectItem value={StateEnum.delivered} className="text-green-500">
                                            Delivered
                                        </SelectItem>
                                        <SelectItem value={StateEnum.cancel} className="text-red-600">
                                            Cancelled
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                            </TableCell>



                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>





        <Pagination className="mt-3">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        className="text-gold cursor-pointer hover:bg-transparent hover:text-gold-dark"
                        onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : 1))}
                    />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink
                        onClick={() => setPage(1)}
                        isActive={page === 1}
                        className="cursor-pointer rounded-full"
                    >
                        {page}
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext
                        className="cursor-pointer text-gold hover:bg-transparent hover:text-gold-dark"
                        onClick={() => setPage((prev) => prev + 1)}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>


        {open && (
            <Cancel open={open} onOpenChange={setOpen} orderId={selectedOrderId} onStatusChange={(id, status) => {
                setPendingStatus(prev => ({ ...prev, [id]: status }));
            }} />
        )}


    </>
}
