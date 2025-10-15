import { useForm } from "react-hook-form";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { useAxios } from "@/Hooks/useAxios";
import { toast } from "sonner";
import {  useState } from "react";
import { Icons } from "@/assets/Icons/icons";
import BtnCommon from "@/common/BtnCommon";
import { useAuthContext } from "@/Hooks/useAppContexts";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategory } from "@/Pages/Auth/validation/categoryValidation";

export default function AddCategory({ onBack }: { onBack: () => void }) {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
   resolver:zodResolver(createCategory)
 });
  const axiosInstance = useAxios();
  const {getAuthHeader} = useAuthContext()
  const [preview, setPreview] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      if (data.attachment?.[0]) {
        formData.append("attachment", data.attachment[0]);
      }

      const res = await axiosInstance.post("/category", formData, {
        headers: getAuthHeader(),
      });
      console.log({addCategorey:res});
      

      toast.success("Category added successfully!");
      reset();
      setPreview(null);
      onBack();
    } catch (error: any) {
      console.log({addCat:error});
      
      const detailedError = error?.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;
            const generalError = error?.response?.data?.message;
            const messageToShow = detailedError || generalError || "add category issue ";
            toast.error(messageToShow);
    }
  };


  return (
    <div className="flex flex-col justify-center items-center p-6">

      


      <div className="flex items-center justify-center gap-3 mb-4">
        <Icons.BiSolidCategoryAlt className="text-3xl text-gold"/>
      <h1 className=" text-3xl text-gold font-semibold capitalize">Add category</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">

            {/* Name */}
            <div className="space-y-2 ">
              <Label htmlFor="name" className="capitalize text-gold-light font-semibold">Name</Label>
              <Input
                id="name"
            type="text"
            className="text-gray-200 placeholder:text-gray-400 text-gray-300"
                placeholder="Enter category name"
                {...register("name", { required: true })}
          />
          {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="capitalize text-gold-light font-semibold">Description</Label>
              <Input
            id="description"
            className="placeholder:text-gray-400 text-gray-300"
                placeholder="Enter category description"
                {...register("description")}
          />
          {errors.description && <p className="text-red-400 text-sm">{errors.description.message}</p>}
            </div>

            {/* Image Upload + Preview */}

        <div className="space-y-2  flex items-center flex-col justify-center">


  <input
    id="attachment"
    type="file"
    accept="image/*"
    className="hidden"
    {...register("attachment")}
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        setValue("attachment", [file])
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
      }
    }}
  />

  <label
    htmlFor="attachment"
    className="
      flex flex-col items-center justify-center
      w-32 h-32 rounded-full 
      border-2 border-dashed border-gold-light
      text-gold-light cursor-pointer
      hover:bg-gold-dark/10 hover:border-gold-dark
      transition-all duration-300 ease-in-out
    "
  >
    {preview ? (
      <img
        src={preview}
        alt="Preview"
        className="w-full h-full rounded-full object-cover"
      />
    ) : (
      <>
        <Icons.FaCamera className="text-3xl mb-2 text-gold" />
        <span className="text-sm">Upload Image</span>
      </>
    )}
  </label>
</div>

            {/* Buttons */}
            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="rounded-xl cursor-pointer transition-all ease-in-out duration-300  hover:bg-gold-dark hover:text-white border-none"
              >
                Cancel
              </Button>
              <BtnCommon text="Add Category" type="submit" className="rounded-xl cursor-pointer transition-all duration-700 ease-in-out 
              hover:from-gold-dark hover:to-[55%] "/>
                
            </div>
          </form>
  
    </div>
  );
}
