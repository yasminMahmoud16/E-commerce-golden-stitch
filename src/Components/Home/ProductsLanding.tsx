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

export default function ProductsLanding() {
    const { getProductById, page, setPage, search, setSearch, getProducts, categoryId, setCategoryId, isLoading } = useProductContext();
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

    // console.log("catSize", catSize);




    const { data: products } = useQuery({
        queryKey: ["landingProducts", page, categoryId, search],
        queryFn: () =>
            getProducts({
                page,
                size: 10,
                search,
                categoryId,
            }),
    });
    // console.log({ products });

    // const { data: products } = useQuery({
    //     queryKey: ["landingProducts", page],
    //     queryFn: async () => {
    //         const res = await axiosInstance.get(`/product?page=${page}&size=10`);
    //         // console.log("response dataproooooooooooooo =>", res.data.data);
    //         console.log("allProductsData", res.data.data);
    //         // const pagination =res.data.data
    //         return res.data.data.products;
    //     },

    // });


    const filteredProducts = products?.docs?.filter((product: IProduct) => {
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


                    </div>


                    <div className="relative mb-2 mt-8 flex flex-col items-center justify-center">
  <div className="relative w-60 md:w-80">
    <Input
      type="text"
      placeholder="search"
      className="w-full border-dark-blue-1 py-3 pl-10 pr-3 text-dark-blue-nav placeholder:text-gray-500 rounded-4xl ring-bg-gold-dark shadow"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <Icons.CiSearch
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      size={23}
    />
  </div>

  <div className="flex flex-wrap gap-3 justify-center my-3">
    <button
      onClick={() => setCategoryId("")}
      className={`cursor-pointer px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
        categoryId === ""
          ? "bg-gold text-white shadow-lg"
          : "bg-dark-blue-2 border border-gold text-gold hover:bg-gold-dark hover:text-white"
      }`}
    >
      All
    </button>

    {catSize?.docs?.map((cat) => (
      <button
        key={cat.id}
        onClick={() => setCategoryId(cat.id)}
        className={`cursor-pointer px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-300 ${
          categoryId === cat.id
            ? "bg-gold text-white shadow-lg"
            : "bg-dark-blue-2 border border-gold text-gold hover:bg-gold-dark hover:text-white"
        }`}
      >
        {cat.name}
      </button>
    ))}
  </div>
</div>

                    <div className="flex   items-center justify-center flex-wrap gap-4 pb-4">
                        <div className="flex flex-wrap justify-center gap-4 pb-4 items-center">
                            {isLoading ? (
                                <SpinnerCustomData />
                            ) : filteredProducts?.length === 0 ? (
                                <div className="text-center text-dark-blue-2 font-semibold text-lg mt-10">
                                    No products found for this category
                                </div>
                            ) : (
                                filteredProducts?.map((product: IProduct) => (
                                    <CardCommon
                                        key={product.id}
                                        image={`/${product.images?.[0]}`}
                                        title={product.name}
                                        description={product.description}
                                        mainPrice={product.mainPrice}
                                        discount={product.discountPercent}
                                        price={product.salePrice}
                                        onClickCard={() => handleOnClickProductDetails(product.id)}
                                        onClickCart={() => handleOnClickCart(product.id, 1)}
                                        onClickWishList={() => handleOnClickWishList(product.id)}
                                    />
                                ))
                            )}
                        </div>

                    </div>

                    {filteredProducts && filteredProducts.length > 0 && (
                        <Pagination className="mb-4">
                            <PaginationContent>
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

                                {page < (products?.pages || 1) && (
                                    <PaginationItem>
                                        <PaginationNext
                                            className="cursor-pointer transition-all ease-in-out duration-300 text-gold-dark hover:bg-transparent hover:text-dark-blue-2"
                                            onClick={() =>
                                                setPage((prev) =>
                                                    prev < (products?.pages || 1) ? prev + 1 : prev
                                                )
                                            }
                                        />
                                    </PaginationItem>
                                )}
                            </PaginationContent>
                        </Pagination>
                    )}



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
