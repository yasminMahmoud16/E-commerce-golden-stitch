import { Form, FormControl, FormField, FormItem, FormMessage } from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/Components/ui/input-otp";
import type { confirmAccountField } from "@/Utilities/types";
import { useForm } from "react-hook-form";
import BtnCommon from "@/common/BtnCommon";
import { Icons } from "@/assets/Icons/icons";
import WrapperBg from "@/common/WrapperBg";
import useSignup from "@/Hooks/useSignup";
export default function ConfirmAccount() {
    const { confirmAccount ,confirmLoading} = useSignup();

    const form = useForm<confirmAccountField>({
        defaultValues: {
            email: "",
            otp: ""
        }
    });

    const handleSubmit = (values:confirmAccountField) => {
        confirmAccount(values)
    }

    return (
        <WrapperBg title="confirm your account" subtitle="We’ve sent a 6-digit code to your email, Please enter it below to confirm your account">


                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="  w-72 md:w-xl md:flex md:flex-col md:items-center md:justify-center">
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
                                        <FormMessage />
                                    </FormItem>


                                )}
                            />
                            <FormField
                                control={form.control}
                                name="otp"
                                render={({ field }) => (
                                    <FormItem className=" flex items-center justify-center mt-2 p-2">
                                        <FormControl >
                                            <InputOTP

                                                maxLength={6}
                                                value={field.value}       // controlled value
                                                onChange={field.onChange} // update RHF
                                            >
                                                <InputOTPGroup>
                                                    <InputOTPSlot className="bg-white rounded-md mr-4 p-3 md:p-5" index={0} />

                                                    <InputOTPSlot className="bg-white rounded-md mr-4 p-3 md:p-5" index={1} />

                                                    <InputOTPSlot className="bg-white rounded-md mr-4 p-3 md:p-5" index={2} />
                                                </InputOTPGroup>

                                                <InputOTPGroup>
                                                    <InputOTPSlot className="bg-white rounded-md mr-4 p-3 md:p-5" index={3} />

                                                    <InputOTPSlot className="bg-white rounded-md mr-4 p-3 md:p-5" index={4} />

                                                    <InputOTPSlot className="bg-white rounded-md mr-4 p-3 md:p-5" index={5} />
                                                </InputOTPGroup>

                                            </InputOTP>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <div className="flex items-center justify-center w-72 md:w-full">

                                <BtnCommon
                                    text="Confirm"
                            type="submit"
                            loading={confirmLoading}
                                    className="rounded-lg w-60 md:w-96 mt-4 
                                        transition-all duration-700 ease-in-out 
                                        hover:from-gold-dark hover:to-[55%]
                                                        "
                                />
                            </div>
                        </form>
                    </Form>


        </WrapperBg>
    );
}
