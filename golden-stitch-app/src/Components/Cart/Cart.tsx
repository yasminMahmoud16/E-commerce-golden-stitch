// import  { useContext, useEffect } from 'react'
// // import { CartContext } from '../Context/CartContext';
// // import emptyCaart from '../../assets/empty-cart (1).png'
// import { Link } from 'react-router-dom';
// // import {  ThreeDots } from 'react-loader-spinner';
// export default function Cart() {

    
//     // const { getCartItems, userCartItems, updateCartItem, totalPrice, deletCartItem ,isLoading,clearCart} = useContext(CartContext);
    
//     // useEffect(() => {
//     //     getCartItems();
//     // }, []);
//     return <>
//         <h1 className='text-3xl capitalize text-center mt-5 font-bold text-[#16C216]'>shopping bag</h1>

//         <section className='my-10'>
//             <div className="container">
                

//                 <div className='grid items-center md:items-start grid-cols-1 md:grid-cols-6 gap-4 '>

//                                 <div className="relative overflow-x-auto  shadow-md sm:rounded-lg h-screen  md:col-span-4">
//                                     <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-10 ">
//                                         <thead className="text-xs border-b-2 border-solid border-gray-300  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                                         <tr>

//                                             <th scope="col" className="px-6 py-3 text-gray-500">
//                                             Product
//                                             </th>
//                                             <th scope="col" className="px-6 py-3 text-gray-500">
//                                             title
//                                             </th>
//                                             <th scope="col" className="px-6 py-3 text-gray-500">
//                                             quantity
//                                             </th>
//                                             <th scope="col" className="px-6 py-3 text-gray-500">
//                                             Price
//                                             </th>

//                                         </tr>
//                                         </thead>
//                             <tbody >
//                                 {isLoading? <tr>
//                     <td  colSpan="100%" className="text-center align-middle">
//                                     <div className="flex  justify-center items-center px-5 w-full min-h-screen">
//                         {/* <ThreeDots
//                         visible={true}
//                         height="80"
//                         width="80"
//                         color="#4fa94d"
//                         radius="9"
//                         ariaLabel="three-dots-loading"
//                         wrapperStyle={{}}
//                         wrapperClass=""
//                                 /> */}
//                                 </div>
//                                     </td>
//                                 </tr>: <>
//                                     {userCartItems.length === 0 ? <tr >
//                                     <td colSpan="100%" className="text-center align-middle">
//                                         <div className='flex  items-center justify-center mt-20 '>

//                                                 <img src={emptyCaart} className="w-32 md:w-48 mt-3" alt="Empty Cart" />
//                                                 <span className="text-lg font-semibold text-gray-500 dark:text-gray-400 capitalize mx-2">your Cart is Empty</span>
//                                         </div>
//                                             </td>
//                                         </tr>: <>
//                                             {userCartItems?.map((item) => (
                                            
//                                         <tr key={item.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
//                                             <td className="p-4">
//                                             <img src={item.product.imageCover}  className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
//                                             </td>
//                                             <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
//                                             {item.product.title} 
//                                             </td>
//                                             <td className="px-6 py-4">
//                                             <div className="flex items-center">
//                                                 <button disabled={item.count===1} onClick={()=>{updateCartItem(item.product.id,item.count -1)}} className="inline-flex items-center justify-center p-1 me-3 cursor-pointer text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
//                                                 <span className="sr-only">Quantity button</span>
//                                                 <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
//                                                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
//                                                 </svg>
//                                                 </button>
//                                                 <div>
//                                                             <span>{item.count }</span>
//                                                 </div>
//                                                 <button onClick={()=>{updateCartItem(item.product.id,item.count +1)}} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
//                                                 <span className="sr-only">Quantity button</span>
//                                                 <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                                                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
//                                                 </svg>
//                                                 </button>
//                                             </div>
//                                             </td>
//                                             <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
//                                             {item.price} EGP
//                                                     </td>
                                                    
//                                             <td className="px-6 py-4">
//                                             <i onClick={()=>{deletCartItem(item.product.id)}}  className=" fa-solid fa-trash text-xl font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline"></i>
//                                             </td>
//                                         </tr>
//                                         ))}
//                                         </>}
//                                 </>}


//                                         </tbody>

//                         </table>
//                         <div className="mt-4 text-center flex ">
//                             <button onClick={()=>clearCart()} className="  flex items-center justify-center gap-2 text-white bg-green-800 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-600 font-medium rounded-sm text-sm w-full  px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
//                                 clear cart 
//                                 {isLoading ? <div role="status">
//                                             <svg aria-hidden="true" className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
//                                             <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
//                                             </svg>
//                                     </div> :null
//                                         }
//                             </button>
//                         </div>
                            
//                                 </div>
//                         <div className=' mx-auto md:col-span-2 '>
                            

//                             <div className="max-w-sm p-6 flex flex-col gap-4 bg-[#c0d7c0] border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
//                                 <div className='cart-header border-b-2 border-gray-500'>
//                                     <h1 className='text-3xl mb-3 capitalize font-semibold'>order summary</h1>
//                                 </div>

//                                 <div className='card-body flex flex-col gap-3'>
//                                     <div className='flex justify-between'>

//                                         <p>subtotal: </p>
//                                         <span>{ totalPrice}</span>
//                                     </div>
//                                     <div className='flex justify-between'>

//                                         <p>shipping: </p>
//                                         <span>free</span>
//                                     </div>
//                                 </div>
//                                 <div className="card-footer border-t-2 border-gray-500">
//                                     <div className='flex justify-between'>
//                                         <p>total: </p>
//                                         <span>{ totalPrice} EGP</span>
//                                 </div>
//                                 <div className="btns mt-4 flex items-center justify-evenly">
//                                     <Link to={'/payment'} >
//                                         <button type="button" className=" capitalize focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">countinue your order</button>
//                                     </Link>

//                                 </div>
//                                 </div>

//                             </div>


//                         </div>
//                 </div>


//             </div>
//         </section>
//     </>
// }
