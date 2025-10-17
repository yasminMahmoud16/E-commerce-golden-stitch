import { Icons } from "@/assets/Icons/icons";
import BtnCommon from "@/common/BtnCommon";
import WrapperBg from "@/common/WrapperBg";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/Components/ui/input-otp";
import useForgetPassword from "@/Hooks/useForgetPassword";
import type { resetPassword } from "@/Utilities/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { resetPasswordValidation } from "../validation/authValidation";
import { useLocation } from "react-router-dom";

export default function CreateNewPassword() {
    const { resetPassword ,loading} = useForgetPassword();
    const [isView, setIsView] = useState(false);
  const location = useLocation();
  const emailFromState = location.state?.email || "";
  const otpFromState = location.state?.otp || "";
    const handleClickVisibility = () => {
        setIsView(!isView);
        console.log(isView)
    }
    const form = useForm<resetPassword>({
        resolver:zodResolver(resetPasswordValidation),
        defaultValues: {
            email: emailFromState,
            otp:otpFromState,
            password: "",
            confirmPassword: ""
        }
    });
    const handleSubmit = async (values:resetPassword) => {
                await resetPassword(values)
            }
    return <>
        <WrapperBg title="Create New Password" subtitle="Please enter your new password below. Make sure it’s strong and secure">
            <Form {...form} >
                <form method="POST" onSubmit={form.handleSubmit(handleSubmit)} className="mt-3  w-72 md:w-xl md:flex md:flex-col md:items-center md:justify-center">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>

                                <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl  className=" flex items-center justify-center ">
                                            <div className="relative w-72 md:w-md  flex items-center justify-between">
                                                <Icons.MdOutlineMail
                                                    className="absolute left-20 top-5 -translate-y-1/2 text-gold"
                                                    size={23}
                                                />
                                                <Input
                                                    type="text"
                                                    placeholder="email"
                                                    className="bg-transparent border-none outline-0 ring-0 py-5 px-4 pl-10 mb-2 placeholder:text-gray-400 text-gold  text-center" 
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage  className="mb-2"/>
                                    </FormItem>


                                )}
                            />
                             <FormField
                                control={form.control}
                                name="otp"
                                render={({ field }) => (
                                    <FormItem className=" flex flex-col items-center justify-center md:p-2 ml-4 md:ml-0">
                                        <FormControl >
                                            <div className="px-1">
                                            <InputOTP
                                                maxLength={6}
                                                value={field.value}       // controlled value
                                                onChange={field.onChange} // update RHF
                                            >
                                                <InputOTPGroup>
                                                    <InputOTPSlot className=" rounded-md  text-md  bg-transparent border-none text-gold font-semibold" index={0} />

                                                    <InputOTPSlot className="bg-transparent border-none rounded-md  text-md  text-gold font-semibold" index={1} />

                                                    <InputOTPSlot className="bg-transparent border-none rounded-md  text-md  text-gold font-semibold" index={2} />
                                                </InputOTPGroup>

                                                <InputOTPGroup>
                                                    <InputOTPSlot className="bg-transparent border-none rounded-md  text-md  text-gold font-semibold" index={3} />

                                                    <InputOTPSlot className="bg-transparent border-none rounded-md  text-md  text-gold font-semibold" index={4} />

                                                    <InputOTPSlot className="bg-transparent border-none rounded-md  text-md  text-gold font-semibold" index={5} />
                                                </InputOTPGroup>

                                            </InputOTP>

                                            </div>
                                        </FormControl>
                                        
                                    </FormItem>
                                )}
                            />
                                <FormControl>
                                    <div className="relative w-auto md:w-md">
                                        <Icons.CiLock
                                            className="absolute left-3 top-5 -translate-y-1/2 text-gray-400"
                                            size={23}
                                        />
                                        <Input
                                            type={isView ? "text" : "password"}
                                            placeholder="password"
                                            className="bg-white py-5 px-4  pl-10 mb-2 w-72 md:w-full"
                                            {...field}
                                        />
                                        {isView ? (
                                            <Icons.FaRegEye
                                                className="absolute right-4 bottom-3 -translate-y-1/2 z-10 cursor-pointer text-gray-500"
                                                onClick={handleClickVisibility}
                                            />
                                        ) : (
                                            <Icons.FaRegEyeSlash
                                                className="absolute right-4 bottom-3 -translate-y-1/2 z-10 cursor-pointer text-gray-500"
                                                onClick={handleClickVisibility}
                                            />
                                        )}
                                    </div>
                                </FormControl>

                                <div className=" w-96 ml-5">

                                <FormMessage className="text-xs mb-2 text-red-950 font-semibold " />
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative w-auto md:w-md">
                                        <Icons.CiLock
                                            className="absolute left-3 top-5 -translate-y-1/2 text-gray-400"
                                            size={23}
                                        />
                                        <Input
                                            type={isView ? "text" : "password"}
                                            placeholder="Confirm Password"
                                            className="bg-white py-5 px-4  pl-10 mb-2 w-full"
                                            {...field}
                                        />
                                        {isView ? (
                                            <Icons.FaRegEye
                                                className="absolute right-4 bottom-3 -translate-y-1/2 z-10 cursor-pointer text-gray-500"
                                                onClick={handleClickVisibility}
                                            />
                                        ) : (
                                            <Icons.FaRegEyeSlash
                                                className="absolute right-4 bottom-3 -translate-y-1/2 z-10 cursor-pointer text-gray-500"
                                                onClick={handleClickVisibility}
                                            />
                                        )}
                                    </div>
                                </FormControl>

                                <div className=" w-96 ml-5">

                                <FormMessage className="text-xs mb-2 text-red-950 font-semibold  " />
                                </div>
                            </FormItem>
                        )}
                    />

                    <div className="">

                     <p className="text-gray-500 text-xs  md:w-md text-center my-5">
                        Password must be at least 8 characters, include an uppercase letter and a number
                    </p>
                    </div>
                        


                    <div className="flex items-center justify-center w-72 md:w-full">

                        <BtnCommon
                            text="Reset Password"
                            type="submit"
                            loading={loading}
                            className="rounded-lg w-60 md:w-96 mt-4 
                                        transition-all duration-700 ease-in-out 
                                        hover:from-gold-dark hover:to-[55%]
                                                    capitalize "
                        />
                    </div>
                </form>
            </Form>
        </WrapperBg>
    </>
}
