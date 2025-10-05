import PagesWrapper from "@/common/PagesWrapper";
import { useParams } from "react-router-dom";
import cornerBottomRightHero from "@/assets/cornerBottomRightHero.png"
import cornerBottomLeftHero from "@/assets/cornerBottomLeftHero.png"

import secCornerRight from "@/assets/Images/secCornerRight.png"
import secCornerLeft from "@/assets/Images/secCornerLeft.png"
import card1 from "@/assets/Images/card1.jpg"
import card2 from "@/assets/Images/card2.jpg"
import card3 from "@/assets/Images/card3.jpg"
import { Icons } from "@/assets/Icons/icons";
import { Button } from "@/Components/ui/button";
import BtnCommon from "@/common/BtnCommon";
import { Input } from "@/Components/ui/input";
import {
    Carousel, CarouselContent, CarouselItem, CarouselNext,
    CarouselPrevious
} from "@/Components/ui/carousel";
import { useState } from "react";
export default function ProductDetails() {
    const [parentImage, setParentImage] = useState(card1);
    // loading api
    const { id } = useParams();
    console.log(id);

    const handleGallery = (img) => {
        setParentImage(img)
    }

    return <>

        <PagesWrapper>
            <section className="relative">
                {/* Top corners */}
                <img src={secCornerRight} alt="secCornerRight" className="absolute right-2 top-0 z-0" />
                <img src={secCornerLeft} alt="secCornerLeft" className="absolute left-0 top-0 z-0" />


                <div className="container">

                    <div className="grid grid-cols-1 md:grid-cols-6 items-center md:items-start justify-center pt-10 md:gap-4 relative z-10">
                        <div className="col-span-2 mb-6 md:mb-0 ">
                            <div>
                                <img src={parentImage} alt="" />
                            </div>
                            <div>
                                <Carousel className=" relative">
                                    <CarouselPrevious  className="cursor-pointer absolute left-1 z-10"/>
                                    <CarouselContent className="-ml-4 flex mt-3">
                                        <CarouselItem className="pl-4 basis-1/3 shrink-0">
                                            <div onClick={() => handleGallery(card2)} className="relative group cursor-pointer">
                                                
                                                <img
                                                    src={card2}
                                                    alt="thumbnail"
                                                    className="w-full h-auto rounded-md"
                                                />
                                                {/* Overlay */}
                                                <div className="absolute inset-0 bg-black/30 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                        </CarouselItem>

                                       <CarouselItem className="pl-4 basis-1/3 shrink-0">
                                            <div onClick={() => handleGallery(card3)} className="relative group cursor-pointer">
                                                <img
                                                    src={card3}
                                                    alt="thumbnail"
                                                    className="w-full h-auto rounded-md"
                                                
                                                />
                                                {/* Overlay */}
                                                <div className="absolute inset-0 bg-black/30 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                        </CarouselItem>

                                       <CarouselItem className="pl-4 basis-1/3 shrink-0">
                                            <div onClick={() => handleGallery(card1)} className="relative group cursor-pointer">
                                                <img
                                                    src={card1}
                                                    alt="thumbnail"
                                                    className="w-full h-auto rounded-md"
                                                    
                                                />
                                                {/* Overlay */}
                                                <div className="absolute inset-0 bg-black/30 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                        </CarouselItem>
                                        <CarouselItem className="pl-4 basis-1/3 shrink-0">
                                            <div onClick={() => handleGallery(card2)} className="relative group cursor-pointer">
                                                <img
                                                    src={card2}
                                                    alt="thumbnail"
                                                    className="w-full h-auto rounded-md"
                                                    
                                                />
                                                {/* Overlay */}
                                                <div className="absolute inset-0 bg-black/30 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                        </CarouselItem>

                                       <CarouselItem className="pl-4 basis-1/3 shrink-0">
                                            <div onClick={() => handleGallery(card3)} className="relative group cursor-pointer">
                                                <img
                                                    src={card3}
                                                    alt="thumbnail"
                                                    className="w-full h-auto rounded-md"
                                                    
                                                />
                                                {/* Overlay */}
                                                <div className="absolute inset-0 bg-black/30 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                        </CarouselItem>

                                       <CarouselItem className="pl-4 basis-1/3 shrink-0">
                                            <div onClick={() => handleGallery(card1)} className="relative group cursor-pointer">
                                                <img
                                                    src={card1}
                                                    alt="thumbnail"
                                                    className="w-full h-auto rounded-md"
                                                    
                                                />
                                                {/* Overlay */}
                                                <div className="absolute inset-0 bg-black/30 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                        </CarouselItem>
                                       

                                    </CarouselContent>
                                    <CarouselNext  className="cursor-pointer absolute right-1 z-10"/>
                                </Carousel>


                            </div>
                        </div>
                        <div className="col-span-4  ">
                            <div className="flex flex-col justify-center gap-6  h-72">

                                <h2 className="text-3xl font-semibold text-dark-blue-nav">wallet</h2>
                                <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta vitae voluptatem architecto doloribus mollitia praesentium culpa, temporibus iste rem saepe.</p>
                                <div >
                                    <p className="text-4xl font-bold text-gold-dark mb-3">500 $</p>
                                    <div className="flex items-center gap-4">


                                        <Button className="bg-dark-blue-1 cursor-pointer">
                                            <Icons.FiMinus />
                                        </Button>
                                        <p>1</p>
                                        <Button className="bg-dark-blue-1 cursor-pointer">
                                            <Icons.FaPlus />
                                        </Button>
                                    
                                    </div>
                                </div>

                                <BtnCommon
                                    text={"add to cart"}
                                    className="rounded-md bg-dark-blue-nav"
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
