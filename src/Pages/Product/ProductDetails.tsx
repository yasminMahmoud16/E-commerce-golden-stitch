import PagesWrapper from "@/common/PagesWrapper";
import { useParams } from "react-router-dom";
import cornerBottomRightHero from "@/assets/Images/cornerBottomRightHero.png"
import cornerBottomLeftHero from "@/assets/Images/cornerBottomLeftHero.png"

import secCornerRight from "@/assets/Images/secCornerRight.png"
import secCornerLeft from "@/assets/Images/secCornerLeft.png"

import BtnCommon from "@/common/BtnCommon";
import {
    Carousel, CarouselContent, CarouselItem, CarouselNext,
    CarouselPrevious
} from "@/Components/ui/carousel";
import { useEffect, useState } from "react";
import { useCartContext, useProductContext, useProfileContext } from "@/Hooks/useAppContexts";
import { useQuery } from "@tanstack/react-query";
import type { IProduct } from "@/Utilities/interfaces";
// import image from "@/assets/Images/card1.jpg"


export default function ProductDetails() {
    const { getProductById } = useProductContext()
    const [parentImage, setParentImage] = useState<string | null>(null);
    const { addToCart } = useCartContext();
    const { addToWishList } = useProfileContext();
    const baseUrlImage = "https://www.goldenstitchleathers.com/api";
    
    

    
    const { id } = useParams();
    // console.log(id);



    const { data: product } = useQuery<IProduct>({
        queryKey: ['product', id],
        queryFn: () => getProductById(id!),
        enabled: !!id,
    });
    const [selectedColor, setSelectedColor] = useState<string>("");

useEffect(() => {
  if (product?.colors && product.colors.length > 0) {
    setSelectedColor(product.colors[0]); 
  }
}, [product]);
    // console.log({product});
// const defaultColor = product?.colors?.[0]


    const handleGallery = (img: string) => {
        setParentImage(img)
    }

    return <>

        <PagesWrapper>
            <section className="relative min-h-screen mb-6">
                {/* Top corners */}
                <img src={secCornerRight} alt="secCornerRight" className="absolute right-2 top-0 z-0" />
                <img src={secCornerLeft} alt="secCornerLeft" className="absolute left-0 top-0" />


                <div className="container relative z-20">

                    <div className=" my-8 grid grid-cols-1 md:grid-cols-6 items-center md:items-start justify-center pt-10 md:gap-4 relative z-20">
                        <div className="col-span-2 mb-6 md:mb-0  flex flex-col items-center justify-center">
                            <div className="w-80  overflow-hidden ">
                                {/* <img src={`${baseUrlImage}/${parentImage || product?.images?.[0]}`} alt=" " className="w-full overflow-hidden object-cover" /> */}
                                <img
                                    src={`${baseUrlImage}/${parentImage || product?.images?.[0]}`} alt={product?.name || "product"}
                                    // src={image}
                                    className="w-full overflow-hidden   h-full object-fill 
                                                        transition-transform duration-500 ease-in-out
                                                        hover:scale-120" />

                            </div>
                            <div>
                                <Carousel className=" relative  w-80 p-5">
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
                                                        src={`${baseUrlImage}/${img}`}
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
                        <div className="col-span-4 capitalize  ">
                            <div className="flex flex-col justify-center gap-1 mt-3  h-72 capitalize">

                                <h2 className="text-3xl font-semibold text-dark-blue-nav capitalize">{product?.name}</h2>
                                <p> {product?.category?.name}</p>
                                <p> {product?.description}</p>

                                <div >
                                    <p className="text-md font-semibold text-gold-dark mb-1">
                                            stock:
                                        
                                        
                                        {product?.stock !== 0 ? <>
                                            <span className="text-dark-blue-2 font-light ml-1">
                                                {product?.stock}
                                        </span>
                                        </> : <>
                                                <span className="text-dark-blue-2 font-medium ml-1 text-sm">
                                                    out of stock
                                        </span>
                                        </>}
                                    </p>

                                </div>

                                <div >
                                    <p className="text-md font-semibold text-gold-dark mb-1">
                                        <span className="text-dark-blue-2 font-light">
                                            Discount Percent:
                                        </span>


                                        {product?.discountPercent} %</p>

                                </div>
                                <div >
                                    <del>

                                        <p className="text-md font-semibold text-gold-dark mb-1 ">
                                            main Price:
                                            <span className="text-dark-blue-2 font-light">
                                                {product?.mainPrice}

                                            </span>


                                        </p>
                                    </del>


                                </div>
                                <div className=" flex items-center justify-between " >
                                    <p className="text-4xl font-bold text-gold-dark mb-1">{product?.salePrice} EGP</p>
                                    <div className="flex flex-wrap gap-2 p-2 rounded-md">
                                        <div className="flex flex-wrap gap-3 p-3 rounded-md">
  {product?.colors?.map((color, index) => (
    <div
      key={index}
      onClick={() => setSelectedColor(color)}   
      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 cursor-pointer
        ${selectedColor === color 
          ? 'border-dark-blue-2 shadow-lg scale-110'   
          : 'border-gray-300 hover:border-dark-blue-2' 
        }`}
    >
      <span
        className="w-full h-full rounded-full"
        style={{ backgroundColor: color }}
        title={color}
      />
    </div>
  ))}
</div>

                                    </div>


                                </div>
                                <div >
                                </div>


                                <BtnCommon
                                    text={"add to cart"}
                                    className="rounded-md bg-dark-blue-nav"
                                    onClick={() => {
                                    console.log(selectedColor);
                                    
                                        addToCart({
                                            productId: product?.id || "",
                                            quantity: 1,
                                            color: selectedColor 
                                        });
                                    }}
                                />
                                <BtnCommon
                                    text={"add to wish List"}
                                    className="rounded-md bg-gold-dark"
                                    onClick={() => { addToWishList(product!.id) }}
                                />
                            </div>
                        </div>

                    </div>


                    {/* <div className=" flex flex-col items-center justify-center mt-15 pb-10">
                        <p>follow our page to know the latest trends </p>
                        <div className="relative w-55 md:w-80">
                            <Icons.CiSearch
                                className="absolute left-3 top-7 -translate-y-1/2 text-footer-items"
                                size={23}
                            />
                            <Input
                                type="text"
                                placeholder="search"
                                className="w-60 md:w-80 bg-transparent border-dark-blue-nav shadow mt-3  py-3 px-2 pl-10 mb-2 placeholder:text-footer-items rounded-4xl"
                            />
                        </div>
                    </div> */}
                </div>

                {/* Bottom corners */}
                <img src={cornerBottomRightHero} alt="cornerBottomRightHero" className="absolute top-110 right-0 z-0" />
                <img src={cornerBottomLeftHero} alt="cornerBottomLeftHero" className="absolute top-110 left-0 z-0" />
            </section>



        </PagesWrapper>

    </>
}
