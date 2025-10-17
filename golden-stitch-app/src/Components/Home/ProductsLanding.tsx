import CardCommon from "@/common/CardCommon";
import LayoutMotion from "@/common/LayoutMotion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PopupCommon from "@/common/PopupCommon";
import noAdd from "@/assets/Images/noAdd.png";
import { useAuthContext, useCartContext, useCategoryContext, useProductContext, useProfileContext } from "@/Hooks/useAppContexts";
import { useQuery } from "@tanstack/react-query";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";
import { SpinnerCustomData } from "@/Loading/SpinnerCustomData";
import { Icons } from "@/assets/Icons/icons";
import { Input } from "../ui/input";
import type { IProduct } from "@/Utilities/interfaces";
import { useAxios } from "@/Hooks/useAxios";

export default function ProductsLanding() {
    const axiosInstance = useAxios();
    const { getProductById, page, setPage, search, setSearch, allProductsData, categoryId, setCategoryId, isLoading } = useProductContext();
    //   const { allProductsData, categoryId,setCategoryId, isLoading, page, setPage, search, setSearch, getProductById, isUpdating } = useProductContext();
    const { addToCart } = useCartContext();
    const { addToWishList } = useProfileContext();
    const { getCategories } = useCategoryContext();

    const [open, setOpen] = useState(false);
    const { token } = useAuthContext()
    const navigate = useNavigate();



    const { data: catSize } = useQuery({
        queryKey: ["allCategories"],
        queryFn: () => getCategories({ size: 50 }),
    });




    const { data: products } = useQuery({
        queryKey: ["landingProducts", page],
        queryFn: async () => {
            const res = await axiosInstance.get(`/product?page=${page}&size=10`);
            // console.log("response dataproooooooooooooo =>", res.data.data);
            return res.data.data.products;
        },
        // keepPreviousData: true,
        // placeholderData: keepPreviousData,

    });

    const filteredProducts = allProductsData?.filter((product: IProduct) => {
        const term = (search || "").toLowerCase();
        return (
            product.name.toLowerCase().includes(term) ||
            String(product.mainPrice).includes(term)
        );
    });

    const handleOnClickProductDetails = async (id: string) => {
        await getProductById(id);
        navigate(`/product-details/${id}`);
    };

    const handleOnClickCart = async (id: string, quantity: number) => {
        await addToCart(id, quantity)
    };

    const handleOnClickWishList = async (id: string) => {
        if (!token) setOpen(true);
        await addToWishList(id)
    };

    return (
        <section id="ProductsLanding">
            <div className="container">
                <LayoutMotion>





                    <div className=" text-dark-blue-nav">
                        <h1 className="mb-4 text-center mt-6 text-3xl font-semibold text-dark-blue-2 capitalize">
                        products & categories 
                    </h1>
                        <div className="flex items-center justify-center flex-wrap gap-2  ">
                            <button
                                onClick={() => setCategoryId("")}
                                className={`w-20 h-20 rounded-full text-sm font-semibold transition-all duration-300 ${categoryId === ""
                                    ? "bg-gold text-white shadow-lg"
                                    : "bg-dark-blue-2 border border-gold text-gold hover:bg-gold-dark hover:text-white"
                                    }`}
                            >
                                All
                            </button>

                            {catSize?.map((cat) => <>

                                <div
                                    key={cat.id}
                                    onClick={() => setCategoryId(cat.id)}
                                    className={`flex flex-col items-center justify-center mx-6 mt-3 rounded-full text-sm font-semibold capitalize  transition-all  duration-300 ease-in-out  hover:-translate-y-2 ${categoryId === cat.id
                                        ? ""
                                        : " "
                                        }`}
                                >

                                    <img src={`/${cat.image}`} alt="" className="w-20 h-20 rounded-full overflow-hidden cursor-pointer shadow-2xl " />
                                    <p className="text-center">{cat.name}</p>
                                </div>
                            </>)}
                        </div>

                        {/* <div className="w-30 h-30 rounded-full">
                        <img src="" alt="" />
                        
                    </div> */}
                    </div>
                    {/* <h1 className="mb-4 text-center mt-6 text-3xl font-semibold text-dark-blue-2 capitalize">
                        our products
                    </h1> */}

                    <div className=" relative mb-2 mt-8   items-center justify-center  flex flex-col ">

                        <Input
                            type="text"
                            placeholder="search"
                            className=" w-60 md:w-80 border-dark-blue-1 py-3 px-2 pl-10 mb-2 text-dark-blue-nav placeholder:text-gray-500 rounded-4xl ring-bg-gold-dark shadow"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Icons.CiSearch
                            className="absolute  right-186 top-4 -translate-y-1/2 text-gray-500"
                            size={23}
                        />
                        {/* <div className="flex flex-wrap gap-3 justify-center my-3">
                            <button
                                onClick={() => setCategoryId("")}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${categoryId === ""
                                        ? "bg-gold text-white shadow-lg"
                                        : "bg-dark-blue-2 border border-gold text-gold hover:bg-gold-dark hover:text-white"
                                    }`}
                            >
                                All
                            </button>

                            {catSize?.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setCategoryId(cat.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-300 ${categoryId === cat.id
                                            ? "bg-gold text-white shadow-lg"
                                            : "bg-dark-blue-2 border border-gold text-gold hover:bg-gold-dark hover:text-white"
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div> */}
                    </div>
                    <div className="flex   items-center justify-center flex-wrap gap-4 pb-4">
                        {isLoading ? (
                            <SpinnerCustomData />
                        ) : (
                            filteredProducts?.map((product: IProduct) => (
                                <CardCommon
                                    key={product.id}
                                    image={`/${product.images?.[0]}`}
                                    title={product.name}
                                    description={product.description}
                                    price={product.mainPrice}
                                    onClickCard={() => handleOnClickProductDetails(product.id)}
                                    onClickCart={() => handleOnClickCart(product.id, 1)}
                                    onClickWishList={() => handleOnClickWishList(product.id)}
                                />
                            ))
                        )}
                    </div>

                    <Pagination className="mb-4">
                        <PaginationContent>

                            {/* إخفاء previous في أول صفحة */}
                            {page > 1 && (
                                <PaginationItem>
                                    <PaginationPrevious
                                        className="cursor-pointer transition-all ease-in-out duration-300 text-gold-dark hover:bg-transparent hover:text-dark-blue-2"
                                        onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : 1))}
                                    />
                                </PaginationItem>
                            )}

                            <PaginationItem>
                                <PaginationLink isActive className="cursor-pointer rounded-full">
                                    {page}
                                </PaginationLink>
                            </PaginationItem>

                            {/* إخفاء next في آخر صفحة */}
                            {page < products?.pages && (
                                <PaginationItem>
                                    <PaginationNext
                                        className="cursor-pointer transition-all ease-in-out duration-300 text-gold-dark hover:bg-transparent hover:text-dark-blue-2"
                                        onClick={() =>
                                            setPage((prev) =>
                                                prev < products.pages ? prev + 1 : prev
                                            )
                                        }
                                    />
                                </PaginationItem>
                            )}

                        </PaginationContent>
                    </Pagination>


                </LayoutMotion>
            </div>

            <PopupCommon
                open={open}
                onOpenChange={setOpen}
                text="Please register or log in to add items to your Cart or wish list"
                title="You must register"
                image={noAdd}
            />
        </section>
    );
}
