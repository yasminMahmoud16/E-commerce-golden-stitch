import { Icons } from "@/assets/Icons/icons";
import AdminTitles from "@/common/AdminTitles";
import BtnCommon from "@/common/BtnCommon";
import AddProduct from "@/Components/Products/AddProduct";
import ProductDetails from "@/Components/Products/ProductDetails";
import ProductEdit from "@/Components/Products/ProductEdit";
import { Input } from "@/Components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table"; 
import { useProductContext } from "@/Hooks/useAppContexts";
import { SpinnerCustomData } from "@/Loading/SpinnerCustomData";
import type { IProduct } from "@/Utilities/interfaces";
import {  useState } from "react";
import { useLocation } from "react-router-dom";
export default function AdminProducts() {
  const [openDetails, setOpenDetails] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct |null>();
  const [isEditing, setIsEditing] = useState(false);
  const { allProductsData, isLoading, page, setPage, search, setSearch, getProductById,isUpdating } = useProductContext();


  const location = useLocation();
  const currentLocation = location.pathname
  const showAddBtn = currentLocation.includes("/admin/products") || currentLocation.includes("/admin/category")
  const productHeaders = [
    { id: 2, label: "image" },
    { id: 3, label: "Product Name" },
    { id: 4, label: "Price" },
    { id: 6, label: "Customer Name" },
    { id: 5, label: "Stock" },
    { id: 7, label: "Category Name" },
    { id: 8, label: "Description" },

  ];

  const filteredProducts = allProductsData?.filter((product) => {
    const term = (search || "").toLowerCase();
    return (
      product.name.toLowerCase().includes(term) ||
      String(product.mainPrice).includes(term)
    );
  });


  const handleDetailsClick = async (id: string) => {
    const product = await getProductById(id);
    console.log("Fetched product:", product);
    setSelectedProduct(product);
    setOpenDetails(true);
  };
  const handleAddClick = async () => {
    setOpenAdd(true);
  };

  if (isUpdating ) {
    return <>
        <SpinnerCustomData /> 
    </>
    
  }

  return <>



    <AdminTitles
      text="products Management"
      icon={Icons.FaBoxesStacked}
    />




{openAdd ? (
  <AddProduct
    onBack={() => setOpenAdd(false)} 
  />
) : openDetails && selectedProduct ? (
  isEditing ? (
    <ProductEdit
      product={selectedProduct}
      onBack={() => setIsEditing(false)}
    />
  ) : (
    <ProductDetails
      product={selectedProduct}
      onBack={() => setOpenDetails(false)}
      onEdit={(cat:IProduct) => {
    setSelectedProduct(cat); 
        setIsEditing(true);
        
  }} onDeleteSuccess={() => {
    setOpenDetails(false); 
    setSelectedProduct(null); 
  }}
    />
  )
) : (
          <>
            <div>
{isUpdating && (
    <div className="absolute inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm z-50">
      <SpinnerCustomData />
    </div>
  )}
    <div className="w-full mb-2 flex flex-col md:flex-row items-center justify-between">
      <div className="flex justify-end mr-8 py-4">
        {showAddBtn && (
          <BtnCommon
            text={"add"}
            onClick={handleAddClick}
            className="rounded-xl shadow w-30 transition-all duration-700 ease-in-out hover:from-gold-dark hover:to-[55%]"
            icon={Icons.AiOutlinePlusCircle}
          />
        )}
      </div>

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
    </div>

    <Table>
      <TableHeader>
        <TableRow>
          {productHeaders.map((header) => (
            <TableHead
              className="bg-gold-light w-md text-center text-gold-dark font-semibold mr-8"
              key={header.id}
            >
              {header.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableCaption>{isLoading && <SpinnerCustomData />}</TableCaption>

      <TableBody>
        {filteredProducts?.map((data) => (
          <TableRow
            onClick={() => handleDetailsClick(data.id)}
            key={data.id}
            className="cursor-pointer border-none rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-white/10 text-gray-400 capitalize"
          >
            <TableCell className="font-medium my-2 w-80 h-20">
              <div className="flex justify-center items-center">
                <img
                  src={`/${data.images[0]}`}
                  alt="image"
                  className="w-15 h-15 rounded-md"
                />
              </div>
            </TableCell>
            <TableCell className="font-medium text-center">{data.name}</TableCell>
            <TableCell className="font-medium text-center">{data.stock}</TableCell>
            <TableCell className="font-medium text-center">{data.createdBy.username}</TableCell>
            <TableCell className="font-medium text-center">{data.mainPrice}</TableCell>
            <TableCell className="font-medium text-center">{data.category?.name}</TableCell>
            <TableCell className="font-medium text-xs">{data.description.slice(0, 60)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    <Pagination>
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
            </div>
  </>
)}





  </>
}
