import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"
import { Input } from "@/Components/ui/input";
import { useForm } from "react-hook-form";
import BtnCommon from "@/common/BtnCommon";
import { useState } from "react";
import { Icons } from "@/assets/Icons/icons";
import type { signupFields } from "@/Utilities/types";
import useSignup from "@/Hooks/useSignup";
import { signupSchema } from "../validation/authValidation";
import { zodResolver } from "@hookform/resolvers/zod";





export default function SignUp() {
  const { signup,loading } = useSignup();
const [isViewPassword, setIsViewPassword] = useState(false);
const [isViewConfirm, setIsViewConfirm] = useState(false);

const handleTogglePassword = () => setIsViewPassword((prev) => !prev);
const handleToggleConfirm = () => setIsViewConfirm((prev) => !prev);
  const form = useForm<signupFields>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      gender: undefined,
    }
  });
    const handleSubmit = async (values: signupFields) => {
    await signup(values); 
  };
  return <>

    
    <div className="flex flex-col items-center justify-center mt-10  py-4">
      <h2 className="text-3xl capitalize font-bold text-center text-dark-blue-1 md:text-4xl">create account</h2>
      <Form {...form} >
        <form className="p-8 flex flex-col  " method="POST" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
                control={form.control}
                name="username"

                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-dark-blue-nav">name</FormLabel>
                    <FormControl>
                      <div className="relative w-72 md:w-md">
                                                <Icons.MdOutlineDriveFileRenameOutline
                                                    className="absolute left-3 top-5 -translate-y-1/2 text-gray-400"
                                                    size={23}
                                                />
                                                <Input
                                                    type="text"
                                                    placeholder="username"
                                                    className="bg-white py-5 px-4 pl-10 mb-2 placeholder:text-gray-400" 
                                                    {...field}
                                                />
                                            </div>
                    </FormControl>
                    <FormMessage className="mb-2" />
                  </FormItem>
                )}
              />
           <FormField
                control={form.control}
                name="email"

                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-dark-blue-nav">email</FormLabel>
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
                    <FormMessage className="mb-2" />
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
                                  type={isViewPassword  ? "text" : "password"}
                                  placeholder="password"
                                  className="bg-white py-5 px-4  pl-10 mb-2 w-full"
                                  {...field}
                                />
                                {isViewPassword  ? (
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
                name="phone"

                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-dark-blue-nav">phone</FormLabel>
                    <FormControl>

                      <div className="relative w-72 md:w-md">
                                                <Icons.CiPhone
                                                    className="absolute left-3 top-5 -translate-y-1/2 text-gray-400"
                                                    size={23}
                                                />
                                                <Input
                                                    type="text"
                                                    placeholder="phone"
                                                    className="bg-white py-5 px-4 pl-10 mb-2 placeholder:text-gray-400" 
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
            name="gender"

            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark-blue-nav">Gender</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-[180px] bg-white">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">male</SelectItem>
                      <SelectItem value="female">female</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage  className="mb-2"/>
              </FormItem>
            )}
          />
         <BtnCommon
  text="SIGN UP"
            type="submit"
            loading={loading} 
            className="
  mt-4 
    bg-gradient-to-l from-dark-blue-1 to-dark-blue-nav
     transition-all duration-700 ease-in-out
              hover:from-dark-blue-2 hover:to-[50%]
  "
/>
        </form>
      </Form>
    </div>
  </>
}
