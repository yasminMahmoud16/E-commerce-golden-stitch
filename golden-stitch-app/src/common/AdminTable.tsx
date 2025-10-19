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
import { useProfileContext } from "@/Hooks/useAppContexts";
import useDashboardAdmin from "@/Hooks/useDashboardAdmin";
import useGlobal from "@/Hooks/useGlobal";
import { SpinnerCustomData } from "@/Loading/SpinnerCustomData";
import type { IUserData } from "@/Utilities/interfaces";
import { RoleEnum } from "@/Utilities/types";

export type TableProps = {
  headers: { id: number; label: string }[];
  // data: Array<Record<string, string>>
  data: IUserData[]
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  isLoading?: boolean
};

export default function AdminTable({ headers, data, onEdit, onDelete }: TableProps) {

  const { isLoading } = useDashboardAdmin()
  const { location } = useGlobal();
  const {restoreUsers, profile} = useProfileContext()
  const currentPath = location.pathname;
  const showActions =
    currentPath.includes("/admin/users");


  const handleRestoreAccount = async(id:string) => {
  await restoreUsers(id)
}
  return (

    <div className=" flex flex-col  overflow-x-auto scrollbar-hide w-full">

      <Table className="overflow-x-hidden scrollbar-hide">
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
                <TableCell className="font-medium my-1 text-center capitalize">
                  {dataItem.firstName}
                </TableCell>
                <TableCell className="font-medium px-2 py-3 my-1 text-center capitalize">
                  {dataItem.email}
                </TableCell>

                <TableCell className="font-medium px-2 py-3 my-1 text-center">
                  {dataItem.phone}
                </TableCell>
                <TableCell className="font-medium px-2 py-3 my-1 text-center capitalize">
                  {dataItem.role}
                </TableCell>
                <TableCell className="font-medium text-xs px-2 py-3 my-1 text-center">
                  {dataItem.freezedAt
                    ? new Date(dataItem.freezedAt).toLocaleString()
                    : "Active"}
                </TableCell>


                {headers.some((h) => h.label === "Order Status") ? (
                  <TableCell className="font-medium my-1">
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
                  <TableCell className="font-medium my-1 text-center capitalize">
                    {dataItem.gender}
                  </TableCell>
                )}

                {showActions && (
                  <TableCell>
                    <div className="flex items-center gap-2">


                      
                      {profile?.role === RoleEnum.superAdmin ? (
  <>
    {/* زر التعديل */}
    <Button
      className="bg-transparent hover:bg-transparent hover:cursor-pointer group"
      size="sm"
      onClick={() => onEdit?.(dataItem.id)}
    >
      <Icons.FaEdit className="text-gray-300 transition-all duration-300 ease-in-out group-hover:text-gold-dark" />
    </Button>

    {/* لو الحساب متجمد => زر استرجاع، غير كده => زر مسح */}
    {dataItem.freezedAt ? (
      <Button
        className="bg-transparent hover:bg-transparent group cursor-pointer"
        size="sm"
        onClick={() => handleRestoreAccount(dataItem.id)}
      >
        <Icons.MdOutlineRestore className="text-lg text-[hsl(22,55%,44%)] transition-all duration-300 ease-in-out group-hover:text-green-500" />
      </Button>
    ) : (
      <Button
        className="bg-transparent hover:bg-transparent group cursor-pointer"
        size="sm"
        onClick={() => onDelete?.(dataItem.id)}
      >
        <Icons.FaTrash className="text-[hsl(22,55%,44%)]  transition-all duration-300 ease-in-out group-hover:text-red-500" />
      </Button>
    )}
  </>
) : (
  <>
    <Button
      className="bg-transparent hover:bg-transparent hover:cursor-pointer group"
      size="sm"
      onClick={() => onEdit?.(dataItem.id)}
    >
      <Icons.FaEdit className="text-gray-300 transition-all duration-300 ease-in-out group-hover:text-gold-dark" />
    </Button>

    {dataItem.freezedAt ? (
      <Button
        className="bg-transparent hover:bg-transparent group cursor-pointer"
        size="sm"
        onClick={() => handleRestoreAccount(dataItem.id)}
      >
        <Icons.MdOutlineRestore className="text-lg text-[hsl(22,55%,44%)] transition-all duration-300 ease-in-out group-hover:text-green-500" />
      </Button>
    ) : (
      <Button
        className="bg-transparent hover:bg-transparent group cursor-pointer"
        size="sm"
        onClick={() => onDelete?.(dataItem.id)}
      >
        <Icons.FaTrash className="text-[hsl(22,55%,44%)]  transition-all duration-300 ease-in-out group-hover:text-red-500" />
      </Button>
    )}
  </>
)}



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
