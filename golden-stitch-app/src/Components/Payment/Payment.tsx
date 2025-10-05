// import { useEffect } from "react";
import useCash from "../../Hooks/useCash";
import payment from "../../assets/payment.jpg";
// import toast from "react-hot-toast";

export default function Payment() {
    const { formik, setPaymentWay, errMsg, succMsg } = useCash();

    return (
        <>
            <section className="min-h-screen flex items-center">
                <div className="container">
                    <div className="grid md:grid-cols-6 items-center justify-center">
                        <div className="col-span-3">
                            <form className="max-w-md mx-auto md:relative" onSubmit={formik.handleSubmit}>
                                <h1 className='capitalize mb-7 text-3xl text-[#16c216] font-semibold'>Payment Details</h1>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.shippingAddress.details}
                                        type="text"
                                        name="shippingAddress.details"
                                        id="details"
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#0aad0a] peer"
                                        placeholder=" "
                                        required
                                        autoComplete="new-password"
                                    />
                                    <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-[#0aad0a]">Address Details</label>
                                    {formik.errors.shippingAddress?.details && formik.touched.shippingAddress?.details && (
                                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
                                            {formik.errors.shippingAddress.details}
                                        </div>
                                    )}
                                </div>

                                <div className="grid md:grid-cols-2 md:gap-6">
                                    <div className="relative z-0 w-full mb-5 group">
                                        <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.shippingAddress.phone}
                                            type="tel"
                                            name="shippingAddress.phone"
                                            id="phone"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#0aad0a] peer"
                                            placeholder=" "
                                            required
                                        />
                                        <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-[#0aad0a]">Phone Number (123-456-7890)</label>
                                        {formik.errors.shippingAddress?.phone && formik.touched.shippingAddress?.phone && (
                                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
                                                {formik.errors.shippingAddress.phone}
                                            </div>
                                        )}
                                    </div>
                                    <div className="relative z-0 w-full mb-5 group">
                                        <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.shippingAddress.city}
                                            type="text"
                                            name="shippingAddress.city"
                                            id="city"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#0aad0a] peer"
                                            placeholder=" "
                                            required
                                        />
                                        <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-[#0aad0a]">City</label>
                                        {formik.errors.shippingAddress?.city && formik.touched.shippingAddress?.city && (
                                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
                                                {formik.errors.shippingAddress.city}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <div className='flex flex-wrap gap-4'>
                                    
                                    
                                    <button onClick={() => setPaymentWay('cash')} className="text-white bg-[#0aad0a] hover:bg-[#16c216] font-medium rounded-lg text-sm px-5 py-2.5">
                                        Cash Payment
                                    </button>
                                    <button onClick={() => setPaymentWay('visa')} className="text-white bg-[#0aad0a] hover:bg-[#16c216] font-medium rounded-lg text-sm px-5 py-2.5">
                                        Visa Payment
                                    </button>
                                </div>
                                    <div className="mt-6">

                                    {errMsg && <span className='p-4 mb-6 text-md font-semibold capitalize text-red-900'>{errMsg}</span>}
                                    {succMsg && <div className="p-4 text-md font-semibold capitalize text-green-600">{succMsg}</div>}
                                    </div>
                            </form>
                        </div>

                        <div className="col-span-3 w-[400px] py-14">
                            <img src={payment} alt="Payment" className="w-full" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
