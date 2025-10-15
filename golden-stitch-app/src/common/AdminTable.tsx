import { Icons } from "@/assets/Icons/icons";
import { Button } from "@/Components/ui/button";
import {
    SelectItem,
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import useDashboardAdmin from "@/Hooks/useDashboardAdmin";
import useGlobal from "@/Hooks/useGlobal";
import { SpinnerCustomData } from "@/Loading/SpinnerCustomData";

export type TableProps = {
    headers: { id: number; label: string }[];
    data: Array<Record<string, string>>
    onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
    isLoading:boolean
};

export default function AdminTable({ headers, data, onEdit, onDelete }: TableProps) {

    const {isLoading}= useDashboardAdmin()
    const {location} = useGlobal();
    const currentPath = location.pathname;
    const showActions =
        currentPath.includes("/admin/users");


    return (

        <div className=" flex flex-col ">

        <Table  className="">
            <TableHeader>
                <TableRow>
                    {headers.map((header) => (
                        <TableHead
                            className="bg-gold-light w-full text-center text-gold-dark font-semibold"
                            key={header.id}
                        >
                            {header.label}
                        </TableHead>
                    ))}



                    {showActions && (
                        <TableHead className="bg-gold-light w-full text-center text-gold-dark font-semibold">
                            Actions
                        </TableHead>
                    )}
                </TableRow>
            </TableHeader>
{isLoading ? (
  <TableCaption>
    <SpinnerCustomData /> 
  </TableCaption>
) : data && data.length > 0 ? (
  <TableBody className="text-[#a1a1a1]">
    {data.map((dataItem) => (
      <TableRow
        key={dataItem.id}
        className="border-none rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.0] hover:bg-white/10"
      >
        <TableCell className="font-medium my-2 text-center capitalize">
          {dataItem.firstName}
        </TableCell>
        <TableCell className="font-medium px-6 py-3 my-2 text-center">
          {dataItem.email}
        </TableCell>
        <TableCell className="font-medium px-6 py-3 my-2 text-center">
          {dataItem.phone}
        </TableCell>

        {headers.some((h) => h.label === "Order Status") ? (
          <TableCell className="font-medium my-2">
            <Select defaultValue={dataItem.label4}>
              <SelectTrigger className="w-[180px] bg-white text-gray-700">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Delivering">Delivering</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </TableCell>
        ) : (
          <TableCell className="font-medium my-2 text-center capitalize">
            {dataItem.gender}
          </TableCell>
        )}

        {showActions && (
          <TableCell>
            <div className="flex gap-2">
              <Button
                className="bg-transparent hover:bg-transparent hover:cursor-pointer group"
                size="sm"
                onClick={() => onEdit?.(dataItem.id)}
              >
                <Icons.FaEdit className="text-gray-300 transition-all duration-300 ease-in-out group-hover:text-gold-dark" />
              </Button>
              <Button
                className="bg-transparent hover:bg-transparent group cursor-pointer"
                size="sm"
                onClick={() => onDelete?.(dataItem.id)}
              >
                <Icons.FaTrash className="text-red-700 transition-all duration-300 ease-in-out group-hover:text-red-500" />
              </Button>
            </div>
          </TableCell>
        )}
      </TableRow>
    ))}
  </TableBody>
) : (
  <TableCaption>No data</TableCaption>
)}



            
        </Table>
        </div>
    );
}
