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
import { Input } from "@/Components/ui/input";
import { useState } from "react";
import Cancel from "@/Components/cancel/Cancel";
import { StateEnum } from "@/Utilities/types";
export default function ArchiveOrders() {


    const { ordersData, page, setPage, search, setSearch,onDeliveredByAmin,onWayByAmin } = useOrderContext();
    const [open, setOpen] = useState(false);
    // const [ orderType,setOrderType] = useState<string>("onWay");
const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

    console.log({ ordersData });
    const Headers = [
        { id: 1, label: "Address" },
        { id: 2, label: "Payment-Type" },
        { id: 3, label: "Customer Name" },
        { id: 4, label: "note" },
        { id: 5, label: "Phone" },
        { id: 8, label: "Status" },

    ];

    const handelCancelClick =async (id:string) => {
            setSelectedOrderId(id);
            setOpen(true)
        
    }

    return <>


        <AdminTitles
            text="archive Products"
            icon={Icons.IoMdArchive}
        />


        <div className="relative mb-2">
            <Icons.CiSearch
                className="absolute left-3 top-4 -translate-y-1/2 text-footer-items"
                size={23}
            />
            <Input
                type="text"
                placeholder="search"
                className="w-60 md:w-80 border-footer-items py-3 px-2 pl-10 mb-2 text-white placeholder:text-footer-items rounded-4xl"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
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
                            {/* <TableCell className="font-medium my-2 w-40 h-10 ">
            <div className="flex justify-center items-center">
              <img
                src={`/${data.images}`}
                alt="image"
                className="w-15 h-15 rounded-md"
              />
            </div>
          </TableCell> */}
                            <TableCell className="font-medium text-center">{data.address}</TableCell>
                            <TableCell className="font-medium text-center">{data.paymentType}</TableCell>
                            <TableCell className="font-medium text-center">{data.createdBy.username}</TableCell>
                            <TableCell className="font-medium text-xs truncate max-w-[200px]">
                                {String(data.note || "").slice(0, 60)}
                            </TableCell>
                            <TableCell className="font-medium text-center">{data.phone}</TableCell>
                            {/* <TableCell className="font-medium text-center">{data.status}</TableCell> */}
                            {/* <TableCell className="font-medium text-center"> */}
<TableCell className="font-medium text-center">
  <Select
    value={data.status || StateEnum.placed}
    onValueChange={async (value) => {
  if (value === StateEnum.onWay) await onWayByAmin(data.id);
  if (value === StateEnum.delivered) await onDeliveredByAmin(data.id);
  if (value === StateEnum.cancel) await handelCancelClick(data.id);
//   await refetch();
//   setOrderType(value);

}}

  >
    <SelectTrigger className="w-[150px] bg-transparent text-gold-dark border-gold-dark">
      <SelectValue placeholder="Select status" />
    </SelectTrigger>

    <SelectContent>
      <SelectItem value={StateEnum.placed}>Placed</SelectItem>
      <SelectItem value={StateEnum.onWay}>On Way</SelectItem>
      <SelectItem value={StateEnum.delivered}>Delivered</SelectItem>
      <SelectItem value={StateEnum.cancel}>Cancelled</SelectItem>
    </SelectContent>
  </Select>
</TableCell>



{/* </TableCell> */}

                            {/* <TableCell className="font-medium text-center flex items-center justify-center pt-3" ><Icons.MdCancel className="text-2xl text-gold-dark transition-all duration-300 ease-in-out hover:text-red-400" onClick={() => { handelCancelClick(data.id) }} /></TableCell> */}
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
  <Cancel open={open} onOpenChange={setOpen} orderId={selectedOrderId} />
)}

        {/* <PopupCommon
            open={open}
            onOpenChange={setOpen}
            text="Please register or log in to add items to your Cart or wish list"
            title="You must register"
        /> */}
    </>
}
