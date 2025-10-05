// import axios from 'axios';
// import  { useContext } from 'react'
// import { useParams } from 'react-router-dom'
// import { useQuery } from "@tanstack/react-query";
// // import {  Oval } from 'react-loader-spinner'
// import { Splide, SplideSlide } from '@splidejs/react-splide';
// import { CartContext } from '../Context/CartContext';

// export default function ProductDetails() {


//   const {addToCart}= useContext(CartContext)
  
//   const {id} = useParams();
//   console.log(id);  



//   const getDetailds = async () => { 
//     return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    
//   }

//   const { data ,isLoading } = useQuery({
//     queryKey: ['productDetails', id],
//     queryFn: getDetailds,
//     // cacheTime: 0
//   });

//   const details = data?.data.data;
//   console.log(details);
//     const   rate = Math.floor(details?.ratingsAverage);

  
//   return <>
//     <div className="container">
//       {isLoading ? <div className='flex flex-col items-center justify-center mt-8 h-screen '>
//         <h2 className='capitalize mb-5'>loading...</h2>
//                           {/* <Oval
//                                           visible={true}
//                                           height="80"
//                                           width="80"
//                                           color="#4fa94d"
//                                           ariaLabel="oval-loading"
//                                           wrapperStyle={{}}
//                                           wrapperClass=""
//                                           /> */}
//                         </div>:    
//               <div className='my-16 '>
//                   <div className='grid grid-cols-6 items-center ' >
//             <div className="col-span-3" key={details._id}>



//               <Splide aria-label="My Favorite Images" key={details._id}
//               options={{
//               type: 'loop',
//                 autoplay: true,
//                 interval: 2500,
//                 arrows: false,
                
//               }} >
                
//                     {details?.images.map((image,index) => {
//                       return <SplideSlide key={index} >
//                         <img src={image} className='w-full h-96' alt={image.title} />
//                       </SplideSlide>
//                     })}
              

//               </Splide>
//                     </div>

//                     <div className='col-span-3 flex flex-col gap-2'>
//               <h1 className='text-3xl text-[#125012]' >{details?.title}</h1>
//               <div className='flex items-center gap-1'>
//                     {Array.from({ length: rate },(_, index)=>{
//                                                   return <svg key={index} className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
//                                                           <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
//                                                       </svg>
//                     })}
//                 <span>{details.ratingsAverage}</span>
//               </div>
//               <span className='text-[#16C216] font-bold text-xl'>{details?.price} <span className='text-gray-900'>EGP</span> </span>
//               <h5 className='text-[#125012] font-bold uppercase text-sm' >description</h5>
//               <p className='text-[#0d440d]'>{details?.description}</p>

//               <h5 className='text-[#125012] font-bold uppercase text-sm' >category</h5>
//               <span className='text-[#0d440d] mb-3'>{details?.category.name}</span>
              
              
//               <button onClick={()=>{addToCart(id)}}  className='bg-green-500 text-white px-4 py-2 rounded-lg transition-all hover:bg-green-400'>+Add to cart</button>
//                     </div>

//                   </div>
//               </div>

//             }

//       </div>
//   </>
// }
