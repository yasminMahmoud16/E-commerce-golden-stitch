import {  useRef, useState, type ReactNode } from 'react'
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { useAxios } from '@/Hooks/useAxios';
import { toast } from 'sonner';
import { useAuthContext } from '@/Hooks/useAppContexts';
import Swal from 'sweetalert2';
import axios from 'axios';
import { ProductContext } from './contextCreations/ProfileContext';
import type { IAddProductResponse, IProduct, IProductEditInput, IProductsResponse, IProductUpdateInput } from '@/Utilities/interfaces';

// export const ProductContext = createContext<IProductContextType | undefined>(undefined);

export default function ProductContextProvider({ children }: { children: ReactNode }) {
  const axiosInstance = useAxios();
  const [page, setPage] = useState(1);
  const [size] = useState(5);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isUpdating, setIsUpdating] = useState(false); 
  const { getAuthHeader ,token } = useAuthContext();
  const queryClient = useQueryClient();
  const [isLoadingArchive, setIsLoadingArchive] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const firstLoad = useRef(true);
console.log({isLoadingArchive:isLoadingArchive});


  //  Get All Products
  const getProducts = async ({ page = 1, size = 5, search = "", categoryId = "" }) => {
  let url = `/product?page=${page}&size=${size}`;

  console.log("Full request URL:",  "http://54.221.212.74/api"+ url);
    
  if (categoryId) {
    url += `&categoryId=${categoryId}`;
  }

  if (search) {
    url += `&search=${search}`;
  }

    const res = await axiosInstance.get(url
    );
    // console.log({ product: res.data.data.products });
    // console.log({ productWishList: res.data.data.products });


  
    return res.data.data.products as IProductsResponse;
  };

  const { data: allProductsData, isLoading , refetch:refetchProducts } = useQuery({
    queryKey: ['allProducts', page, size, search, categoryId],
    queryFn: () => getProducts({ page, size, search , categoryId}),
    // keepPreviousData: true,
    placeholderData: keepPreviousData,
  });

  // 🔹 Get Product by ID
  const getProductById = async (id: string) => {
    try {
      setIsLoadingDetails(true)
      const res = await axiosInstance.get(`/product/${id}`);
      // console.log({spacifice : res.data.data.product});
      
      return res.data.data.product;

      
    } catch (error: unknown) {
      
      if (isLoadingDetails) {
        
        if (axios.isAxiosError(error)) {
    // console.log("Product fetch error:", error.response?.data || error);
    const detailedError =
      error.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;
    const generalError = error.response?.data?.message;
    toast.error(detailedError || generalError || "Get Product issue");
    return detailedError || generalError || "Get Product issue";
  } else {
    // console.log("Unexpected error from getProductById:", error);
    // toast.error("Unexpected error occurred getProductById");
    return "Unexpected error occurred getProductById";
  }
      }

    } finally {
       setIsLoadingDetails(true)
    }
  };



  // 🔹 Update product
  const updateProduct = useMutation<IProduct, unknown, IProductEditInput>({
    mutationFn: async (data: IProductEditInput) => {
      setIsUpdating(true);

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description ||"");
      formData.append("mainPrice", data.mainPrice.toString());
      formData.append("stock", data.stock.toString());
      formData.append("discountPercent", data.discountPercent.toString());
formData.append("categoryId", data.category?.id ?? data.category?.id ?? "");

     if (Array.isArray(data.attachments) && data.attachments.length > 0) {
  data.attachments.forEach((file) => {
    formData.append("attachments", file);
  });
}

      if (Array.isArray(data.removedAttachments) && data.removedAttachments.length > 0) {
  data.removedAttachments.forEach((path, index) => {
    formData.append(`removedAttachments[${index}]`, path ?? "");
  });
}
      // if (data.removedAttachments?.length > 0) {
      //   data.removedAttachments.forEach((path: string, index: number) => {
      //     formData.append(`removedAttachments[${index}]`, path);
      //   });
      // }

      // console.log("🧩 updateProduct payload:", data);
// console.log("🧩 product id:", data.id);
      const res = await axiosInstance.patch(`/product/${data.id}`, formData, {
        headers: getAuthHeader(),
      });


      return res.data.data.product;
    },

    onSuccess: async (updatedProduct) => {
      toast.success(" Product updated successfully!");

       queryClient.setQueryData(['product', updatedProduct.id], updatedProduct);

    queryClient.setQueryData(['allProducts', page, size, search, categoryId], (oldData: IProductsResponse | undefined) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        docs: oldData.docs.map((prod) =>
          prod.id === updatedProduct.id ? updatedProduct : prod
        ),
      };
    });

    await queryClient.invalidateQueries({ queryKey: ['allProducts'] });
      
      await queryClient.invalidateQueries({ queryKey: ['product', updatedProduct.id] });

    },

   onError: (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const detailedError =
      error.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;

    const generalError = error.response?.data?.message;

    toast.error(detailedError || generalError || "update product issue");

    // console.log("Axios Error:", error);
  } else {
    // console.error("Unexpected error from update product :", error);
    toast.error("Unexpected error from update product");
  }
},

    onSettled: () => {
      setIsUpdating(false);
    },
  });
  
  
  // Add


const addProduct = useMutation<IAddProductResponse, unknown, IProductUpdateInput, unknown>({
  mutationFn: async (data: IProductUpdateInput) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description || "");
      formData.append("mainPrice", data.mainPrice.toString());
      formData.append("stock", data.stock.toString());
      formData.append("discountPercent", data.discountPercent.toString());
      formData.append("categoryId", data.category.id || "");

      if (data.attachments && data.attachments.length > 0) {
        Array.from(data.attachments).forEach((file) => {
          formData.append("attachments", file);
        });
      }

      const res = await axiosInstance.post("/product", formData, {
        headers: getAuthHeader(),
      });

      if (!res || !res.data) {
        throw new Error("No response from server");
      }

      return res.data as IAddProductResponse;

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error;
      } else {
        throw new Error("Unexpected error during product upload");
      }
    }
  },

  onSuccess: (res) => {
    if (res.message === "Done") {
      queryClient.invalidateQueries({ queryKey: ["allProductsData"] });
      refetchProducts();
      toast.success("✅ Product added successfully!");
    }
  },

  onError: (error) => {
    console.log({ addProductError: error });

    if (axios.isAxiosError(error)) {
      const backendMessage =
        error.response?.data?.message ||
        (typeof error.response?.data === "string" ? error.response?.data : null) ||
        error.message;

      if (
        error.response?.status === 413 ||
        backendMessage?.toLowerCase().includes("file too large")
      ) {
        toast.error("The uploaded image is too large. Please choose a smaller file.");
        return;
      }

      toast.error(backendMessage || "Failed to add product.");
    } else {
      toast.error("file is too large");
    }
  },
});

// const addProduct = useMutation<IAddProductResponse, unknown, IProductUpdateInput, unknown>({
//   mutationFn: async (data: IProductUpdateInput) => {
//     const formData = new FormData();
//     formData.append("name", data.name);
//     formData.append("description", data.description ||"");
//     formData.append("mainPrice", data.mainPrice.toString());
//     formData.append("stock", data.stock.toString());
//     formData.append("discountPercent", data.discountPercent.toString());
//     formData.append("categoryId", data.category.id || "");

//     if (data?.attachments && data?.attachments.length > 0) {
//       Array.from(data?.attachments).forEach((file) => {
//         formData.append("attachments", file);
//       });
//     }


//       const res = await axiosInstance.post("/product", formData, {
//         headers: getAuthHeader(),
//       });
//       return res.data as IAddProductResponse
      

//   },

//   onSuccess: (res) => {
//     // console.log(res);
//     if (res.message === "Done") {
      
//       queryClient.invalidateQueries({ queryKey: ["allProductsData"] });
//       refetchProducts()
//       toast.success("✅ Product added successfully!");
//       // onBack()
//     }


//   },


//   onError: (error) => {

//     console.log({ addproductError: error });
//     if (axios.isAxiosError(error)) {
//     const detailedError =
//       error.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;

//     const generalError = error.response?.data?.message;

//     toast.error(detailedError || generalError || "add product issue");

//   } else {
//     // toast.error("Unexpected error from add product");
//   }
    
//   }
// });


  // soft Delete

  const softDelProduct = async (id: string): Promise<string> => {
    try {
      const res = await axiosInstance.delete(`/product/${id}/freeze`, {
        headers: getAuthHeader(),
      });
      // console.log({ del: res });
      if (res.data.message === "Done") {

        Swal.fire({
          title: "The Account Deleted Successfully",
          icon: "success",
          draggable: true,
          background: "#182129",
          color: "#ffff",
          confirmButtonColor: "#6B4129"
        });

        await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['allProducts'] }),
        queryClient.invalidateQueries({ queryKey: ['archiveProducts'] }), 
      ]);


      }

      return res.data.message
    } catch (error) {

      if (axios.isAxiosError(error)) {
        
        // console.log({ softDel: error });
        // console.log(" Product delete error:", error?.response?.data || error);
        const detailedError = error?.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;
        const generalError = error?.response?.data?.message;
        toast.error(detailedError || generalError || "soft delete product issue ");
        return detailedError || generalError || "soft delete product issue "
      }
      return "Unexpected error";

    }
  }



  

  
//   const productsArchives = async ({ page = 1, size = 5, search = "" }) => {
//     try {
//       if (!localStorage.getItem("token")) return;
//       setIsLoadingArchive(true);
//       const res = await axiosInstance.get(`/product/archive?page=${page}&size=${size}${search ? `&search=${search}` : ""}`);
//       const archiveProducts =res.data.data.products as IProductsResponse
//       // console.log("productsArchives=================", res.data.data.products.docs);
//       return archiveProducts

//     } catch (error: unknown) {
//       if (!localStorage.getItem("token")) return;
//   if (!isLoadingArchive) {
//     if (axios.isAxiosError(error)) {
        
//         toast.error(error.response?.data?.message || error.message || "Something went wrong");
//       } else {
//         // toast.error("Unexpected error occurred");
//       }
//     }
//   return {
//         currentPage: 1,
//         docs: [],
//         docsCount: 0,
//         limit: size,
//         pages: 1,
//       } as IProductsResponse;
// }finally {
//     setIsLoadingArchive(false);
//   }

  //   }
  

const productsArchives = async ({ page = 1, size = 5, search = "" }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    setIsLoadingArchive(true);

    const res = await axiosInstance.get(
      `/product/archive?page=${page}&size=${size}${search ? `&search=${search}` : ""}`
    );

    const archiveProducts = res.data.data.products as IProductsResponse;
    return archiveProducts;
  } catch (error: unknown) {
    const token = localStorage.getItem("token");
    if (!token) return;

    
    if (!firstLoad.current && axios.isAxiosError(error)) {
      // toast.error(error.response?.data?.message || error.message || "Something went wrong");
    }
  } finally {
    setIsLoadingArchive(false);
    firstLoad.current = false; 
  }

  return {
    currentPage: 1,
    docs: [],
    docsCount: 0,
    limit: size,
    pages: 1,
  } as IProductsResponse;
};



  
const { data: archiveProducts , refetch } = useQuery({
  queryKey: ['archiveProducts', page, size, search],
  queryFn: () => productsArchives({ page, size, search }),
  placeholderData: keepPreviousData,
  enabled: !!token, 
});

   // restore
      const restoreProduct = async (id: string): Promise<string> => {
        try {
          const res = await axiosInstance.patch(`/product/${id}/restore`, {
            headers: getAuthHeader(),
          });
          // console.log({ restore: res });
          if (res.data.message === "Done") {
    
            Swal.fire({
              title: "The Product Restored Successfully",
              icon: "success",
              draggable: true,
              background: "#182129",
              color: "#ffff",
              confirmButtonColor: "#6B4129"
            });
    
            await queryClient.invalidateQueries({ queryKey: ['allProducts'] });
            await queryClient.invalidateQueries({ queryKey: ['archiveProducts'] });
            refetch?.()
          }
          return res.data.message
        } catch (error:unknown) {


          if (axios.isAxiosError(error)) {
            
            // console.log({ softDel: error });
            // console.log(" Product delete error:", error?.response?.data || error);
            const detailedError = error?.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;
            const generalError = error?.response?.data?.message;
            toast.error(detailedError || generalError || "Something went wrong");
            return detailedError || generalError || "Something went wrong"
          }

      return "Unexpected error";


        }
      }

  return (
    <ProductContext.Provider
      value={{
        getProducts,
        allProductsData,
        isLoading,
        isUpdating,
        page,
        setPage,
        search,
        setSearch,
        categoryId,
        setCategoryId,
        getProductById,
        updateProduct,
        softDelProduct,
        addProduct,
        // allProductsArchive
        archiveProducts,restoreProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}




























