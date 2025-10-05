// // import { Oval } from 'react-loader-spinner';
// import useCategory from '../../Hooks/useCategory';
// import SubCatOnCategories from '../SubCatOnCategories/SubCatOnCategories';
// import { useRef, useState } from 'react';

// export default function Categories() {

  
//   const { categoriesData,catLoading } = useCategory();
//   const [btnNav, setBtnNav] = useState(false);
//   const [categoryId, setCategoryId] = useState(null);
//   const subCategoryRef = useRef(null);
  
//   const handleCatClick = (id) => {
//     setBtnNav(true);
//     setCategoryId(id);

//     setTimeout(() => {
//       subCategoryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     },100)
//   }
//   return (
//     <>
//       <section className='min-h-screen'>

//           <h1 className="text-center uppercase font-bold text-3xl mt-6 text-[#16C216]">
//             Our Categories
//           </h1>

//         <div className="container">
          
//           {catLoading?<div className='flex items-center justify-center min-h-screen'>
//                           {/* <Oval
//                           visible={true}
//                           height="80"
//                           width="80"
//                           color="#4fa94d"
//                           ariaLabel="oval-loading"
//                           wrapperStyle={{}}
//                           wrapperClass=""
//                           /> */}
//           </div> : <>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-6 my-16">
          
//               {categoriesData?.map((cat) => (
//                 <div key={cat._id} onClick={() => {
//                     handleCatClick(cat._id)
                  
//                   }} className="text-white font-medium rounded-lg text-sm px-5 py-2.5  flex flex-col items-center justify-center transition-transform duration-300 transform hover:scale-105 cursor-pointer hover:border-4 hover:border-green-400" type="button" data-drawer-target="drawer-navigation" data-drawer-show="drawer-navigation" aria-controls="drawer-navigation">
//                     <img src={cat.image} alt={cat.name} className="h-auto max-w-full rounded-lg" />
//                     <h2 className="text-center text-xl font-semibold text-[#145114] ">{cat.name}</h2>
//                   </div>
//               ))};
//             </div>
              
//           </>}

//             <div ref={subCategoryRef}>

//             <SubCatOnCategories setBtnNav={setBtnNav} btnNav={btnNav} categoryId={ categoryId} />
//             </div>
//           </div>
//       </section>
      
//     </>
//   );
// }
