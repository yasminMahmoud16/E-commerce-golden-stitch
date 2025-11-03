import { useForm, type Resolver } from "react-hook-form";
import { useEffect, useState } from "react";
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
import { updateProductSchema, type UpdateProductForm } from "@/Pages/Auth/validation/productValidation";
import type { ICategory, IProduct, IProductEditInput } from "@/Utilities/interfaces";
import { useQuery } from "@tanstack/react-query";
import colorsList from "@/Utilities/data";

export default function ProductEdit({ product, onBack }: {
  product: IProduct, onBack: () => void,
}) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<UpdateProductForm>({
    resolver: zodResolver(updateProductSchema) as unknown as Resolver<UpdateProductForm>,
    defaultValues: {
      category: { id: "", name: "" },
    },
  });
  const [preview, setPreview] = useState<string[]>([]);


  const { updateProduct } = useProductContext();
  const { getCategories, allCategoriesData } = useCategoryContext();
  const baseUrlImage = "https://www.goldenstitchleathers.com/api"


  const { data: catSize } = useQuery({
    queryKey: ["allCategories"],
    queryFn: () => getCategories({ size: 50, }),
  });

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedColorHexes, setSelectedColorHexes] = useState<string[]>([]);

  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [existingColors, setExistingColors] = useState<string[]>([]);
  const [removedAttachments, setRemovedAttachments] = useState<string[]>([]);
  const [removedColors, setRemovedColors] = useState<string[]>([]);

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("mainPrice", product.mainPrice);
      setValue("stock", product.stock);
      setValue("discountPercent", product.discountPercent ?? undefined);
      setValue("category", { id: product.category?.id || "", name: product.category?.name || "" });
      setSelectedCategoryId(product.category?.id || "");
      if (product.images?.length) {
        setExistingImages(product.images);
        // setPreview(product.images.map(img => `/${img}`));
      }
      if (product.colors?.length) {
        setExistingColors(product.colors);
        setSelectedColorHexes(product.colors);
      }
    }
  }, [product, setValue]);

  const handleRemoveExistingImage = (img: string) => {
    setExistingImages((prev) => prev.filter((i) => i !== img));
    setRemovedAttachments((prev) => [...prev, img]);
  };

  const handleRemoveExistingColor = (color: string) => {
    const updated = existingColors.filter((c) => c !== color);
    setExistingColors(updated);
    setRemovedColors((prev) => [...prev, color]);
    setValue("colors", updated);
  };

  const onSubmit = (data: UpdateProductForm) => {


    const payload: IProductEditInput = {
      id: product.id,
      name: data.name,
      description: data.description,
      mainPrice: Number(data.mainPrice),
      stock: Number(data.stock),
      // discountPercent: Number(data.discountPercent),
      ...(data.discountPercent !== undefined && data.discountPercent !== null
        ? { discountPercent: Number(data.discountPercent) }
        : {}),

      category: data.category || { id: "", name: "" },
      attachments: data.attachments || [],
      colors: data.colors || [],
      removedAttachments,
      removedColors,
    };


    updateProduct.mutate(payload, {
      onSuccess: () => {
        onBack();
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onError: (_error) => {
        
        // toast.error(" Failed to update product");
          // console.log("update product error:", error);
      }
    });

  };


  // console.log(errors,"form updated")
  return (
    <div className="flex flex-col justify-center items-center p-6">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Icons.BsBoxSeamFill className="text-3xl text-gold" />
        <h1 className=" text-3xl text-gold font-semibold capitalize">edit product</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-lg">

        {/* NAME */}
        <div className="space-y-2">
          <Label htmlFor="name" className="capitalize text-gold-light font-semibold">Name</Label>
          <Input id="name" type="text" placeholder="Enter product name" className="text-gray-300 "{...register("name", { required: true })} />
          {errors.name && <p className="text-[hsl(22,55%,44%)] 
                        text-sm">{errors.name.message}</p>}
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-2">
          <Label htmlFor="description" className="capitalize text-gold-light font-semibold">Description</Label>
          <Input id="description" placeholder="Enter product description" className="text-gray-300"{...register("description")} />
          {errors.description && <p className="text-[hsl(22,55%,44%)] 
                        text-sm">{errors.description.message}</p>}
        </div>

        {/* CATEGORY SELECT */}
        <div className="space-y-2">
          <Label htmlFor="category" className="capitalize text-gold-light font-semibold">Category</Label>
          <Select
            value={selectedCategoryId}
            onValueChange={(value) => {
              setSelectedCategoryId(value);
              const selectedCat = allCategoriesData?.docs?.find(cat => cat.id === value);
              if (selectedCat) {
                setValue("category", { id: selectedCat.id, name: selectedCat.name }, { shouldValidate: true });
              }
            }}
          >
            <SelectTrigger className="text-gray-300">
              <SelectValue
                placeholder={
                  allCategoriesData?.docs?.find(cat => cat.id === selectedCategoryId)?.name ||
                  product.category?.name ||
                  "Select category"
                }
              />
            </SelectTrigger>

            <SelectContent className="bg-dark-blue-1 text-white capitalize border-none">
              {catSize?.docs?.map((cat: ICategory) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>


        </div>
        {/* color SELECT */}
        <div className="space-y-2">
          <Label htmlFor="colors" className="capitalize text-gold-light font-semibold">Category</Label>
          <Select>
            <SelectTrigger className="text-gray-300 cursor-pointer">
              <SelectValue placeholder="Pick colors">
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
                    <span className="text-gray-500">Pick colors...</span>
                  )}
                  {selectedColorHexes.length > 3 && (
                    <span className="text-xs text-gray-400">
                      +{selectedColorHexes.length - 3}
                    </span>
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
                      className={`flex items-center justify-between p-2 rounded cursor-pointer transition-all 
              ${isChecked ? "bg-dark-blue-3 border border-gold-dark" : "hover:bg-dark-blue-2"}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        const newColors = isChecked
                          ? selectedColorHexes.filter((c) => c !== color.hex)
                          : [...selectedColorHexes, color.hex];

                        setSelectedColorHexes(newColors);
                        setValue("colors", newColors);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {/* ✅ شكل اللون */}
                        <div
                          className="w-5 h-5 rounded-full border border-gray-400"
                          style={{ backgroundColor: color.hex }}
                        />
                        <p className="capitalize text-sm">{color.name}</p>
                      </div>

                      {/* ✅ لو اللون مختار، أظهر دايرته أو إشارة ✅ */}
                      {isChecked && (
                        <div
                          className="w-4 h-4 rounded-full border-2 border-gold-dark bg-gold-dark flex items-center justify-center text-[10px] text-white"
                          title="Selected"
                        >
                          ✓
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </SelectContent>
          </Select>


{(existingColors.length > 0 || selectedColorHexes.length > 0) && (
  <div className="flex flex-wrap gap-2 justify-center mt-4">
    {existingColors.map((color, index) => (
      <div
        key={`existing-${index}`}
        className="relative w-10 h-10 rounded-full border border-gray-400"
        style={{ backgroundColor: color }}
        title={color}
      >
        <button
          type="button"
          onClick={() => handleRemoveExistingColor(color)}
          className="cursor-pointer absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center hover:bg-red-600 transition"
        >
          ✕
        </button>
      </div>
    ))}

    {selectedColorHexes
      .filter((color) => !existingColors.includes(color)) 
      .map((color, index) => (
        <div
          key={`selected-${index}`}
          className="relative w-10 h-10 rounded-full border border-gray-400 shadow-md"
          style={{ backgroundColor: color }}
          title={color}
        >
          <button
            type="button"
            onClick={() =>
              setSelectedColorHexes((prev) => prev.filter((c) => c !== color))
            }
            className="cursor-pointer absolute -top-1 -right-1 bg-gray-500 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center hover:bg-gray-600 transition"
          >
            ✕
          </button>
        </div>
      ))}
  </div>
)}





        </div>

        {/* PRICE */}
        <div className="space-y-2">
          <Label htmlFor="mainPrice" className="capitalize text-gold-light font-semibold">Main Price</Label>
          <Input id="mainPrice" placeholder="Enter product price" className="text-gray-300" {...register("mainPrice")} />
          {errors.mainPrice && <p className="text-[hsl(22,55%,44%)] 
                        text-sm">{errors.mainPrice.message}</p>}
        </div>

        {/* stock */}
        <div className="space-y-2">
          <Label htmlFor="stock" className="capitalize text-gold-light font-semibold">stock</Label>
          <Input id="stock" placeholder="stock" className="text-gray-300" {...register("stock")} />
          {errors.stock && <p className="text-[hsl(22,55%,44%)] 
                        text-sm">{errors.stock?.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="discountPercent" className="capitalize text-gold-light font-semibold">discountPercent</Label>
          <Input id="discountPercent" placeholder="Enter product price" className="text-gray-300"{...register("discountPercent")} />

        </div>


        {existingImages.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            {existingImages.map((img, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={`${baseUrlImage}/${img}`}
                  alt="product"
                  className="w-full h-full rounded-lg object-cover border border-gold-light"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveExistingImage(img)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

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
            <div className="flex flex-wrap justify-center gap-3 mt-4 ">
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
          <BtnCommon text="Update Product" type="submit" className="rounded-xl cursor-pointer transition-all duration-700 ease-in-out 
              hover:from-gold-dark hover:to-[55%] w-40 " />
        </div>
      </form>
    </div>
  );
}
