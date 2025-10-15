import { Icons } from "@/assets/Icons/icons";
import BtnCommon from "@/common/BtnCommon";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import usePassword from "@/Hooks/usePassword";
import { logoutEnum, type changePasswordFields } from "@/Utilities/types";
import { Controller, useForm } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordUser } from "../Auth/validation/userValidation";
import useGlobal from "@/Hooks/useGlobal";
export default function ChangePassword() {
    const { handelCancelClick, changePassword } = usePassword();
    const { isViewPassword, isViewConfirm, isViewCurrent, handleTogglePassword, handleToggleConfirm, handleToggleCurrent } = useGlobal();
    const form = useForm<changePasswordFields>({
        resolver: zodResolver(changePasswordUser),
        defaultValues: {
            oldPassword: "",
            password: "",
            confirmPassword: "",
            flag: logoutEnum.only

        }
    });
    const handleSubmit = async (values: changePasswordFields) => {
        await changePassword(values);
        console.log({ changeValue: values });

    };
    return <>

        <div>

            <h1 className=" text-4xl text-gray-300 capitalize mb-2">change password </h1>
            <p className="text-gray-500 capitalize">create your new password </p>
            <div className="flex flex-col items-center gap-4 mt-4">
                <Form {...form} >
                    <form className="p-8 flex flex-col  " method="POST"
                        onSubmit={form.handleSubmit(handleSubmit)}
                    >


                        <FormField
                            control={form.control}
                            name="oldPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-dark-blue-nav">
                                        Old password
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative w-auto md:w-md">
                                            <Icons.CiLock
                                                className="absolute left-3 top-5 -translate-y-1/2 text-gray-400"
                                                size={23}
                                            />
                                            <Input
                                                type={isViewCurrent ? "text" : "password"}
                                                placeholder="old password"
                                                className="bg-white py-5 px-4  pl-10 mb-2 w-full"
                                                {...field}
                                            />
                                            {isViewCurrent ? (
                                                <Icons.FaRegEye
                                                    className="absolute right-4 bottom-3 -translate-y-1/2 z-10 cursor-pointer text-gray-500"
                                                    onClick={handleToggleCurrent}
                                                />
                                            ) : (
                                                <Icons.FaRegEyeSlash
                                                    className="absolute right-4 bottom-3 -translate-y-1/2 z-10 cursor-pointer text-gray-500"
                                                    onClick={handleToggleCurrent}
                                                />
                                            )}
                                        </div>
                                    </FormControl>

                                    <FormMessage className="text-xs w-96 mb-2" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-dark-blue-nav">
                                        password
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative w-auto md:w-md">
                                            <Icons.CiLock
                                                className="absolute left-3 top-5 -translate-y-1/2 text-gray-400"
                                                size={23}
                                            />
                                            <Input
                                                type={isViewPassword ? "text" : "password"}
                                                placeholder="password"
                                                className="bg-white py-5 px-4  pl-10 mb-2 w-full"
                                                {...field}
                                            />
                                            {isViewPassword ? (
                                                <Icons.FaRegEye
                                                    className="absolute right-4 bottom-3 -translate-y-1/2 z-10 cursor-pointer text-gray-500"
                                                    onClick={handleTogglePassword}
                                                />
                                            ) : (
                                                <Icons.FaRegEyeSlash
                                                    className="absolute right-4 bottom-3 -translate-y-1/2 z-10 cursor-pointer text-gray-500"
                                                    onClick={handleTogglePassword}
                                                />
                                            )}
                                        </div>
                                    </FormControl>

                                    <FormMessage className="text-xs w-96 mb-2" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-dark-blue-nav">
                                        Confirm Password
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative w-auto md:w-md">
                                            <Icons.CiLock
                                                className="absolute left-3 top-5 -translate-y-1/2 text-gray-400"
                                                size={23}
                                            />
                                            <Input
                                                type={isViewConfirm ? "text" : "password"}
                                                placeholder="Confirm Password"
                                                className="bg-white py-5 px-4  pl-10 mb-2 w-full"
                                                {...field}
                                            />
                                            {isViewConfirm ? (
                                                <Icons.FaRegEye
                                                    className="absolute right-4 bottom-3 -translate-y-1/2 z-10 cursor-pointer text-gray-500"
                                                    onClick={handleToggleConfirm}
                                                />
                                            ) : (
                                                <Icons.FaRegEyeSlash
                                                    className="absolute right-4 bottom-3 -translate-y-1/2 z-10 cursor-pointer text-gray-500"
                                                    onClick={handleToggleConfirm}
                                                />
                                            )}
                                        </div>
                                    </FormControl>

                                    <FormMessage className="mb-2" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="flag"
                            render={() => (
                                <FormItem>
                                    <FormLabel className="text-dark-blue-nav">
                                        Logout Option
                                    </FormLabel>
                                    <FormControl>
                                        <Controller
                                            name="flag"
                                            control={form.control}
                                            render={({ field: selectField }) => (
                                                <Select onValueChange={selectField.onChange} value={selectField.value}>
                                                    <SelectTrigger className="w-full bg-white text-gray-700">
                                                        <SelectValue placeholder="Logout from all devices or one device" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value={logoutEnum.only} className="capitalize">
                                                            Only this device
                                                        </SelectItem>
                                                        <SelectItem value={logoutEnum.all} className="capitalize">
                                                            All devices
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />






                        <div>

                            <BtnCommon
                                text="Save changes"
                                type="submit"
                                // loading={loading}
                                className="
                                transition-all duration-700 ease-in-out hover:from-gold-dark hover:to-[55%]"
                            />
                            <BtnCommon
                                text="cancel"
                                type="button"
                                // loading={loading}
                                className="
                                            mt-4  ml-3
                                                bg-white
                                                text-dark-blue-2
                                                transition-all duration-700 ease-in-out
                                                        hover:from-dark-blue-2 hover:to-[50%]
                                                        hover:text-white
                                            "
                                onClick={() => { handelCancelClick() }}
                            />
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    </>
}
