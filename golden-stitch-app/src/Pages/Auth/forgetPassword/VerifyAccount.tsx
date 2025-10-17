import BtnCommon from "@/common/BtnCommon";
import WrapperBg from "@/common/WrapperBg";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/Components/ui/form";
import type {  OtpField } from "@/Utilities/types";
import { useForm } from "react-hook-form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/Components/ui/input-otp";
import { Input } from "@/Components/ui/input";
import { Icons } from "@/assets/Icons/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyAccount } from "../validation/authValidation";
import useForgetPassword from "@/Hooks/useForgetPassword";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyAccount() {
    const { verifyForgetPassword, loading } = useForgetPassword();
    const navigate = useNavigate();
    const location = useLocation();
    const emailFromState = location.state?.email || "";
    const form = useForm<OtpField>({
            resolver:zodResolver(verifyAccount),
            defaultValues: {
                email:emailFromState,
                otp: "",
            }
    });
    

        
        const handleSubmit = (values:OtpField) => {
            verifyForgetPassword(values)
            navigate("/create-new-password",{state:{email:emailFromState, otp:values.otp}});
        }
    return <>
        <WrapperBg title="Verify Your Identity" subtitle="We’ve sent a 6-digit code to your email, Please enter it below to verify your account">
                                <Form {...form}>
                <form method="POST" onSubmit={form.handleSubmit(handleSubmit)} className="  w-72 md:w-xl md:flex md:flex-col md:items-center md:justify-center">
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
                                    <FormItem className=" flex flex-col items-center justify-center mt-2 md:p-2 ml-4 md:ml-0">
                                        <FormControl >
                                            <div className="px-4">
                                            <InputOTP
                                                maxLength={6}
                                                value={field.value}       
                                                onChange={field.onChange} 
                                            >
                                                <InputOTPGroup>
                                                    <InputOTPSlot className="bg-white rounded-md mr-4  p-3 md:p-5" index={0} />

                                                    <InputOTPSlot className="bg-white rounded-md mr-4  p-3 md:p-5" index={1} />

                                                    <InputOTPSlot className="bg-white rounded-md mr-4  p-3 md:p-5" index={2} />
                                                </InputOTPGroup>

                                                <InputOTPGroup>
                                                    <InputOTPSlot className="bg-white rounded-md mr-4  p-3 md:p-5" index={3} />

                                                    <InputOTPSlot className="bg-white rounded-md mr-4  p-3 md:p-5" index={4} />

                                                    <InputOTPSlot className="bg-white rounded-md mr-4  p-3 md:p-5" index={5} />
                                                </InputOTPGroup>

                                            </InputOTP>

                                            </div>
                                        </FormControl>
                                        <FormMessage  className="mb-2"/>
                                    </FormItem>
                                )}
                            />



                            <div className="flex items-center justify-center w-72 md:w-full ">

                                <BtnCommon
                                    text="verify"
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
