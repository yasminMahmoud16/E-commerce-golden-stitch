import { Icons } from '@/assets/Icons/icons'
import BtnCommon from '@/common/BtnCommon'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form'
import { Input } from '@/Components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/Components/ui/radio-group'
import type { order } from '@/Utilities/types'
import { useForm } from 'react-hook-form'
import shipping from "@/assets/Images/shipping.png"
export default function OrderComplete() {
      const form = useForm<order>({
        // resolver: zodResolver(signupSchema),
        defaultValues: {
          email: "",
          address: "",
          phone: "",
          paymentMethod:undefined,
        }
      });
        const handleSubmit = async (values: order) => {
        // await signup(values); 
      };
  return <>
    <div className='container'>
      <h1 className='block md:hidden text-center text-3xl font-semibold text-dark-blue-2'>complete your order</h1>
        <Form {...form} >
        <form className="p-8 flex flex-col  items-center justify-center   " method="POST" onSubmit={form.handleSubmit(handleSubmit)}>

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
                name="address"

                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-dark-blue-nav">address</FormLabel>
                    <FormControl>
                      <div className="relative w-72 md:w-md">
                                                <Icons.MdOutlineDriveFileRenameOutline
                                                    className="absolute left-3 top-5 -translate-y-1/2 text-gray-400"
                                                    size={23}
                                                />
                                                <Input
                                                    type="text"
                                                    placeholder="address"
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
                name="paymentMethod"

                render={({ field }) => (
                  <FormItem className='  w-72 md:w-96 flex items-center  gap-4'>
                    <div>
                    <FormLabel className="text-dark-blue-nav font-semibold text-2xl">payment Method</FormLabel>
                      <img src={shipping} alt=""  />
                    </div>
                    <FormControl className=''>

                      <RadioGroup defaultValue="cash"
                        onValueChange={field.onChange}   
                        value={field.value}   
                        >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="cash" id="cash" />
                          <Label htmlFor="cash" className='capitalize'>cash</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="credit" id="credit" />
                          <Label htmlFor="credit" className='capitalize'>credit</Label>
                        </div>
                  </RadioGroup>
                    </FormControl>
                    <FormMessage  className="mb-2"/>
                  </FormItem>
                )}
              />

          <div>

                  <BtnCommon
            text="confirm your order"
                      type="submit"
                      // loading={loading} 
                      className=" w-90 rounded-md
            mt-4 
              bg-gradient-to-l from-dark-blue-1 to-dark-blue-nav
              transition-all duration-700 ease-in-out
                        hover:from-dark-blue-2 hover:to-[50%]
            "
          />
          </div>
        </form>
      </Form>
      </div>
    </>
}
