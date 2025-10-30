import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/Components/ui/carousel";

import { Button } from "../ui/button";
import { useCategoryContext } from "@/Hooks/useAppContexts";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function CategorySlider() {
    const { allCategoriesData, getCategories } = useCategoryContext();
    const navigate = useNavigate();
    const baseUrlImage = "https://www.dev.goldenstitchleathers.com";

    // تحميل البيانات
    const { data: catSize } = useQuery({
        queryKey: ["allCategories"],
        queryFn: () => getCategories({ size: 50 }),
    });

    // دالة الضغط على الزر
    const handleClickShopNow = (slug: string) => {
        navigate(`/products?category=${slug}`);
    };

    return (
        <div className="w-full flex justify-center items-center relative">
            <Carousel className="w-full relative">
                <CarouselContent className="p-0 m-0 gap-0">
                    {allCategoriesData?.docs?.map((category) => (
                        <CarouselItem
                            key={category.id}
                            className="w-full flex justify-center items-center p-0 relative"
                        >
                            {/* الصورة */}
                            <img
                                src={`${baseUrlImage}/${category.image}`}
                                alt={category.name}
                                className="w-full h-[500px] object-cover"
                            />

                            {/* الزرار فوق الصورة */}
                            <div className="absolute inset-0 flex justify-center items-center">
                                <Button
                                    className="
                                        relative uppercase
                                        border-2 border-dark-blue-nav
                                        text-dark-blue-nav
                                        bg-transparent
                                        rounded-none
                                        text-xl font-semibold
                                        px-10 py-5
                                        tracking-wider
                                        overflow-hidden
                                        transition-all duration-500 ease-in-out
                                        before:absolute before:top-0 before:left-0 
                                        before:w-0 before:h-full before:bg-dark-blue-nav
                                        before:transition-all before:duration-500 
                                        hover:before:w-full hover:text-white
                                        hover:shadow-[0_0_25px_rgba(0,0,50,0.4)]
                                        cursor-pointer
                                    "
                                    onClick={() => handleClickShopNow(category.slug!)}
                                >
                                    <p className="relative z-10">Shop Now</p>
                                </Button>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* الأسهم */}
                <CarouselPrevious className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 z-20 bg-dark-blue-nav border-dark-blue-nav text-[hsl(22,55%,44%)] transition-all ease-in-out duration-300 hover:bg-[hsl(22,55%,44%)] hover:text-dark-blue-nav rounded-full shadow-lg" />
                <CarouselNext className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 z-20 bg-dark-blue-nav border-dark-blue-nav text-[hsl(22,55%,44%)] transition-all ease-in-out duration-300 hover:bg-[hsl(22,55%,44%)] hover:text-dark-blue-nav rounded-full shadow-lg" />
            </Carousel>
        </div>
    );
}
