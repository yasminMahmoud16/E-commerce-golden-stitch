import {  useState, type ReactNode } from 'react'
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { useAxios } from '@/Hooks/useAxios';
import { toast } from 'sonner';
import { useAuthContext } from '@/Hooks/useAppContexts';
import Swal from 'sweetalert2';
import axios from 'axios';
import { ProductContext } from './contextCreations/ProfileContext';
import type { IAddProductResponse, IProduct, IProductEditInput, IProductUpdateInput } from '@/Utilities/interfaces';

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

  //  Get All Products
  const getProducts = async ({ page = 1, size = 5, search = "", categoryId = "" }) => {
  let url = `/product?page=${page}&size=${size}`;

  if (categoryId) {
    url += `&categoryId=${categoryId}`;
  }

  if (search) {
    url += `&search=${search}`;
  }

    const res = await axiosInstance.get(url
    );
    console.log({ product: res.data.data.products.docs });
    // console.log({ productWishList: res.data.data.products.docs });


    return res.data.data.products.docs;
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
      const res = await axiosInstance.get(`/product/${id}`);
      console.log({spacifice : res.data.data.product});
      
      return res.data.data.product;

      
    } catch (error:unknown) {
          if (axios.isAxiosError(error)) {
      console.log("Product fetch error:", error.response?.data || error);
      const detailedError =
        error.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;
      const generalError = error.response?.data?.message;
      toast.error(detailedError || generalError || "Get Product issue");
      return detailedError || generalError || "Get Product issue";
    } else {
      console.log("Unexpected error from getProductById:", error);
      toast.error("Unexpected error occurred getProductById");
      return "Unexpected error occurred getProductById";
    }

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
      formData.append("discountPercent", data.discountPercent.toString());
formData.append("categoryId", data.category?.id ?? data.category?.id ?? "");

      if (data.attachments?.[0]) {
        formData.append("attachments", data.attachments[0]);
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

      console.log("🧩 updateProduct payload:", data);
// console.log("🧩 product id:", data.id);
      const res = await axiosInstance.patch(`/product/${data.id}`, formData, {
        headers: getAuthHeader(),
      });


      return res.data.data.product;
    },

    onSuccess: async (updatedProduct) => {
      toast.success(" Product updated successfully!");

      queryClient.setQueryData(['product', updatedProduct.id], updatedProduct);

      queryClient.setQueryData(['allProducts', page, size, search], (oldData: IProduct[]) => {
        if (!oldData) return oldData;
        return oldData?.map((prod: IProduct) =>
          prod.id === updatedProduct.id ? updatedProduct : prod
        );
      });

      
      await queryClient.invalidateQueries({ queryKey: ['product', updatedProduct.id] });

    },

   onError: (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const detailedError =
      error.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;

    const generalError = error.response?.data?.message;

    toast.error(detailedError || generalError || "update product issue");

    console.log("Axios Error:", error);
  } else {
    console.error("Unexpected error from update product :", error);
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
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description ||"");
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
    return res.data as IAddProductResponse
  },

  onSuccess: (res) => {
    console.log(res);
    if (res.message === "Done") {
      
      queryClient.invalidateQueries({ queryKey: ["allProductsData"] });
      refetchProducts()
      toast.success("✅ Product added successfully!");
      // onBack()
    }


  },


  onError: (error) => {
    console.log({ addproductError: error });
     if (axios.isAxiosError(error)) {
    const detailedError =
      error.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;

    const generalError = error.response?.data?.message;

    toast.error(detailedError || generalError || "update product issue");

  } else {
    toast.error("Unexpected error from update product");
  }
    
  }
});


  // soft Delete

  const softDelProduct = async (id: string): Promise<string> => {
    try {
      const res = await axiosInstance.delete(`/product/${id}/freeze`, {
        headers: getAuthHeader(),
      });
      console.log({ del: res });
      if (res.data.message === "Done") {

        Swal.fire({
          title: "The Account Deleted Successfully",
          icon: "success",
          draggable: true,
          background: "#182129",
          color: "#ffff",
          confirmButtonColor: "#6B4129"
        });

        await queryClient.invalidateQueries({ queryKey: ['allProducts'] });


      }

      return res.data.message
    } catch (error) {

      if (axios.isAxiosError(error)) {
        
        console.log({ softDel: error });
        console.log(" Product delete error:", error?.response?.data || error);
        const detailedError = error?.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;
        const generalError = error?.response?.data?.message;
        toast.error(detailedError || generalError || "soft delete product issue ");
        return detailedError || generalError || "soft delete product issue "
      }
      return "Unexpected error";

    }
  }



  

  
  const productsArchives = async ({ page = 1, size = 5, search = "" }) => {
    try {
      const res = await axiosInstance.get(`/product/archive?page=${page}&size=${size}${search ? `&search=${search}` : ""}`);
      const archiveProducts =res.data.data.products.docs
      console.log("productsArchives=================", res.data.data.products.docs);
      return archiveProducts 
    } catch (error) {
      console.log("product archive error", error);
      return []; 
    }
  }


  
const { data: archiveProducts = [], refetch } = useQuery({
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
          console.log({ restore: res });
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
            
            console.log({ softDel: error });
            console.log(" Product delete error:", error?.response?.data || error);
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




























