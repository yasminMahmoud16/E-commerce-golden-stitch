import { Icons } from "@/assets/Icons/icons";
import BtnCommon from "@/common/BtnCommon";
import WrapperBg from "@/common/WrapperBg";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import useForgetPassword from "@/Hooks/useForgetPassword";
import type { forgetPasswordField } from "@/Utilities/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { sendForgetPasswordValidation } from "../validation/authValidation";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {

    const { sendForgetPassword, loading } = useForgetPassword();
    const navigate = useNavigate();
    const form = useForm<forgetPasswordField>({
            resolver:zodResolver(sendForgetPasswordValidation),
            defaultValues: {
                email: "",
            }
        });
    
    
    const handleSubmit = async(values:forgetPasswordField) => {
        await sendForgetPassword(values)
        navigate("/verify-account",{state:{email:values.email}});
    }
    return <>
        <WrapperBg title="Forgot Password?" subtitle="Don't worry, we'll help you reset it.">
                                <Form {...form}>
                        <form method="POST" onSubmit={form.handleSubmit(handleSubmit)}className="  w-72 md:w-xl md:flex md:flex-col md:items-center md:justify-center">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="relative w-72 md:w-md">
                                                <Icons.MdOutlineMail
                                                    className="absolute left-3 top-5 -translate-y-1/2 text-gray-400"
                                                    size={23}
                                                />
                                                <Input
                                                    type="text"
                                                    placeholder="email"
                                                    className="bg-white py-5 px-4 pl-10 mb-2 placeholder:text-gray-400" 
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage  className="mb-2 capitalize text-xs text-red-500 text-center"/>
                                    </FormItem>


                                )}
                            />



                            <div className="flex items-center justify-center mt-2 w-72 md:w-full">

                                <BtnCommon
                                    text="Reset Password"
                            type="submit"
                            loading={loading}
                                    className="rounded-lg w-60 md:w-96mt-4 
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
