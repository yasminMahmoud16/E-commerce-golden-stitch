import { useQueryClient, useQuery } from "@tanstack/react-query";
import { Icons } from "@/assets/Icons/icons";
import { SpinnerCustomData } from "@/Loading/SpinnerCustomData";
import { useCategoryContext } from "@/Hooks/useAppContexts";
import PopupCommon from "@/common/PopupCommon";
import { useState } from "react";
import deleteImage from "@/assets/Images/remove.png"
import type { categoryDetails } from "@/Utilities/types";


export default function CategoryDetails({ category, onBack, onEdit, onDeleteSuccess }:categoryDetails) {
  const queryClient = useQueryClient();
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const {  getCategoryById , isUpdating ,softDelCategory} = useCategoryContext();


  const {
    data: categoryData,
  } = useQuery({
    queryKey: ["category", category?.id] as const,
    queryFn: () => getCategoryById(category!.id),
    initialData: () => queryClient.getQueryData(["category", category?.id]) || category,
    enabled: !!category?.id,
  });

  const currentCategory = categoryData || category;



    const handleDeleteClick = async(id:string) => {
    const result =await softDelCategory(id)
    if (result === "Done" && onDeleteSuccess) {
      onDeleteSuccess();
    }
}


  if (isUpdating ) {
    return <>
        <SpinnerCustomData /> 
    </>
    
  }

  return <>
    <div className="p-6 text-gray-800">
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="mb-4 text-[hsl(22,55%,44%)] font-semibold transition-all ease-in-out duration-300 hover:-translate-x-1 hover:underline cursor-pointer"
        >
          ← Back to Category
        </button>

        <div className="flex items-center justify-center gap-3">
          <Icons.FaEdit
            size={20}
            className="text-gray-300 cursor-pointer transition-all ease-in-out duration-300 hover:text-gold-dark"
            onClick={() => onEdit(currentCategory!)}
          />
          <Icons.FaTrash size={20} className="transition-all ease-in-out duration-300 text-[hsl(22,55%,44%)] hover:text-red-800 cursor-pointer"  onClick={()=>{setIsDelete(true)}}/>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center md:flex-row gap-6">
        <img
          src={`/${currentCategory?.image}`}
          alt={currentCategory?.name}
          className="w-30 h-30 md:w-60 md:h-60 object-cover rounded-xl shadow-lg"
        />

        <div className="flex flex-col justify-center gap-5">
          <h2 className="text-xl md:text-3xl font-semibold text-[hsl(22,55%,44%)] k mb-2 capitalize">
            {currentCategory?.name}
          </h2>
          <p className="text-gray-400 mb-3">{currentCategory?.description}</p>
          <p className="text-gray-400">
            <strong>Number Of Sale:</strong> {currentCategory?.numberOfSale}
          </p>
          <p className="text-gray-400">
            <strong>CreatedBy:</strong> {currentCategory?.createdBy?.username || "N/A"}
          </p>
        </div>
      </div>
    </div>


    {isDelete && (
      <PopupCommon
        open={isDelete}
        onOpenChange={setIsDelete}
        title="Are you sure you want to delete this category?"
        // text="Only Admin can restore the product after deletion."
        classNameText="text-center text-gray-400"
        classNameTitle="!text-red-700 text-3xl text-center"
        image={deleteImage}
        options={[
          {
            label: "Yes, Delete it",
            className: "bg-red-600 hover:bg-red-700",
            onClick: async () => {
              await handleDeleteClick(currentCategory!.id);
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
