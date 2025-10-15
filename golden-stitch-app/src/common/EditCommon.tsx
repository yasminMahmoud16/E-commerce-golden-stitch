
import { Input } from "@/Components/ui/input";
import { useForm, Controller } from "react-hook-form";
import BtnCommon from "./BtnCommon";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {  useEffect, useState } from "react";
import type { EditCommonProps, FormDataUpdate } from "@/Utilities/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "@/Pages/Auth/validation/userValidation";
import { useProfileContext } from "@/Hooks/useAppContexts";




export default function EditCommon({
    title = "Edit",
    fields,
    data,
    onSave,
    onCancel,
}: EditCommonProps<FormDataUpdate>) {

    const { updateUserProfile } = useProfileContext();
    const {
        register,
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(updateProfile),
        defaultValues: data ?? undefined,
    });


    const [preview, setPreview] = useState<string | null>(
        data?.image ? (data.image as string) : null
    );
    const handleSubmitEdit = async (values: FormDataUpdate) => {
        try {
            const updatedUser = await updateUserProfile(values);
            if (updatedUser && onSave) onSave(updatedUser);
        } catch (err) {
            console.error("Submit failed:", err);
        }
    };



    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
            setValue("image" , file as any);
        }
    };
    useEffect(() => {
        if (data) {
            reset(data);
            setPreview(data.image ? (data.image as string) : null);
        }
    }, [data, reset]);










    return (
        <div>
            {title && <h2 className="text-xl text-gold font-medium mb-4">{title}</h2>}

            <form onSubmit={handleSubmit(handleSubmitEdit)}>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 w-full">
                    {fields.map((field) => (
                        <div key={field.name} className="col-span-3">
                            {field.label && (
                                <Label
                                    className="text-gray-400 mb-2 block"
                                    htmlFor={field.name}
                                >
                                    {field.label}
                                </Label>
                            )}

                            {/* 👇 Handle Gender Select */}
                            {field.name === "gender" ? (
                                <>

                                    <Controller
                                        name={field.name}
                                        control={control}
                                        defaultValue={data?.[field.name] ?? ""}
                                        render={({ field: selectField }) => (
                                            <Select
                                                onValueChange={(value) => {
                                                    selectField.onChange(value);
                                                    setValue(field.name as keyof FormDataUpdate, value as any);
                                                }}
                                                value={selectField.value ?? ""}

                                            >
                                                <SelectTrigger className="w-full bg-white text-gray-700">
                                                    <SelectValue placeholder={field.placeholder || "Select Gender"} />
                                                </SelectTrigger>
                                                <SelectContent sideOffset={1} position="popper">
                                                    <SelectItem value="male">male</SelectItem>
                                                    <SelectItem value="female">female</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </>


                            ) : field.type === "file" ? (
                                <div className="flex flex-col items-start gap-3 ">
                                    {preview && (
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="w-24 h-24 object-cover rounded-full border-2 border-gold-light shadow-md"
                                        />
                                    )}

                                    <label
                                        htmlFor={field.name}
                                        className="cursor-pointer bg-gradient-to-r from-gold-dark to-gold-light text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-all"
                                    >
                                        Upload New Image
                                    </label>
                                    <Input
                                        id={field.name}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </div>
                            ) : (
                                <Input
                                    id={field.name}
                                    type={field.type || "text"}
                                    placeholder={field.placeholder}
                                    {...register(field.name as keyof FormDataUpdate)}
                                    className="bg-white md:w-full py-3 px-4 pl-10 placeholder:text-gray-400"
                                />
                            )}

                            {field.name in errors && (
                                <span className="text-red-500 text-sm">
                                    {(errors[field.name as keyof FormDataUpdate]?.message as string) || ""}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex gap-3 mt-4">
                    <BtnCommon text="Save" type="submit"
                    />
                    <BtnCommon
                        text="Cancel"
                        className="bg-white text-dark-blue-nav border-2 border-dark-blue-nav hover:text-white"
                        type="button"
                        onClick={onCancel}
                    />
                </div>
            </form>
        </div>
    );
}
