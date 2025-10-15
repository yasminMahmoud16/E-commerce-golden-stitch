import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
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
import { updateProductSchema } from "@/Pages/Auth/validation/productValidation";
import type { ICategory, IProduct, IProductUpdateInput } from "@/Utilities/interfaces";
import type { ProductFormValues } from "@/Utilities/types";
import { toast } from "sonner";

export default function ProductEdit({ product, onBack }: {
    product: IProduct, onBack: () => void,
}) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProductFormValues>({
        resolver:zodResolver(updateProductSchema)
    });
    const [preview, setPreview] = useState<string | null>(null);

    const { updateProduct } = useProductContext();
    const { allCategoriesData } = useCategoryContext();

    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [removedAttachments, setRemovedAttachments] = useState<string[]>([]);

    useEffect(() => {
        if (product) {
            setValue("name", product.name);
            setValue("description", product.description);
            setValue("mainPrice", product.mainPrice);
            setSelectedCategoryId(product.category?.id || product.category?.id || "");

            if (product.images?.length) {
                setExistingImages(product.images);
                setPreview(`/${product.images[0]}`);
            }
        }
    }, [product, setValue]);

    const handleRemoveExistingImage = (img: string) => {
        setExistingImages((prev) => prev.filter((i) => i !== img));
        setRemovedAttachments((prev) => [...prev, img]);
    };

    // const onSubmit = (data: any) => {
    //     updateProduct.mutate({
    //         id: product.id,
    //         name: data.name,
    //         description: data.description,
    //         mainPrice: data.mainPrice,
    //         discountPercent: data.discountPercent,
    //         category: { id: selectedCategoryId },
    //         attachments: data.attachment,
    //         removedAttachments, 
    //     });

    //     onBack();
    // };

    // const onSubmit: SubmitHandler<ProductFormValues> = (data) => {
    //    console.log("✅ Form updated!", data);
    //   const payload: IProductUpdateInput = {
    //     id: data?.id || "",
    //     name: data.name,
    //     description: data.description,
    //      mainPrice: Number(data.mainPrice),   
    //     stock: Number(data.stock),
    //     discountPercent: Number(data.discountPercent),
    //     // category: { id: data.categoryId || "" },
    //       category: { id: selectedCategoryId || "" },
    
    //       attachments: data.attachments || [],
    //     removedAttachments,
    //   };
    
    //   updateProduct.mutate(payload);
    //       onBack();
    
    // };

    const onSubmit: SubmitHandler<ProductFormValues> = (data) => {
  if (!product?.id) {
    toast.error("Product ID missing");
    return;
  }

  const payload: IProductUpdateInput = {
    id: product.id, 
    name: data.name,
    description: data.description,
    mainPrice: Number(data.mainPrice),
    stock: Number(data.stock),
    discountPercent: Number(data.discountPercent),
    category: { id: selectedCategoryId || "" },
    attachments: data.attachments || [],
    removedAttachments, 
  };

  updateProduct.mutate(payload);
  onBack();
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
                    <Input id="name" type="text" placeholder="Enter product name" className="text-gray-300"{...register("name", { required: true })} />
                    {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
                </div>

                {/* DESCRIPTION */}
                <div className="space-y-2">
                    <Label htmlFor="description" className="capitalize text-gold-light font-semibold">Description</Label>
                    <Input id="description" placeholder="Enter product description" className="text-gray-300"{...register("description")} />
                    {errors.description && <p className="text-red-400 text-sm">{errors.description.message}</p>}
                </div>

                {/* CATEGORY SELECT */}
                <div className="space-y-2">
                    <Label htmlFor="category" className="capitalize text-gold-light font-semibold">Category</Label>
                    <Select
                        value={selectedCategoryId}
                        onValueChange={(value) => setSelectedCategoryId(value)}
                    >
                        <SelectTrigger className="text-gray-300">
                            <SelectValue
                                
                                placeholder={
                                    allCategoriesData?.find((cat: ICategory) => cat.id === selectedCategoryId)?.name ||
                                    "Select category"
                                }
                            />
                        </SelectTrigger>

                        <SelectContent className="bg-dark-blue-1 text-white capitalize border-none">
                            {allCategoriesData?.map((cat: ICategory) => (
                                <SelectItem key={cat.id} value={cat.id}>
                                    {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                </div>

                {/* PRICE */}
                <div className="space-y-2">
                    <Label htmlFor="mainPrice" className="capitalize text-gold-light font-semibold">Main Price</Label>
                    <Input id="mainPrice" placeholder="Enter product price" className="text-gray-300" {...register("mainPrice")} />
                    {errors.mainPrice && <p className="text-red-400 text-sm">{errors.mainPrice.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="discountPercent" className="capitalize text-gold-light font-semibold">Main Price</Label>
                    <Input id="discountPercent" placeholder="Enter product price" className="text-gray-300"{...register("discountPercent")} />
                    {errors.discountPercent && <p className="text-red-400 text-sm">{errors.discountPercent.message}</p>}
                </div>
             

                {existingImages.length > 0 && (
                    <div className="flex flex-wrap gap-4 justify-center mt-4">
                        {existingImages.map((img, index) => (
                            <div key={index} className="relative w-24 h-24">
                                <img
                                    src={`/${img}`}
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

                {/* IMAGE UPLOAD */}
                <div className="space-y-2 flex flex-col items-center justify-center">
                    <input
                        id="attachment"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        {...register("attachments")}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setValue("attachments", [file]);
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

                {/* BUTTONS */}
                <div className="flex justify-between pt-4">
                    <Button type="button" variant="outline" onClick={onBack}className="rounded-xl cursor-pointer transition-all ease-in-out duration-300  hover:bg-gold-dark hover:text-white border-none">Cancel</Button>
                    <BtnCommon text="Update Product" type="submit" className="rounded-xl cursor-pointer transition-all duration-700 ease-in-out 
              hover:from-gold-dark hover:to-[55%] " />
                </div>
            </form>
        </div>
    );
}
