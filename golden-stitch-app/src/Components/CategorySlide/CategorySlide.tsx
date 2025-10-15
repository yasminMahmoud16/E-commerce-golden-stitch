// import { Swiper, SwiperSlide } from 'swiper/react';
// import useCategory from '../../Hooks/useCategory';


// export default function CategorySlide() {

//     const { categoriesData}=useCategory();

    
//     return <>



//     <Swiper loop={true} slidesPerView={6}>
//       {categoriesData?.map((cat) => (
//         <SwiperSlide key={cat._id}>
//           <div className="flex flex-col items-center gap-2 mt-7">
//             <img
//               src={cat.image}
//               alt={cat.name}
//               className="h-[100px] w-[100px] md:h-[160px] md:w-[160px] object-cover"
//               style={{ borderRadius: "50%" }}
//             />
//             <h5 className="text-center">{cat.name}</h5>
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>


//     </>
// }
