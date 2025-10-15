
import {
    Table,
    TableBody,
    TableCaption,
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
import { useLocation } from "react-router-dom";
import { Icons } from "@/assets/Icons/icons";
import AdminTitles from "@/common/AdminTitles";
import { useState } from "react";
import BtnCommon from "@/common/BtnCommon";
import { Input } from "@/Components/ui/input";
import { SpinnerCustomData } from "@/Loading/SpinnerCustomData";
import CategoryDetails from "@/Components/Categories/CategoryDetails";
import CategoryEdit from "@/Components/Categories/CategoryEdit";
import AddCategory from "@/Components/Categories/AddCategory";
import { useCategoryContext } from "@/Hooks/useAppContexts";
import type { ICategory } from "@/Utilities/interfaces";

export default function AdminCategory() {

    const { allCategoriesData, isLoading, page, setPage, search, setSearch, getCategoryById } = useCategoryContext()
    const [openAdd, setOpenAdd] = useState<boolean>(false);

    const [selectedCategory, setSelectedCategory] = useState<ICategory>();
    const [openDetails, setOpenDetails] = useState<boolean>(false);
const [, setSelectedData] = useState<string | null>(null);

    const [isEditing, setIsEditing] = useState(false);
    // const [ setSelectedData] = useState<string>("");
    const filteredCategory = allCategoriesData?.filter((category) => {
        const term = (search || "").toLowerCase();
        return (
            category.name.toLowerCase().includes(term)
        );
    });



    const catHeaders = [
        { id: 2, label: "Image" },
        { id: 3, label: "Category Name" },
        { id: 4, label: "Number of sale" },
        { id: 5, label: "Created By" },
        { id: 7, label: "Description" },
    ];


    const location = useLocation();
    const currentLocation = location.pathname
    const showAddBtn = currentLocation.includes("/admin/products") || currentLocation.includes("/admin/category")




    const handleAddClick = async () => {
        setOpenAdd(true);
    };

    const handleDetailsClick = async (id: string) => {
        const category = await getCategoryById(id);
        console.log("Fetched category:", category);
        setSelectedCategory(category);
        setOpenDetails(true);
    };




    return (
        <>
            <AdminTitles text="Category Management" icon={Icons.BiSolidCategoryAlt} />



            {openAdd ? (
                <AddCategory
                    onBack={() => setOpenAdd(false)} 
                />
            ) : openDetails && selectedCategory ? (
                isEditing ? (
                    <CategoryEdit
                        category={selectedCategory}
                        onBack={() => setIsEditing(false)}
                    />
                ) : (
                    <CategoryDetails
                        category={selectedCategory}
                        onBack={() => setOpenDetails(false)}
                        onEdit={(cat:ICategory) => {
                            setSelectedCategory(cat);
                            setIsEditing(true);

                        }} onDeleteSuccess={() => {
                            setOpenDetails(false);
                            setSelectedData(null);
                            //   close all tabs when deleted 
                        }}
                    />
                )
            ) : (
                <>
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
                                {catHeaders.map((header) => (
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
                            {filteredCategory?.map((data) => (
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
                                    <TableCell className="font-medium text-xs">
                                        {/* {data.description.slice(0, 60)} */}
                                          {String(data.description || "").slice(0, 60)}

                                    </TableCell>
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
                </>
            )}
        </>
    );
}
