import { useCategoryContext } from "@/Hooks/useAppContexts"
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
import AdminTitles from "@/common/AdminTitles";
import { Icons } from "@/assets/Icons/icons";
import { Input } from "@/Components/ui/input";
export default function ArchiveCategory() {


    const { archiveCategory, page, setPage, search, setSearch, restoreCategory, hardDelCategory } = useCategoryContext();
    const baseUrlImage = "https://www.goldenstitchleathers.com/api";


    // console.log({ archiveCategory });
    const Headers = [
        { id: 2, label: "image" },
        { id: 3, label: "Product Name" },
        { id: 6, label: "Customer Name" },
        { id: 8, label: "Description" },
        { id: 7, label: "Canceled At" },
        { id: 4, label: "Actions" },

    ];
    return <>


        <AdminTitles
            text="archive categories"
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
                className="w-60 md:w-80 border-footer-items py-3 px-2 pl-10 mb-2 text-white placeholder:text-footer-items rounded-4xl "
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
                                className="bg-gold-light w-md text-center text-gold-dark font-semibold whitespace-nowrap"
                            >
                                {header.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {archiveCategory?.docs?.map((data) => (
                        <TableRow
                            key={data.id}
                            className="cursor-pointer border-none rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-white/10 text-gray-400 capitalize"
                        >
                            <TableCell className="font-medium my-2 w-40 h-10">
                                <div className="flex justify-center items-center">
                                    <img
                                        src={`${baseUrlImage}/${data.image}`}
                                        alt="image"
                                        className="w-15 h-15 rounded-md"
                                    />
                                </div>
                            </TableCell>
                            <TableCell className="font-medium text-center">{data.name}</TableCell>
                            <TableCell className="font-medium text-center">{data.createdBy.username}</TableCell>
                            <TableCell className="font-medium text-xs truncate max-w-[200px]">
                                {String(data.description || "").slice(0, 60)}
                            </TableCell>
                            <TableCell className="font-medium text-center">{new Date(data.freezedAt).toLocaleString()}</TableCell>
                            <TableCell className="font-medium text-center flex gap-3 items-center justify-center mt-5" >
                                <Icons.MdOutlineRestore className="text-2xl text-[hsl(22,55%,44%)] transition-all duration-300 ease-in-out hover:text-green-400"
                                    onClick={() => { restoreCategory(data.id) }}
                                />
                                <Icons.FaTrash className="text-lg text-red-800 shadow-2xl transition-all duration-300 ease-in-out hover:text-red-400"
                                    onClick={() => { hardDelCategory(data.id) }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>





        {(archiveCategory?.docs?.length ?? 0) > 0 && (
            <Pagination className="my-4">
                <PaginationContent>
                    {page > 1 && (
                        <PaginationItem>
                            <PaginationPrevious
                                className="cursor-pointer transition-all ease-in-out duration-300 text-gold-dark hover:bg-transparent hover:text-gold"
                                onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : 1))}
                            />
                        </PaginationItem>
                    )}

                    <PaginationItem>
                        <PaginationLink isActive className="cursor-pointer rounded-full">
                            {page}
                        </PaginationLink>
                    </PaginationItem>

                    {page < (archiveCategory?.pages || 1) && (
                        <PaginationItem>
                            <PaginationNext
                                className="cursor-pointer transition-all ease-in-out duration-300 text-gold-dark hover:bg-transparent hover:text-gold"
                                onClick={() =>
                                    setPage((prev) =>
                                        prev < (archiveCategory?.pages || 1) ? prev + 1 : prev
                                    )
                                }
                            />
                        </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>
        )}


    </>
}
