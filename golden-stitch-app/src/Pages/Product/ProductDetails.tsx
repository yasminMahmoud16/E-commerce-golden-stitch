import PagesWrapper from "@/common/PagesWrapper";
import { useParams } from "react-router-dom";
import cornerBottomRightHero from "@/assets/Images/cornerBottomRightHero.png"
import cornerBottomLeftHero from "@/assets/Images/cornerBottomLeftHero.png"

import secCornerRight from "@/assets/Images/secCornerRight.png"
import secCornerLeft from "@/assets/Images/secCornerLeft.png"

import { Icons } from "@/assets/Icons/icons";
import BtnCommon from "@/common/BtnCommon";
import { Input } from "@/Components/ui/input";
import {
    Carousel, CarouselContent, CarouselItem, CarouselNext,
    CarouselPrevious
} from "@/Components/ui/carousel";
import { useState } from "react";
import { useCartContext, useProductContext, useProfileContext } from "@/Hooks/useAppContexts";
import { useQuery } from "@tanstack/react-query";
import type { IProduct } from "@/Utilities/interfaces";
export default function ProductDetails() {
    const { getProductById } = useProductContext()
    const [parentImage, setParentImage] = useState<string | null>(null);
    const {  addToCart } = useCartContext();
    const { addToWishList  } = useProfileContext();

    
    const { id } = useParams();
    console.log(id);



    const { data: product } = useQuery<IProduct>({
        queryKey: ['product', id],
        queryFn: () => getProductById(id!),
        enabled: !!id, 
    });
    console.log({product});
    


    const handleGallery = (img:string) => {
        setParentImage(img)
    }

    return <>

        <PagesWrapper>
            <section className="relative min-h-screen">
                {/* Top corners */}
                <img src={secCornerRight} alt="secCornerRight" className="absolute right-2 top-0 z-0" />
                <img src={secCornerLeft} alt="secCornerLeft" className="absolute left-0 top-0 z-0" />


                <div className="container">

                    <div className="grid grid-cols-1 md:grid-cols-6 items-center md:items-start justify-center pt-10 md:gap-4 relative z-10">
                        <div className="col-span-2 mb-6 md:mb-0 ">
                            <div>
                                <img src={`/${parentImage || product?.images?.[0]}`} alt="" />

                            </div>
                            <div>
                                <Carousel className=" relative">
                                    <CarouselPrevious className="cursor-pointer absolute left-1 z-10" />
                                    <CarouselContent className="-ml-4 flex mt-3">
                                        {product?.images?.map((img, index) => (
                                            <CarouselItem
                                                key={index}
                                                className="pl-4 basis-1/3 shrink-0"
                                                onClick={() => handleGallery(img)}
                                            >
                                                <div className="relative group cursor-pointer ">
                                                    <img
                                                        src={`/${img}`}
                                                        alt={`thumbnail-${index}`}
                                                        className="w-full h-28 md:h-20 object-cover rounded-md overflow-hidden"

                                                    />
                                                    {/* Overlay */}
                                                    <div className="absolute inset-0 bg-black/30 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                </div>
                                            </CarouselItem>
                                        ))}



                                    </CarouselContent>
                                    <CarouselNext className="cursor-pointer absolute right-1 z-10" />
                                </Carousel>


                            </div>
                        </div>
                        <div className="col-span-4  ">
                            <div className="flex flex-col justify-center gap-3 mt-3  h-72">

                                <h2 className="text-3xl font-semibold text-dark-blue-nav">{product?.name}</h2>
                                <p> {product?.category?.name}</p>
                                <p> {product?.description}</p>
                                <div >
                                    <p className="text-4xl font-bold text-gold-dark mb-3">{product?.mainPrice} $</p>
                                    
                                </div>

                                <BtnCommon
                                    text={"add to cart"}
                                    className="rounded-md bg-dark-blue-nav"
                                    onClick={()=>{addToCart(product!.id,1)}}
                                />
                                <BtnCommon
                                    text={"add to wish List"}
                                    className="rounded-md bg-gold-dark"
                                    onClick={()=>{addToWishList(product!.id)}}
                                />
                            </div>
                        </div>

                    </div>


                    <div className=" flex flex-col items-center justify-center mt-15 pb-10">
                        <p>follow our page to know the latest trends </p>
                        <div className="relative w-55 md:w-80">
                            <Icons.CiSearch
                                className="absolute left-3 top-4 -translate-y-1/2 text-footer-items"
                                size={23}
                            />
                            <Input
                                type="text"
                                placeholder="search"
                                className="w-60 md:w-80 bg-white  py-3 px-2 pl-10 mb-2 placeholder:text-footer-items rounded-4xl"
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom corners */}
                <img src={cornerBottomRightHero} alt="cornerBottomRightHero" className="absolute top-110 right-0 z-0" />
                <img src={cornerBottomLeftHero} alt="cornerBottomLeftHero" className="absolute top-110 left-0 z-0" />
            </section>


            
        </PagesWrapper>

    </>
}
