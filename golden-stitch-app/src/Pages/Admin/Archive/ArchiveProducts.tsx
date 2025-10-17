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
    // const { getCategories} = useCategoryContext();
  





// const { data: catSize } = useQuery({
//     queryKey: ["allCategories"],
//     queryFn: () => getCategories({ size:50}),
// });

    console.log({ archiveProducts });
    const productsHeaders = [
        { id: 2, label: "image" },
        { id: 3, label: "Product Name" },
        { id: 4, label: "Price" },
        { id: 6, label: "Customer Name" },
        { id: 8, label: "Description" },
        { id: 7, label: "Canceled At" },
        { id: 7, label: "Category" },
        { id: 7, label: "Restore" },

    ];

    // handl
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
        
        {/* CATEGORY FILTER BUTTONS */}
{/* <div className="flex flex-wrap gap-3 justify-center my-3">
  <button
    onClick={() => setCategoryId("")} 
    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
      categoryId === ""
        ? "bg-gold text-white"
        : "bg-transparent border border-gold text-gold hover:bg-gold-dark hover:text-white"
    }`}
  >
    All
  </button>

  {catSize?.map((cat) => (
    <button
      key={cat.id}
      onClick={() => setCategoryId(cat.id)}
      className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-300 ${
        categoryId === cat.id
          ? "bg-gold text-white"
          : "bg-transparent border border-gold text-gold hover:bg-gold-dark hover:text-white"
      }`}
    >
      {cat.name}
    </button>
  ))}
</div> */}
        </div>
<div className="w-full overflow-x-auto scrollbar-hide">
  <Table className="min-w-full">
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
      {archiveProducts?.map((data) => (
        <TableRow
          key={data.id}
          className="cursor-pointer border-none rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-white/10 text-gray-400 capitalize"
        >
          <TableCell className="font-medium my-2 w-40 h-10 ">
            <div className="flex justify-center items-center">
              <img
                src={`/${data.images}`}
                alt="image"
                className="w-15 h-15 rounded-md"
              />
            </div>
          </TableCell>
          <TableCell className="font-medium text-center">{data.name}</TableCell>
          <TableCell className="font-medium text-center">{data.mainPrice}</TableCell>
          <TableCell className="font-medium text-center">{data.createdBy.username}</TableCell>
          <TableCell className="font-medium text-xs truncate max-w-[200px]">
            {String(data.description || "").slice(0, 60)}
          </TableCell>
          <TableCell className="font-medium text-center">{data.freezedAt}</TableCell>
                      <TableCell className="font-medium text-center">{data.category?.name}</TableCell>

          <TableCell className="font-medium text-center flex items-center justify-center mt-5" ><Icons.MdOutlineRestore className="text-2xl text-gold-dark transition-all duration-300 ease-in-out hover:text-green-400" onClick={()=>{restoreProduct(data.id)}}/></TableCell>
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
    </>
}
