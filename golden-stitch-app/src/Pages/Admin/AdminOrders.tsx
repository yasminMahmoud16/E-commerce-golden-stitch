import { Icons } from "@/assets/Icons/icons";
// import AdminTable from "@/common/AdminTable";
import AdminTitles from "@/common/AdminTitles";
// import { useOrderContext } from "@/Hooks/useAppContexts";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { SpinnerCustomData } from "@/Loading/SpinnerCustomData";
import { useState } from "react";
    const orderHeaders = [
        { id: 1, label: "ID" },
        { id: 2, label: "Order Name" },
        { id: 3, label: "Shipped Address" },
        { id: 4, label: "Customer Name" },
        { id: 5, label: "Order Status" },
    ];
const orderData = [
  {
    id: 1,
    label1: "Wireless Headphones",
    label2: "123 Nile St, Cairo, Egypt",
    label3: "Yasmeen Ahmed",
    label4: "Delivered",
  },
  {
    id: 2,
    label1: "Smart Watch",
    label2: "45 Tahrir Sq, Giza, Egypt",
    label3: "Omar Ali",
    label4: "New",
  },
  {
    id: 3,
    label1: "Laptop Bag",
    label2: "22 El-Maadi Rd, Cairo, Egypt",
    label3: "Sara Hassan",
    label4: "Delivering",
  },
  {
    id: 4,
    label1: "Gaming Keyboard",
    label2: "10 Alexandria St, Mansoura, Egypt",
    label3: "Mohamed Tarek",
    label4: "New",
  },
];

export default function AdminOrders() {
  // const { allOrders, isLoading, page, setPage, search, setSearch, getOrderById } = useOrderContext();
  const [selectedOrder, setSelectedOrder] = useState<string>("");
    const [openDetails, setOpenDetails] = useState<boolean>(false);
  
  
  
  
  
  
      const handleDetailsClick = async (id: number) => {
        const order = await getOrderById(id);
        console.log("Fetched order:", order);
        setSelectedOrder(order);
        setOpenDetails(true);
    };
  return <>
      <AdminTitles
        text="orders Management"
        icon={Icons.BsBoxSeamFill}
      />
                {/* <AdminTable headers={orderHeaders} data={orderData}/> */}
                            <Table>
                        <TableHeader>
                            <TableRow>
                                {orderData.map((header) => (
                                    <TableHead
                                        className="bg-gold-light w-md text-center text-gold-dark font-semibold mr-8"
                                        key={header.id}
                                    >
                                        {header.label}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>

                        {/* <TableCaption>{isLoading && <SpinnerCustomData />}</TableCaption> */}

                        <TableBody>
                            {/* {allOrders?.map((data) => (
                                <TableRow
                                    onClick={() => handleDetailsClick(data.id)}
                                    key={data.id}
                                    className="cursor-pointer border-none rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-white/10 text-gray-400 capitalize"
                                >
                                    <TableCell className="font-medium my-2 w-80 h-20">
                                        <div className="flex justify-center items-center">
                                            <img
                                                src={`/${data.image}`}
                                                alt="image"
                                                className="w-15 h-15 rounded-md"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium text-center">{data.name}</TableCell>
                                    <TableCell className="font-medium text-center">{data.numberOfSale}</TableCell>
                                    <TableCell className="font-medium text-center">{data.createdBy.username}</TableCell>
                                    <TableCell className="font-medium text-xs">{data.description.slice(0, 60)}</TableCell>
                                </TableRow>
                            ))} */}
                        </TableBody>
                    </Table>
    </>
}
