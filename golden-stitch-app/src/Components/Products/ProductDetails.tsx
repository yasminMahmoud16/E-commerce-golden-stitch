import { useQueryClient, useQuery } from "@tanstack/react-query";
import { Icons } from "@/assets/Icons/icons";
import { SpinnerCustomData } from "@/Loading/SpinnerCustomData";
import { useProductContext, useCategoryContext } from "@/Hooks/useAppContexts";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/Components/ui/carousel";
import PopupCommon from "@/common/PopupCommon";
import deleteImage from "@/assets/Images/bag_18827735.png"
import type { productDetails } from "@/Utilities/types";

export default function ProductDetails({ product, onBack, onEdit, onDeleteSuccess }: productDetails) {
  const queryClient = useQueryClient();
  const { getProductById, isUpdating ,softDelProduct} = useProductContext();
  const { allCategoriesData } = useCategoryContext();
  const [parentImage, setParentImage] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  

  const { data: productData } = useQuery({
    queryKey: ["product", product.id],
    queryFn: () => getProductById(product.id),
    initialData: () =>
      queryClient.getQueryData(["product", product.id]) || product,
    enabled: !!product.id,
  });

  const currentProduct = productData || product;

  const categoryName =
    typeof currentProduct.category === "string"
      ? allCategoriesData?.find((cat) => cat.id === currentProduct.category)
          ?.name || "Unknown Category"
      : currentProduct.category?.name || "Unknown Category";

  const handleGallery = (image) => {
    setParentImage(image);
  };

  if (isUpdating) {
    return (
      <div className="flex justify-center items-center h-full">
        <SpinnerCustomData />
      </div>
    );
  }


  const handleDeleteClick = async(id:string) => {
    const result =await softDelProduct(id)
    if (result === "Done" && onDeleteSuccess) {
      onDeleteSuccess();
    }
}

  return <>
    <div className="p-6 text-gray-800">
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="mb-4 text-gold-dark font-semibold transition-all ease-in-out duration-300 hover:-translate-x-1 hover:underline cursor-pointer"
        >
          ← Back to Product
        </button>

        <div className="flex items-center justify-center gap-3">
          <Icons.FaEdit
            size={20}
            className="text-gray-300 cursor-pointer hover:text-gold-dark"
            onClick={() => onEdit(currentProduct)}
          />
          <Icons.FaTrash size={20} className="text-red-700 cursor-pointer"
            onClick={()=>{setIsDelete(true)}} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 ">

        <div className=" flex flex-col items-center justify-center">

        <img
          src={`/${parentImage || currentProduct.images?.[0]}`}
          alt={currentProduct.name}
          className="w-60 h-60 object-cover rounded-xl shadow-lg"
        />

        <Carousel className="relative w-full md:w-[350px]">
          <CarouselPrevious className="cursor-pointer absolute left-1 z-10" />
          <CarouselContent className="-ml-4 flex mt-3">
            {currentProduct.images?.map((img, index) => (
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

        <div>
          <h2 className="text-3xl font-semibold text-gold-dark mb-2 capitalize">
            {currentProduct.name}
          </h2>
          <p className="text-gray-400 mb-3">{currentProduct.description}</p>
          <p className="text-gray-400">
            <strong>Price:</strong> {currentProduct.mainPrice}
          </p>
          <p className="text-gray-400">
            <strong>Category:</strong> {categoryName}
          </p>
        </div>
      </div>
    </div>

{isDelete && (
  <PopupCommon
    open={isDelete}
    onOpenChange={setIsDelete}
    title="Are you sure you want to delete this product?"
    text="Only Admin can restore the product after deletion."
    classNameText="text-center text-gray-400"
    classNameTitle="!text-red-700 text-3xl text-center"
    image={deleteImage}
    options={[
      {
        label: "Yes, Delete it",
        className: "bg-red-600 hover:bg-red-700",
        onClick: async () => {
          await handleDeleteClick(currentProduct.id);
          setIsDelete(false); // close popup
        },
      },
      {
        label: "Cancel",
        className: "bg-gray-500 hover:bg-gray-600",
        onClick: () => setIsDelete(false),
      },
    ]}
    showCancel={false}
    showAction={false}
  />
)}

  </>
  
}
