// import axios from 'axios';
// import  { createContext, useEffect, useState } from 'react'
// import toast from 'react-hot-toast/src';

//  export const WishContext = createContext();
// export default function WishContextProvider({ children }) {

//     const [wishItems, setWishIems] = useState([]);
//     const [userwishItems, setUserWishIems] = useState([]);
//     const [wishListNumber, setWishListNumber] = useState(0);
//     const [isLoaading, setIsLoading] = useState(false);

//     // add products to wishlist
//     const addToWishList = async (productId) => {
//         try {
            
//             const res = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
//                 productId
//             }, {
//                 headers: {
//                     token: localStorage.getItem('token')
//                 }
//             });

            
//             if (res.data.status === 'success') {
//                 toast.success('Product Added To Wishlist');
//                 setWishIems(prev => [...prev, productId])

//                 localStorage.setItem('wishItems',JSON.stringify(getProWishList))
//                 getProWishList();


//                 console.log(res);
//             }
//         } catch (err) {
//             console.log(err, 'wish context error');
            
//         }
//     }
    
//         // get products from wishlist

//     const getProWishList = async () => {
//             setIsLoading(true)
//             try {
//                 const res = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
//                     headers: {
//                         token: localStorage.getItem('token')}
                    
//                 })
//                 const wishId = res.data.data.map(item => item._id); // Extract product IDs

//                     console.log(res);
//                 setUserWishIems(res.data.data);
//                 setWishIems(wishId)
//                 setWishListNumber(res.data.count);
//                 localStorage.setItem('wishItems', JSON.stringify(wishId))
                
//             } catch (err) {
//                 console.log(err, 'getProWishList context error');
//             } finally {
//                 setIsLoading(false);
//             }
//     };


    
//     //! remove product from wishlist
//     const removeProdWishList = async (productId) => {
//         try {
            
//             const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
//                 headers: {
//                     token: localStorage.getItem('token')
//                 }
//             });
//             console.log(res);
//             if (res.data.status === 'success') {
//                 toast.success('Product Removed From Wishlist');
//                 setWishIems(prev => prev.filter(id => id !== productId));
//                 localStorage.setItem('wishItems', JSON.stringify(getProWishList));

//             getProWishList(); 
//             }

//         } catch (err) {
//             console.log(err, 'removeProdWishList context error');
            
//         }
//     }

    

//     useEffect(() => {
//         const storedWishItems = JSON.parse(localStorage.getItem('wishItems'));
//         console.log(storedWishItems);
        
//         if (storedWishItems) {
//             setWishIems(storedWishItems);
//         }
//             getProWishList(); 
//         }, []);

//     return <>
//         <WishContext.Provider value={{addToWishList,wishListNumber,wishItems,getProWishList,userwishItems,removeProdWishList,isLoaading}}>
//             {children}
//         </WishContext.Provider>
//     </>
// }
