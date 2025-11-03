






import { useForm, type Resolver } from "react-hook-form";
import {  useState } from "react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
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
// import { toast } from "sonner";
import colorsList from "@/Utilities/data";
import { Checkbox } from "../ui/checkbox";
export default function AddProducts({
  // product,
  onBack }: {
  // product?: IProduct,
  onBack: () => void,
}) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  // colors ==============================================
const [selectedColorHexes, setSelectedColorHexes] = useState<string[]>([]);
  const [loading, setIsLoading]=useState<boolean>(false)
const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProductFormValues>({
  resolver: zodResolver(createProduct) as unknown as Resolver<ProductFormValues>,
  defaultValues: {
    name: "",
    mainPrice: 0,
    stock: 0,
    discountPercent: undefined ,
    description: "",
    categoryId: "",
    colors:[],
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







 

  // console.log("form errors:", errors);

  const onSubmit = (data: ProductFormValues) => {
    setIsLoading(true);
  const payload: IProductUpdateInput = {
    // id: data?.id || "",
    name: data.name,
    description: data.description,
    mainPrice: Number(data.mainPrice),   
    stock: Number(data.stock),
    ...(data.discountPercent && data.discountPercent > 0
    ? { discountPercent: Number(data.discountPercent) }
    : {}),
  // discountPercent: Number(data.discountPercent ?? 0),
  // discountPercent:
  //   data.discountPercent !== undefined && data.discountPercent !== null
  //     ? Number(data.discountPercent)
  //     : undefined,
  // category: { id: data.categoryId || "" },
    category: { id: selectedCategoryId || "" },

  attachments: data.attachments || [],
  colors: data.colors || [],
  };

  addProduct.mutate(payload, {
    onSuccess: () => {
      onBack();
    },
    onError: (_error) => {
      setIsLoading(false)
      // toast.error(`Add  product error:${error}`)
      // console.log("Add product error:", error);
    }
  });

  };
  // console.log(errors);
  




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
    <SelectTrigger className="text-gray-300 cursor-pointer">
      <SelectValue
        placeholder={
          allCategoriesData?.docs?.find(
            (cat: ICategory) => cat.id === selectedCategoryId
          )?.name || "Select category"
        }
      />
    </SelectTrigger>

    <SelectContent className="bg-dark-blue-1 capitalize border-none text-white">
      {catSize && catSize?.docs?.length > 0 ? (
        catSize?.docs?.map((cat: ICategory) => (
          <SelectItem key={cat.id} value={cat.id} className="cursor-pointer">
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
        {/* discountPercent */}
        <div className="space-y-2">
          <Label htmlFor="discountPercent" className="capitalize text-gold-light font-semibold">discountPercent</Label>
          <Input type="number" id="discountPercent" placeholder="Enter product price" className="text-gray-300" {...register("discountPercent",
            // { valueAsNumber: true }
          )}
          />
          {/* {errors.discountPercent && <p className="text-[hsl(22,55%,44%)]  text-sm">{errors.discountPercent.message}</p>} */}
        </div>


        {/* colors */}
        <div className="space-y-2">

<Label
  htmlFor="colors"
  className="capitalize text-gold-light font-semibold"
>
  pick colors
</Label>

          <Select
  // open={false}
  // onOpenChange={() => {}} 
>
  <SelectTrigger className="text-gray-300 cursor-pointer">
    <SelectValue placeholder="pick colors">
      <div className="flex flex-wrap items-center gap-2">
        {selectedColorHexes.length > 0 ? (
          selectedColorHexes.slice(0, 3).map((hex) => {
            const color = colorsList.find((c) => c.hex === hex);
            return (
              <div
                key={hex}
                className="flex items-center gap-1 px-2 py-1 bg-dark-blue-1 rounded text-xs border border-gray-600"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: hex }}
                />
                <span className="capitalize">{color?.name}</span>
              </div>
            );
          })
        ) : (
          <span className="text-gray-500">pick colors...</span>
        )}
        {selectedColorHexes.length > 3 && (
          <span className="text-xs text-gray-400">+{selectedColorHexes.length - 3}</span>
        )}
      </div>
    </SelectValue>
  </SelectTrigger>

<SelectContent className="bg-dark-blue-1 border-none text-white max-h-64 overflow-y-auto p-0">
  <div className="p-2">
    {colorsList.map((color) => {
      const isChecked = selectedColorHexes.includes(color.hex);

      return (
        <div
          key={color.hex}
          className="flex items-center space-x-2 p-2 hover:bg-dark-blue-2 rounded cursor-pointer select-none"
          onClick={(e) => {
            e.stopPropagation();

            const newColors = isChecked
              ? selectedColorHexes.filter((c) => c !== color.hex)
              : [...selectedColorHexes, color.hex];

            setSelectedColorHexes(newColors);
            setValue("colors", newColors); //with api
          }}
        >
          <Checkbox
            checked={isChecked}
            className="border-gray-400 pointer-events-none" 
          />
          <div className="flex items-center gap-2 flex-1">
            <div
              className="w-5 h-5 rounded-full border border-gray-400"
              style={{ backgroundColor: color.hex }}
            />
            <p className="capitalize text-sm">{color.name}</p>
          </div>
        </div>
      );
    })}
  </div>
</SelectContent>
</Select>

  {/* <Label
    htmlFor="category"
    className="capitalize text-gold-light font-semibold"
  >
    pick a color
  </Label> 

  <Select
    value={selectedColorHex}
    onValueChange={(hex) => {
      setSelectedColorHex(hex);
      setValue("color", hex);
    }}
  >
    <SelectTrigger className="text-gray-300">
      <SelectValue placeholder="pick a color">
        {selectedColorHex ? (
          <div className="flex items-center gap-3">
            <div
              className="w-6 h-6 rounded-full border border-gray-500 shadow-sm"
              style={{ backgroundColor: selectedColorHex }}
            />
            <span className="capitalize">
              {colorsList.find((c) => c.hex === selectedColorHex)?.name}
            </span>
          </div>
        ) : (
          "pick a color"
        )}
      </SelectValue>
    </SelectTrigger>

            <SelectContent>
  {colorsList.map((color) => (
    <div key={color.hex} className="flex items-center space-x-2 p-2">
      <Checkbox
        checked={selectedColorHexes.includes(color.hex)}
        onCheckedChange={(checked) => {
          const newColors = checked
            ? [...selectedColorHexes, color.hex]
            : selectedColorHexes.filter((c) => c !== color.hex);
          setSelectedColorHexes(newColors);
          setValue("colors", newColors);
        }}
      />
      <div className="flex items-center gap-2 flex-1">
        <div
          className="w-5 h-5 rounded-full border"
          style={{ backgroundColor: color.hex }}
        />
        <span className="capitalize text-sm">{color.name}</span>
      </div>
    </div>
  ))}
</SelectContent>
    {/* <SelectContent className="bg-dark-blue-1 border-none text-white max-h-64 overflow-y-auto">
      {colorsList.map((color) => (
        <SelectItem key={color.hex} value={color.hex}>
          <div className="flex items-center gap-3 py-1">
            <div
              className="w-6 h-6 rounded-full border border-gray-400 shadow-sm"
              style={{ backgroundColor: color.hex }}
            />
            <span className="capitalize">{color.name}</span>
          </div>
        </SelectItem>
      ))}
    </SelectContent> */}
  {/* </Select> */} 


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

          {/*  PREVIEW MULTIPLE IMAGES */}
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
