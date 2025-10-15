import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";

import { Input } from "@/Components/ui/input";

import { useForm } from "react-hook-form";
import BtnCommon from "@/common/BtnCommon";
import { Checkbox } from "@/Components/ui/checkbox";
import { useState } from "react";


import { Icons } from "@/assets/Icons/icons";
import type { loginFields } from "@/Utilities/types";

import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validation/authValidation";
import { Link } from "react-router-dom";
import useGlobal from "@/Hooks/useGlobal";
import { useAuthContext } from "@/Hooks/useAppContexts";




export default function LoginInput() {
  const { login, loading } = useAuthContext();
  const [isView, setIsView] = useState(false);
  const {navigate} =useGlobal()

  const handleClickVisibility = () => {
    setIsView(!isView);
    console.log(isView)
  }
const form = useForm<loginFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const handleSubmit = async (values: loginFields) => {
        const success = await login(values);
    if (success) {
      navigate("/")  
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-10  py-4 ">
        <h2 className="text-3xl capitalize font-bold text-center text-dark-blue-1 md:text-4xl">
          Sign in
        </h2>
        <Form {...form}>
          <form method="POST" className="p-8 flex flex-col  items-center justify-center" onSubmit={form.handleSubmit(handleSubmit)}>

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
                        type={isView ? "text" : "password"}
                        placeholder="password"
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

                  <FormMessage className="text-xs w-96 mb-2" />
                </FormItem>
              )}
            />


            <div className="flex items-center justify-between w-xs md:w-md text-xs md:text-sm px-3 capitalize mb-2 text-dark-blue-2 ">
              <div className="flex  items-center justify-center gap-2  ">
                <Checkbox
                  id="remember"
                  className="cursor-pointer border-gold-light data-[state=checked]:bg-gold-light data-[state=checked]:text-white"
                />
                <label htmlFor="remember" className="cursor-pointer ">
                  remember me
                </label>
              </div>
              <Link to={"/forget-password"}>
              <p className="cursor-pointer transition-all duration-300 ease-in-out hover:underline hover:text-gold-dark">forget password </p>
              </Link>
            </div>

            <div className=" flex items-center justify-center mb-3 md:mb-0">



              <BtnCommon
                text="Login"
                type="submit"
                loading={loading}
                className="
                            mt-4 
                              bg-gradient-to-l from-dark-blue-1 to-dark-blue-nav
                              transition-all duration-700 ease-in-out
                                        hover:from-dark-blue-2 hover:to-[50%]
                                        relative z-90
                            "
              />
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
