import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/Components/ui/button";
import { Icons } from "@/assets/Icons/icons";
import BtnCommon from "@/common/BtnCommon";

import { useCategoryContext } from "@/Hooks/useAppContexts";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCategorySchema } from "@/Pages/Auth/validation/categoryValidation";
import type { categoryEdit } from "@/Utilities/types";
import type {  ICategoryUpdate } from "@/Utilities/interfaces";

export default function CategoryEdit({ category, onBack }:categoryEdit) {
    
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver:zodResolver(updateCategorySchema)
  });
  const [preview, setPreview] = useState<string | null>(null);

  const { updateCategory } = useCategoryContext(); 

  useEffect(() => {
    if (category) {
      setValue("name", category.name);
      setValue("description", category.description);
      if (category.image) setPreview(`/${category.image}`);
    }
  }, [category, setValue]);

  const onSubmit = (data: ICategoryUpdate) => {
    updateCategory.mutate({
      id: category!.id,
      name: data.name,
      description: data.description || "",
      attachment: data.attachment,
    });

    onBack();
  };

  return <>
    <div className="flex flex-col justify-center items-center p-6">
      <div className="flex flex-col justify-center items-center p-6">
        <div className="flex items-center justify-center gap-3 mb-4">
        <Icons.BiSolidCategoryAlt className="text-3xl text-gold" />
          <h1 className=" text-3xl text-gold font-semibold capitalize">edit category</h1>
          </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-lg">
        <div className="space-y-2">
          <Label htmlFor="name" className="capitalize text-gold-light font-semibold">Name</Label>
            <Input id="name" type="text" placeholder="Enter category name" className="text-gray-300" {...register("name", { required: true })} />
            {errors.name && <p className="text-[hsl(22,55%,44%)] font-semibold text-sm">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="capitalize text-gold-light font-semibold">Description</Label>
          <Input id="description" placeholder="Enter category description"  className="text-gray-300" {...register("description")} />
            {errors.description && <p className="text-text-[hsl(22,55%,44%)] font-semibold text-sm">{errors.description.message}</p>}
        </div>

        <div className="space-y-2 flex flex-col items-center justify-center">
          <input
            id="attachment"
            type="file"
            accept="image/*"
            className="hidden"
            {...register("attachment")}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setValue("attachment", [file]);
                const reader = new FileReader();
                reader.onloadend = () => setPreview(reader.result as string);
                reader.readAsDataURL(file);
              }
            }}
          />
          <label
            htmlFor="attachment"
            className="flex flex-col items-center justify-center w-32 h-32 rounded-full border-2 border-dashed border-gold-light cursor-pointer hover:bg-gold-dark/10 hover:border-gold-dark transition-all duration-300"
          >
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full rounded-full object-cover" />
            ) : (
              <>
                <Icons.FaCamera className="text-3xl mb-2 text-gold" />
                <span className="text-sm">Upload Image</span>
              </>
            )}
          </label>
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onBack} className="rounded-xl">Back</Button>
          <BtnCommon
            text="Update Category" type="submit" className="rounded-xl w-40" />
        </div>
      </form>
    </div>
  
  </>
}
