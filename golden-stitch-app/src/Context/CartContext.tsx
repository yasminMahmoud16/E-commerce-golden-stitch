// import axios from 'axios';
// import  { useEffect, useState } from 'react'
// import { createContext } from 'react'
// import toast from 'react-hot-toast/src';


// export const CartContext = createContext();

// export default function CartContextProvider({ children }) {
//     const [numOfCartItems, setNumOfCartItems] = useState(0);
//     const [userCartItems, setUserCartItems] = useState([]);
//     const [totalPrice, setTotalPrice] = useState();
//     const [cartId, setCartId] = useState();
//         const [isLoading, setIsLoading] = useState(false);

//     const addToCart = async (productId) => {
//     if (!userCartItems) {
//         toast.error("Cart data not loaded yet");
//         return;
//     }

//     const productExists = userCartItems.some(item => item.product?._id === productId);

//     if (productExists) {
//         toast.error("Product is already in the cart");
//         return;
//     }

//     try {
//         const res = await axios.post(
//             "https://ecommerce.routemisr.com/api/v1/cart",
//             { productId },
//             {
//                 headers: { token: localStorage.getItem("token") },
//             }
//         );

//         if (res.data.status === "success") {
//             toast.success("Product Added To Cart");
//             setNumOfCartItems(res.data.numOfCartItems);
//             getCartItems(); // Refresh cart after adding
//         }
//     } catch (err) {
//         console.log(err, "cart context error");
//         toast.error("Something Went Wrong");
//     }
// };


//     // get user cart items
//     const getCartItems = async () => {
//                 setIsLoading(true)

//         try {
            
//             const res = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
//                 headers: {
//                     token: localStorage.getItem('token')
//                 }
//             });
            
//             console.log(res);
//             setUserCartItems(res.data.data.products);
//             setTotalPrice(res.data.data.totalCartPrice);
//             setNumOfCartItems(res.data.numOfCartItems);
//             console.log(res.data.cartId);
//             setCartId(res.data.cartId)
            
//         } catch (err) {
//             console.log(err + 'getCartItems context error');
//         }finally {
//             setIsLoading(false)
//         }
//     };

//     // update cart item increment & decreament & navbar
//     const updateCartItem = async (itemId, count) => {
//         try {
//                     const res = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${itemId}`, {
//                         count
//                     }, {
//                         headers: {
                            
//                             token: localStorage.getItem('token')
//                         }
//                     })
//             console.log(res);
//             if(res.data.status === 'success'){
//                 setUserCartItems(res.data.data.products);
//                 setTotalPrice(res.data.data.totalCartPrice);
//             }
//         }catch(err){
//             console.log(err+'updateCartItem context error');
//         }   

//     };

//     //! remove item from cart
//     const deletCartItem = async (itemId) => {
//         try {
//                     const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${itemId}`, {
//                         headers: {
//                             token: localStorage.getItem('token')
//                         }
//                     })
//             console.log(res);
//             if(res.data.status === 'success'){
//                 setUserCartItems(res.data.data.products);
//                 setTotalPrice(res.data.data.totalCartPrice);
//                 setNumOfCartItems(res.data.numOfCartItems);

//             }
//         }catch(err){
//             console.log(err+'deletCartItem context error');
//         }   

//     };

//     // clear cart

//     const clearCart = async () => {
//         setIsLoading(true)
//     try {
//         const res = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
//             headers: {
//                 token: localStorage.getItem('token')
//             }
//         });

//         getCartItems()
//         return res
//     } catch (err) {
//         console.log(err + ' clearCart context error');
//         toast.error("Failed to clear cart");
//     } finally {
//         setIsLoading(false)
//     }
// };



//         useEffect(() => {
//             getCartItems(); 
//     }, []);
//     return <>
//         <CartContext.Provider value={{setNumOfCartItems, addToCart, numOfCartItems,cartId,getCartItems,userCartItems,updateCartItem,totalPrice,deletCartItem ,isLoading,clearCart}}>
//             {children}
//         </CartContext.Provider>
//     </>
// }
