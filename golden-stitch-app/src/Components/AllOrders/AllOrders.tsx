import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';

export default function AllOrders() {
    const { userId } = useContext(AuthContext);
    const [allOrders, setAllOrders] = useState([]);
    const [userInfo, setUserInfo] = useState({});

    const getAllOrders = async () => {
        if (!userId) {
            console.log('User ID is null');
            return;
        }

        try {
            const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
            console.log(res.data);
            setAllOrders(res.data); 
            
            if (res.data.length > 0) {
                const { user } = res.data[0];
                setUserInfo({user})
            }

        } catch (err) {
            console.log(err + ' allorders error');
        }
    }

    useEffect(() => {
        if (userId) {
            getAllOrders();
        }
    }, [userId]);

    return (
        <>
            <h1 className='text-center text-[#16c216] font-bold capitalize text-3xl mt-6'>user Orders</h1>

            <section className='min-h-screen'>
                <div className="container">

                    <div className="relative overflow-x-auto">
                        <div className="user-info rounded-md my-8  bg-[#F0F3F2] flex flex-col gap-3 items-center justify-center mb-5 px-6 py-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <p className='text-[#1c5a1c]'><i className="fa-solid fa-user"></i> User Name: {userInfo.user?.name}</p>
                            <p className='text-[#1c5a1c]'><i className="fa-solid fa-envelope"></i> User Email: {userInfo.user?.email}</p>
                            <p className='text-[#1c5a1c]'><i className="fa-solid fa-phone"></i> User Phone: {userInfo.user?.phone}</p>
                        </div>

                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-md ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr className='border-b-2 border-green-900'>
                                    <th scope="col" className="px-6 py-3 text-center">Image</th>
                                    <th scope="col" className="px-6 py-3 text-center">Product Name</th>
                                    <th scope="col" className="px-6 py-3 text-center">Brands</th>
                                    <th scope="col" className="px-6 py-3 text-center">Category</th>
                                    <th scope="col" className="px-6 py-3 text-center">Price</th>
                                    <th scope="col" className="px-6 py-3 text-center">Payment Method</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allOrders.map((order) =>
                                    order.cartItems.map((item, index) => (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                            <th className="px-6 py-4 ">
                                                <img src={item.product.imageCover} alt={item.product.title} className='w-[100px]' />
                                            </th>
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                                {item.product.title}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {item.product.brand.name}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {item.product.category.name}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {item.price} EGP
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {order.paymentMethodType}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
}
