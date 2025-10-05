import  { useContext, useEffect } from 'react'
import { WishContext } from '../../Context/WishContext';
import { CartContext } from '../../Context/CartContext';
// import { ThreeDots } from 'react-loader-spinner';
import wishList from '../../assets/wishlist.png'
export default function WishList() {
    const { getProWishList, userwishItems ,removeProdWishList,isLoaading } = useContext(WishContext);
    const { addToCart } = useContext(CartContext);
    useEffect(() => {
        getProWishList();
    }, []);
    return <>
        <section className='min-h-screen'>
            <div className="container">
              <h1 className='text-center mt-3 text-3xl font-bold capitalize text-[#36b436]'>your wish list <i className="fa-solid fa-heart"></i> </h1>
                

<div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-9 mb-5">
  <table className="w-full min-h-screen text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr className=' bg-green-600 text-white'>
        
        <th scope="col" className="px-6 py-3 text-center">
          Product
        </th>
        <th scope="col" className="px-6 py-3text-center">
          title
        </th>
        <th scope="col" className="px-6 py-3 text-center">
          Price
        </th>
        <th scope="col" className="px-6 py-3"></th>
        <th scope="col" className="px-6 py-3"></th>
        <th scope="col" className="px-6 py-3"></th>
      </tr>
    </thead>
              <tbody className=''>
                
                {isLoaading ?
                  <tr>
                    <td  colSpan="100%" className="text-center align-middle">
                                    <div className="flex justify-center items-center px-5 w-full min-h-screen">
                  {/* <ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                /> */}
                </div>
                    </td>
                  </tr>
                  : <>
                    
                    {userwishItems.length === 0 ? <tr >
                      <td colSpan="100%" className="text-center align-middle">
                        <div className='flex flex-col  items-center justify-center mt-20 '>
                    
                          <span className="text-lg font-semibold text-gray-500 dark:text-gray-400 capitalize mx-2">your wish list  is Empty</span>
                          <img src={wishList} className="w-32 md:w-48 mt-3" alt="Empty Cart" />
                        </div>
                      </td>
                    </tr> : <>
                      {userwishItems.map((item) => (
                    
                        <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="p-4">
                            <img src={item.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {item.title}
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {item.price} EGP
                          </td>
                          <td className="px-6 py-4">
                            <button onClick={() => { addToCart(item._id) }} className="font-medium text-green-600 hover:text-green-400"><i className="fa-solid fa-cart-plus text-2xl "></i></button>
                          </td>
                          <td className="px-6 py-4">
                            <button onClick={() => { removeProdWishList(item._id) }} className="font-medium text-red-600 hover:text-red-500"><i className="text-2xl fa-solid fa-trash"></i></button>
                          </td>
                        </tr>
                      ))}
                    </>}
                </>}
                      

    </tbody>
  </table>
</div>


            </div>
        </section>

    </>
}
