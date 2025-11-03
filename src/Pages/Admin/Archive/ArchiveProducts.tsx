import {  useProductContext } from "@/Hooks/useAppContexts"
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
// import { useQuery } from "@tanstack/react-query";
export default function ArchiveProducts() {


  const { archiveProducts, page, setPage, search, setSearch, restoreProduct } = useProductContext();
  const baseUrlImage = "https://www.goldenstitchleathers.com/api";

    // const { getCategories} = useCategoryContext();
  






    // console.log({ archiveProducts });
    const productsHeaders = [
        { id: 2, label: "image" },
        { id: 3, label: "Product Name" },
        { id: 4, label: "Price" },
        { id: 10, label: "Stock" },
        { id: 11, label: "Discount Percent" },
        { id: 12, label: "Sale Price" },
        { id: 6, label: "Created By" },
        { id: 6, label: "Colors" },
        { id: 8, label: "Description" },
        { id: 7, label: "Canceled At" },
        { id: 9, label: "Restore" },
        // { id: 7, label: "Category" },

    ];

  // const handleClickArchiveDetails = (id:string) => {
  //           navigate(`/admin/archive-products/product-details/${id}`); 

  // }
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
<div className="w-full overflow-x-hidden hide-scrollbar">
  <Table className="overflow-x-hidden scrollbar-hide">
    <TableHeader>
      <TableRow>
        {productsHeaders.map((header) => (
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
      {archiveProducts?.docs?.map((data) => (
        <TableRow
          // onClick={() => handleClickArchiveDetails(data.id)}

          key={data.id}
          className=" border-none rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-white/10 text-gray-400 capitalize"
        >
          <TableCell className="font-medium my-2 w-10 h-5 ">
            <div className="flex justify-center items-center">
              <img
                src={`${baseUrlImage}/${data.images}`}
                alt="image"
                className="w-10 h-10 rounded-md"
              />
            </div>
          </TableCell>
          <TableCell className="font-medium text-center">{data.name}</TableCell>
          <TableCell className="font-medium text-center">{data.mainPrice}</TableCell>
          <TableCell className="font-medium text-center">{data.stock}</TableCell>
          <TableCell className="font-medium text-center">{data.discountPercent || 0}</TableCell>
          <TableCell className="font-medium text-center">{data.salePrice}</TableCell>
          <TableCell className="font-medium text-center text-xs">{data.createdBy?.firstName}</TableCell>
          <TableCell className="font-medium text-sm text-center ">
            {data.colors && data.colors.length > 0 ? (
              <div className="flex items-center justify-center gap-2  ">
                {data.colors.slice(0, 3).map((color, index) => (
                  <span
                    key={index}
                    className="w-5 h-5 rounded-full border border-gray-300 shadow-sm inline-block"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}

                {data.colors.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{data.colors.length - 3}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-gray-500">—</span>
            )}
          </TableCell>

          <TableCell className="font-medium text-xs truncate max-w-[200px]">
            {String(data.description || "").slice(0, 60)}
          </TableCell>
          <TableCell className="font-medium text-center text-xs ">
            {new Date(data.freezedAt).toLocaleString([], { 
              // weekday: 'short',   
              day:"numeric",
              year: 'numeric',
                month:"short",
                hour: '2-digit', 
                minute: '2-digit', 
              hour12: false,
})}


          </TableCell>
                      {/* <TableCell className="font-medium text-center">{data.category?.name}</TableCell> */}

          <TableCell className="font-medium flex  items-center justify-center  text-center mt-2 " >
            <div>

            <Icons.MdOutlineRestore className="text-2xl  text-gold-dark transition-all duration-300 ease-in-out hover:text-green-400 hover:cursor-pointer" onClick={(e) => {
             e.stopPropagation();
            restoreProduct(data.id)
            }} />
            </div>
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

                                {page < (archiveProducts?.pages || 1) && (
                                    <PaginationItem>
                                        <PaginationNext
                                            className="cursor-pointer transition-all ease-in-out duration-300 text-gold-dark hover:bg-transparent hover:text-gold"
                                            onClick={() =>
                                                setPage((prev) =>
                                                    prev < (archiveProducts?.pages || 1) ? prev + 1 : prev
                                                )
                                            }
                                        />
                                    </PaginationItem>
                                )}
                            </PaginationContent>
                        </Pagination>
    </>
}
