






import { useForm, type Resolver } from "react-hook-form";
import {  useState } from "react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/Components/ui/button";
import { Icons } from "@/assets/Icons/icons";
import BtnCommon from "@/common/BtnCommon";
import { useProductContext, useCategoryContext } from "@/Hooks/useAppContexts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProduct, type ProductFormValues } from "@/Pages/Auth/validation/productValidation";
import type { ICategory, IProductUpdateInput } from "@/Utilities/interfaces";
// import type { ProductFormValues } from "@/Utilities/types";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export default function ProductEdit({
  // product,
  onBack }: {
  // product?: IProduct,
  onBack: () => void,
}) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [loading, setIsLoading]=useState<boolean>(false)
const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProductFormValues>({
  resolver: zodResolver(createProduct) as unknown as Resolver<ProductFormValues>,
  defaultValues: {
    name: "",
    mainPrice: 0,
    stock: 0,
    discountPercent: 0,
    description: "",
    categoryId: "",
    attachments: undefined,
    category: { id: "", name: "" },
  },
});



  const [preview, setPreview] = useState<string[]>();

  const { addProduct,  } = useProductContext();
  const { getCategories, allCategoriesData } = useCategoryContext();
  
  const { data: catSize } = useQuery({
  queryKey: ["allCategories"],
  queryFn: () => getCategories({  size: 50,  }),
});







 

  console.log("form errors:", errors);

  const onSubmit = (data: ProductFormValues) => {
    setIsLoading(true);
  const payload: IProductUpdateInput = {
    // id: data?.id || "",
    name: data.name,
    description: data.description,
    mainPrice: Number(data.mainPrice),   
    stock: Number(data.stock),
    discountPercent: Number(data.discountPercent),
    // category: { id: data.categoryId || "" },
      category: { id: selectedCategoryId || "" },

    attachments: data.attachments || [],
  };

  addProduct.mutate(payload, {
    onSuccess: () => {
      onBack();
    },
    onError: (error) => {
      toast.error(`Add  product error:${error}`)
      // console.log("Add product error:", error);
    }
  });

};




  return (
    <div className="flex flex-col justify-center items-center p-6">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Icons.BsBoxSeamFill className="text-3xl text-gold" />
        <h1 className=" text-3xl text-gold font-semibold capitalize">Add product</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-lg">

        {/* NAME */}
        <div className="space-y-2">
          <Label htmlFor="name" className="capitalize text-gold-light font-semibold">Name</Label>
          <Input id="name" type="text" placeholder="Enter product name" {...register("name", { required: true })} className="text-gray-300" />
          {errors.name && <p className="text-[hsl(22,55%,44%)]  text-sm">{errors.name.message}</p>}
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-2">
          <Label htmlFor="description" className="capitalize text-gold-light font-semibold">Description</Label>
          <Input id="description" placeholder="Enter product description" {...register("description")} className="text-gray-300" />
          {errors.description && <p className="text-[hsl(22,55%,44%)]  text-sm">{errors.description.message}</p>}
        </div>


        {/* CATEGORY SELECT */}
<div className="space-y-2">
  <Label
    htmlFor="category"
    className="capitalize text-gold-light font-semibold"
  >
    Category
  </Label>

  <Select
    value={selectedCategoryId}
    onValueChange={(value) => {
      setSelectedCategoryId(value);
      setValue("categoryId", value);
    }}
  >
    <SelectTrigger className="text-gray-300">
      <SelectValue
        placeholder={
          allCategoriesData?.find(
            (cat: ICategory) => cat.id === selectedCategoryId
          )?.name || "Select category"
        }
      />
    </SelectTrigger>

    <SelectContent className="bg-dark-blue-1 capitalize border-none text-white">
      {catSize && catSize.length > 0 ? (
        catSize.map((cat: ICategory) => (
          <SelectItem key={cat.id} value={cat.id}>
            {cat.name}
          </SelectItem>
        ))
      ) : (
        <p className="px-3 py-2 text-gray-400 text-sm">No categories found</p>
      )}
    </SelectContent>
  </Select>

  {errors.categoryId && (
    <p className="text-red-400 text-sm">{errors.categoryId.message}</p>
  )}
</div>


        {/* PRICE */}
        <div className="space-y-2">
          <Label htmlFor="mainPrice" className="capitalize text-gold-light font-semibold">Main Price</Label>
          <Input id="mainPrice" placeholder="Enter product price" {...register("mainPrice",{ valueAsNumber: true })} className="text-gray-300" />
          {errors.mainPrice && <p className="text-[hsl(22,55%,44%)]  text-sm">{errors.mainPrice.message}</p>}
        </div>
        {/* stock */}
        <div className="space-y-2">
          <Label htmlFor="stock" className="capitalize text-gold-light font-semibold">stock</Label>
          <Input id="stock" placeholder="Enter product price" {...register("stock",{ valueAsNumber: true })} className="text-gray-300" />
          {errors.stock && <p className="text-[hsl(22,55%,44%)]  text-sm">{errors.stock.message}</p>}
        </div>
        {/* stock */}
        <div className="space-y-2">
          <Label htmlFor="discountPercent" className="capitalize text-gold-light font-semibold">discountPercent</Label>
          <Input id="discountPercent" placeholder="Enter product price" className="text-gray-300" {...register("discountPercent",{ valueAsNumber: true })} />
          {errors.discountPercent && <p className="text-[hsl(22,55%,44%)]  text-sm">{errors.discountPercent.message}</p>}
        </div>

        {/* MULTIPLE IMAGE UPLOAD */}
        <div className="space-y-2 flex flex-col items-center justify-center">
          <input
            id="attachments"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            {...register("attachments")}
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              if (files.length > 0) {
                setValue("attachments", files);
                const previews = files.map((file) => URL.createObjectURL(file));
                setPreview(previews);
              }
            }}
          />

          <label
            htmlFor="attachments"
            className="
      flex flex-col items-center justify-center
      w-32 h-32 rounded-full border-2 border-dashed
      border-gold-light cursor-pointer
      hover:bg-gold-dark/10 hover:border-gold-dark
      transition-all duration-300
    "
          >
            <Icons.FaCamera className="text-3xl mb-2 text-gold" />
            <span className="text-sm  text-gold">Upload Images</span>
          </label>

          {/* ✅ PREVIEW MULTIPLE IMAGES */}
          {preview && preview.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {preview.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Preview ${index + 1}`}
                  className="w-24 h-24 rounded-lg object-cover border border-gold-light"
                />
              ))}
            </div>
          )}
        </div>




        {/* BUTTONS */}
        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onBack} className="rounded-xl cursor-pointer transition-all ease-in-out duration-300  hover:bg-gold-dark hover:text-white border-none">Cancel</Button>




          <BtnCommon
            loading={loading}
            text="Add Product" type="submit" className="rounded-xl cursor-pointer transition-all duration-700 ease-in-out 
              hover:from-gold-dark hover:to-[55%] " />
        </div>
      </form>
    </div>
  );
}
