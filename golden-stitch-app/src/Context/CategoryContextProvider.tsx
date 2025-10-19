import {  useState, type ReactNode } from 'react'
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { useAxios } from '@/Hooks/useAxios';
import { toast } from 'sonner';
import { useAuthContext } from '@/Hooks/useAppContexts';
import Swal from 'sweetalert2';
import { CategoryContext } from './contextCreations/CategoryContex.';
import type { IAddCategoryResponse, ICategory, ICategoryResponse, ICategoryUpdateInput } from '@/Utilities/interfaces';
import axios from 'axios';


export default function CategoryContextProvider({ children }: { children: ReactNode }) {
  const axiosInstance = useAxios();
  const [page, setPage] = useState(1);
  const [size] = useState(5);
  const [search, setSearch] = useState("");
  const [isUpdating, setIsUpdating] = useState(false); 
  const { getAuthHeader, token } = useAuthContext();
  const queryClient = useQueryClient();




const addCategory = useMutation<IAddCategoryResponse, unknown, ICategoryUpdateInput, unknown>({
  mutationFn: async (data: ICategoryUpdateInput) => {
    try {
      if (!data.attachment || data.attachment.length === 0) {
        // toast.error("image rrequired");
        throw new Error("image required"); // ← مهم جداً علشان يعتبرها فشل
      }

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description || "");
      formData.append("attachment", data.attachment[0]);

      const res = await axiosInstance.post("/category", formData, {
        headers: getAuthHeader(),
      });

      if (res.data.message === "Done") {
        toast.success("Category added");
        refetch();
        return res.data;
      } else {
        throw new Error(res.data.message || "failed to add category  ");
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const detailedError =
          error?.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;
        const generalError = error?.response?.data?.message;
        const messageToShow = detailedError || generalError;
        toast.error(messageToShow);
      } else if (error instanceof Error) {
        // toast.error(error.message); 
      } else {
        toast.error("error happen");
      }

      throw error; 
    }
  },
});


  
  
  // 🔹 Get All Categories
  const getCategories = async ({ page = 1, size = 5, search = "" }) => {
    const res = await axiosInstance.get(
      `/category?page=${page}&size=${size}${search ? `&search=${search}` : ""}`
    );
    // console.log(res.data.data.categories.docs);
    
    return res.data.data.categories as ICategoryResponse
  };

  const { data: allCategoriesData, isLoading, refetch } = useQuery({
    queryKey: ['allCategories', page, size, search],
    queryFn: () => getCategories({ page, size, search }),
    // keepPreviousData: true,
    placeholderData: keepPreviousData,
  });

  // 🔹 Get category by ID
  const getCategoryById = async (id: string) => {
    try {

      const res = await axiosInstance.get(`/category/${id}`);
      
      const category=res.data.data.category
      return category;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.log({categoryDetailsErr:error});
      
    }
  };

  // 🔹 Update Category
  const updateCategory = useMutation({
    mutationFn: async (data: ICategoryUpdateInput) => {
      setIsUpdating(true); 

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      if (data.attachment?.[0]) {
        formData.append("attachment", data.attachment[0]);
      }

      const res = await axiosInstance.patch(`/category/${data.id}`, formData, {
        headers: getAuthHeader(),
      });
      return res.data.data.category;
    },

    onSuccess: (updatedCategory) => {
      toast.success("Category updated successfully!");

      
      queryClient.setQueryData(['allCategories', page, size, search], (oldData: ICategory[]) => {
        if (!oldData) return;
        return oldData.map((cat: ICategory) =>
          cat.id === updatedCategory.id ? updatedCategory : cat
        );
      });

      queryClient.setQueryData(['category', updatedCategory.id], updatedCategory);
    },

    onSettled: () => {
      setIsUpdating(false); 
    },

    onError: (error: unknown) => {

      if (axios.isAxiosError(error)) {
        
        const detailedError = error?.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;
        const generalError = error?.response?.data?.message;
        toast.error(detailedError || generalError || "Something went wrong");
      }

      
    },
  });

// Archive category

      const categoryArchives = async ({ page = 1, size = 5, search = "" }) => {
    try {
      const res = await axiosInstance.get(`/category/archive?page=${page}&size=${size}${search ? `&search=${search}` : ""}`);
      const archiveCategory =res.data.data.categories as ICategoryResponse
      // console.log("archiveCategory=================", res.data.data.categories.docs);
      return archiveCategory 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error("something went wrong")
        // console.log("product archive error", error);
      }
      return {
            currentPage: 1,
            docs: [],
            docsCount: 0,
            limit: size,
            pages: 1,
          } as ICategoryResponse; 
    }
  }


  
const { data: archiveCategory  , refetch:ArchiveRefetch} = useQuery({
  queryKey: ['archiveCategory', page, size, search],
  queryFn: () => categoryArchives({ page, size, search }),
  placeholderData: keepPreviousData,
  enabled: !!token, 
});


    // soft Delete
  
    const softDelCategory = async (id: string): Promise<string> => {
      try {
        const res = await axiosInstance.delete(`/category/${id}/freeze`, {
          headers: getAuthHeader(),
        });
        // console.log({ del: res });
        if (res.data.message === "Done") {
  
          Swal.fire({
            title: "The Category Deleted Successfully",
            icon: "success",
            draggable: true,
            background: "#182129",
            color: "#ffff",
            confirmButtonColor: "#6B4129"
          });
          await queryClient.invalidateQueries({ queryKey: ['allCategories'] });
          ArchiveRefetch()
  
  
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
  





  // =====================================
    // hard Delete
  
    const hardDelCategory = async (id: string): Promise<string> => {
      try {
        const res = await axiosInstance.delete(`/category/${id}`, {
          headers: getAuthHeader(),
        });
        // console.log({ del: res });
        if (res.data.message === "Done") {
  
          Swal.fire({
            title: "The Category Deleted Successfully",
            icon: "success",
            draggable: true,
            background: "#182129",
            color: "#ffff",
            confirmButtonColor: "#6B4129"
          });
  
          // await queryClient.invalidateQueries({ queryKey: ['allCategories'] });
          await queryClient.invalidateQueries({ queryKey: ['archiveCategory'] });
          // refetch?.()
          ArchiveRefetch()
  
  
        }
        return res.data.message
      } catch (error) {
        if (axios.isAxiosError(error)) {
          
          // console.log({ softDel: error });
          // console.log(" Product delete error:", error?.response?.data || error);
          const detailedError = error?.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;
          const generalError = error?.response?.data?.message;
          toast.error(detailedError || generalError || "Something went wrong");
          return detailedError || generalError || "Something went wrong"
        }
            return "Something went wrong"

      }
    }
  // restore
    const restoreCategory = async (id: string): Promise<string> => {
      try {
        const res = await axiosInstance.patch(`/category/${id}/restore`, {
          headers: getAuthHeader(),
        });
        // console.log({ restore: res });
        if (res.data.message === "Done") {
  
          Swal.fire({
            title: "The Category Restored Successfully",
            icon: "success",
            draggable: true,
            background: "#182129",
            color: "#ffff",
            confirmButtonColor: "#6B4129"
          });
  
          await queryClient.invalidateQueries({ queryKey: ['allCategories'] });
          await queryClient.invalidateQueries({ queryKey: ['archiveCategory'] });
            ArchiveRefetch()
        }
        return res.data.message
      } catch (error) {
        if (axios.isAxiosError(error)) {
          
          // console.log({ softDel: error });
          // console.log(" Product delete error:", error?.response?.data || error);
          const detailedError = error?.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;
          const generalError = error?.response?.data?.message;
          toast.error(detailedError || generalError || "Something went wrong");
          return detailedError || generalError || "Something went wrong"
        }
        return  "Something went wrong"
      }
    }

  return (
    <CategoryContext.Provider
      value={{
        getCategories,
        allCategoriesData,
        isLoading,
        isUpdating, 
        // refetch,
        addCategory,
        page,
        setPage,
        search,
        setSearch,
        getCategoryById,
        updateCategory,
        softDelCategory,
        archiveCategory,
        restoreCategory,
        hardDelCategory
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
