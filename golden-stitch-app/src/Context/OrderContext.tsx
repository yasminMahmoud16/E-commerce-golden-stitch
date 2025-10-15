// import { createContext, useEffect, useState, type ReactNode } from 'react'
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { useAxios } from '@/Hooks/useAxios';
// import { toast } from 'sonner';
// import { useAuthContext } from '@/Hooks/useAppContexts';

// export const OrderContext = createContext(undefined);

// export default function OrderContextProvider({ children }: { children: ReactNode }) {
//   const axiosInstance = useAxios();
//   const [page, setPage] = useState(1);
//   const [size, setSize] = useState(5);
//   const [search, setSearch] = useState("");
//   const [isUpdating, setIsUpdating] = useState(false); 
//   // const {getAuthHeader}= useAuthContext
//     const { getAuthHeader } = useAuthContext();

// //   const queryClient = useQueryClient();

//   // 🔹 Get All orders
//   const getOrders = async () => {
//     try {
//       const res = await axiosInstance.get(`/order`, {
//         headers:getAuthHeader()
//       })
//       console.log({orderRes:res});
      
//     } catch (error) {
//       console.log({orderError:error});
      
//     }
//   }
//   // const getAllOrders = async () => {
//   //   try {
//   //     const res = await axiosInstance.get(
//   //       `/order`,{
//   //       headers: {Authorization:getAuthHeader()}
//   //     });
//   //   // console.log(res.data.data.categories.docs);
//   //   console.log({orders:res});
    
//   //   return res;
//   //   } catch (error) {
//   //     console.log(error);
      
//   //   }
//   // };

//   useEffect(() => {
//     getOrders()
//   },[])


//   // const { data: allOrders, isLoading } = useQuery({
//   //   queryKey: ['allOrders', page, size, search],
//   //   queryFn: () => getAllOrders({ page, size, search }),
//   //   keepPreviousData: true,
//   // });

//   // 🔹 Get category by ID
// //   const getOrderById = async (id: string) => {
// //     const res = await axiosInstance.get(`/order/${id}`);
    
// //     console.log({getOrderById:res});
// //     return res.data.data.category;
// //   };

//   // 🔹 Update Category
//   // const updateCategory = useMutation({
//   //   mutationFn: async (data: any) => {
//   //     setIsUpdating(true); // 🌀 يبدأ التحميل

//   //     const formData = new FormData();
//   //     formData.append("name", data.name);
//   //     formData.append("description", data.description);
//   //     if (data.attachment?.[0]) {
//   //       formData.append("attachment", data.attachment[0]);
//   //     }

//   //     const res = await axiosInstance.patch(`/category/${data.id}`, formData, {
//   //       headers: getAuthHeader(),
//   //     });
//   //     return res.data.data.category;
//   //   },

//   //   onSuccess: (updatedCategory) => {
//   //     toast.success("Category updated successfully!");

//   //     
//   //     queryClient.setQueryData(['allCategories', page, size, search], (oldData: any) => {
//   //       if (!oldData) return;
//   //       return oldData.map((cat: any) =>
//   //         cat.id === updatedCategory.id ? updatedCategory : cat
//   //       );
//   //     });

//   //     queryClient.setQueryData(['category', updatedCategory.id], updatedCategory);
//   //   },

//   //   onSettled: () => {
//   //     setIsUpdating(false); // 
//   //   },

//   //   onError: (error: any) => {
//   //     const detailedError = error?.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;
//   //     const generalError = error?.response?.data?.message;
//   //     toast.error(detailedError || generalError || "Something went wrong");
//   //   },
//   // });



//     // soft Delete
  
//     // const cancelOrder = async (id: string): Promise<string> => {
//     //   try {
//     //     const res = await axiosInstance.patch(`/order/${id}/cancel`, {
//     //       headers: getAuthHeader(),
//     //     });
//     //     console.log({ cancelOrder: res });
//     //     if (res.data.message === "Done") {
  
//     //       // Swal.fire({
//     //       //   title: "The Category Deleted Successfully",
//     //       //   icon: "success",
//     //       //   draggable: true,
//     //       //   background: "#182129",
//     //       //   color: "#ffff",
//     //       //   confirmButtonColor: "#6B4129"
//     //       // });
  
//     //        await queryClient.invalidateQueries({ queryKey: ['allOrders'] });
  
  
//     //     }
  
  
  
  
//     //     return res.data.message
//     //   } catch (error) {
//     //     console.log({ softDel: error });
//     //     console.log(" Product delete error:", error?.response?.data || error);
//     //     const detailedError = error?.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;
//     //     const generalError = error?.response?.data?.message;
//     //     toast.error(detailedError || generalError || "Something went wrong");
//     //     return detailedError || generalError || "Something went wrong"
//     //   }
//     // }
  
//     // hard Delete
  
//   //   const hardDelCategory = async (id: string): Promise<string> => {
//   //     try {
//   //       const res = await axiosInstance.delete(`/category/${id}`, {
//   //         headers: getAuthHeader(),
//   //       });
//   //       console.log({ del: res });
//   //       if (res.data.message === "Done") {
  
//   //         Swal.fire({
//   //           title: "The Category Deleted Successfully",
//   //           icon: "success",
//   //           draggable: true,
//   //           background: "#182129",
//   //           color: "#ffff",
//   //           confirmButtonColor: "#6B4129"
//   //         });
  
//   //          await queryClient.invalidateQueries({ queryKey: ['allCategories'] });
  
  
//   //       }
  
  
  
  
//   //       return res.data.message
//   //     } catch (error) {
//   //       console.log({ softDel: error });
//   //       console.log(" Product delete error:", error?.response?.data || error);
//   //       const detailedError = error?.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;
//   //       const generalError = error?.response?.data?.message;
//   //       toast.error(detailedError || generalError || "Something went wrong");
//   //       return detailedError || generalError || "Something went wrong"
//   //     }
//   //   }
//   // // restore
//   //   const restoreCategory = async (id: string): Promise<string> => {
//   //     try {
//   //       const res = await axiosInstance.patch(`/category/${id}/restore`, {
//   //         headers: getAuthHeader(),
//   //       });
//   //       console.log({ restore: res });
//   //       if (res.data.message === "Done") {
  
//   //         Swal.fire({
//   //           title: "The Category Restored Successfully",
//   //           icon: "success",
//   //           draggable: true,
//   //           background: "#182129",
//   //           color: "#ffff",
//   //           confirmButtonColor: "#6B4129"
//   //         });
  
//   //          await queryClient.invalidateQueries({ queryKey: ['allCategories'] });
//   //       }
//   //       return res.data.message
//   //     } catch (error) {
//   //       console.log({ softDel: error });
//   //       console.log(" Product delete error:", error?.response?.data || error);
//   //       const detailedError = error?.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;
//   //       const generalError = error?.response?.data?.message;
//   //       toast.error(detailedError || generalError || "Something went wrong");
//   //       return detailedError || generalError || "Something went wrong"
//   //     }
//   //   }

//   return (
//     <OrderContext.Provider
//       value={{
//         // allOrders,
//         // isLoading,
//         isUpdating, 
//         page,
//         setPage,
//         search,
//         setSearch,
//         // getOrderById,
//         // cancelOrder
//       }}
//     >
//       {children}
//     </OrderContext.Provider>
//   );
// }
