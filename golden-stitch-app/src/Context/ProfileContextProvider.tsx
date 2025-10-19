import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useAxios } from "@/Hooks/useAxios";
import {  useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthContext } from "@/Hooks/useAppContexts";
// import { ProfileContext } from "./contextCreations/ProfileContext";
import {   type FormDataUpdate } from "@/Utilities/types";
import axios from "axios";
import { ProfileContext } from "./contextCreations/ProductContext";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";



export default function ProfileContextProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState< Record<string, string> |null>(null);
  // const navigate = useNavigate()
  // const {cartRefresh} =useCartContext()
  const { token, getAuthHeader } = useAuthContext();
  const axiosInstance = useAxios();
  // const queryClient = useQueryClient();
  // const [localUsers, setLocalUsers] = useState<Record<string, string>[]>([]);


  const getProfile = async () => {
    if (!token) return null;

    try {
      const res = await axiosInstance.get("/user", {
        headers: getAuthHeader(),
      });

      const user = res.data.data.user;
      // console.log("Fetched user with Bearer:", user);
      return user;
    } catch (error: unknown) {
  if (axios.isAxiosError(error)) {
    toast.error(error.response?.data?.message || error.message || "Something went wrong");
  } else {
    // toast.error("Unexpected error occurred");
  }
  return [];
}


      


      // console.log("Profile fetch error:", err);

    
  };


  const { data, refetch: refetchProfile, isLoading:loadingProfile 
  } = useQuery({
    queryKey: ["getProfile", token],
    queryFn: getProfile,
    enabled: !!token,
  });



  // update     
  const updateUserProfile = async (values: FormDataUpdate
  ): Promise<FormDataUpdate | null> => {
    try {
      const allowedFields = ["firstName", "lastName", "gender", "address", "phone"];
      const payload = Object.fromEntries(
        Object.entries(values).filter(([key]) => allowedFields.includes(key))
      );

      const res = await axiosInstance.patch("/user/", payload, {
        headers: getAuthHeader()
      });
      // console.log("Updated user:", res.data);
      // setUpdate(res.data);
      setProfile(res.data.data.user);
      toast.success(res.data.message)
      return res.data.data.user;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occurred");
        // console.log("Axios Error:", error);
      } else {
        // console.log("Unexpected error:", error);
        toast.error("Unexpected error");
      }
      return null;
      // console.log({ updateError: error });
      // toast.error(error?.response?.data.message)
    }
  };

  // get all users
  
      const getAllUsers = async () => {
        try {
            const res = await axiosInstance.get('/user/dashboard',
                {
                    headers: getAuthHeader()
                }
            );
            // console.log({ AllUsers: res });
          const users = res.data.data.result[0].value
          
            // console.log({ users });
            return users;

        } catch (error) {
            if (axios.isAxiosError(error)) {
                
                // console.log({ dashError: error });
    
                const detailedError = error?.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;
    
                const generalError = error?.response?.data?.message;
    
                const messageToShow = detailedError || generalError || "Something went wrong";
                toast.error(messageToShow);
            }
        }
    }


  const { data:allUsers, refetch} = useQuery({
    queryKey: ["getAllUsers", token],
    queryFn: getAllUsers,
    enabled: !!token,
  });


  const softDelUsers = async (id: string): Promise<string> => {
    try {
      const res = await axiosInstance.delete(`/user/${id}/freeze-account`, {
        headers: getAuthHeader(),
      });
      // console.log({ del: res });
      if (res.data.message === "Done") {

        toast.success("The Account Deleted Successfully")
        // Swal.fire({
        //   title: "The Account Deleted Successfully",
        //   icon: "success",
        //   draggable: true,
        //   background: "#182129",
        //   color: "#ffff",
        //   confirmButtonColor: "#6B4129"

        // });

        refetch()
        // navigate("/login")

        // await queryClient.invalidateQueries({ queryKey: ['allUsers'] });


      }

      return res.data.message
    } catch (error) {

      if (axios.isAxiosError(error)) {
        
        // console.log({ softDel: error });
        // console.log(" soft user delete error:", error?.response?.data || error);
        const detailedError = error?.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;
        const generalError = error?.response?.data?.message;
        // console.log({generalErrorfromsoftDelUser:generalError});
        
        //  if (generalError === "Not registered account") {
            
        //   }
        toast.error(detailedError || generalError || "soft delete product issue ");
        return detailedError || generalError || "soft delete product issue "
      }
      return "Unexpected error";

    }
  }
  const restoreUsers = async (id: string): Promise<string> => {
    try {
      const res = await axiosInstance.patch(`/user/${id}/restore-account`, {
        headers: getAuthHeader(),
      });
      // console.log({ del: res });
      if (res.data.message === "Done") {

        toast.success("The Account restored Successfully")


        refetch()
        // navigate("/login")

        // await queryClient.invalidateQueries({ queryKey: ['allUsers'] });


      }

      return res.data.message
    } catch (error) {

      if (axios.isAxiosError(error)) {
        
        // console.log({ softDel: error });
        // console.log(" soft user delete error:", error?.response?.data || error);
        const detailedError = error?.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;
        const generalError = error?.response?.data?.message;
        // console.log({generalErrorfromsoftDelUser:generalError});
        
        //  if (generalError === "Not registered account") {
            
        //   }
        toast.error(detailedError || generalError || "soft delete product issue ");
        return detailedError || generalError || "soft delete product issue "
      }
      return "Unexpected error";

    }
  }

  // ===========================================


  // add products to wishlist
  const addToWishList = async (productId: string) => {
    try {

      const res = await axiosInstance.patch(`product/${productId}/add-wishlist`, {
        productId
      }, {
        headers: getAuthHeader()
      });


      if (res.data.message === 'Done') {
        toast.success('Product Added To Wishlist');


        refetchProfile()
        // console.log(res);
      }

    } catch (err) {
      if (axios.isAxiosError(err)) {
        
        toast.error("something went wrong")
      }
      // console.log(err, 'wish context error');

    }
  }
  const removeFromWishList = async (productId: string) => {
    try {

      const res = await axiosInstance.patch(`product/${productId}/remove-from-wishlist`, {
        productId
      }, {
        headers: getAuthHeader()
      });


      if (res.data.message === 'Done') {
        toast.success('Product removed from Wishlist');
        // setWishIems(prev => [...prev, productId])

        // localStorage.setItem('wishItems',JSON.stringify(getProWishList))
        // getProWishList();

        //   const updatedUser = await getProfile(); // جلب البروفايل المحدث
        // setProfile(updatedUser);
        refetchProfile()
        // cartRefresh()

        // console.log({ Remove: res });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        
        toast.error("something went wrong")
      }
      // console.log(err, 'wish context error');

    }
  }
// useEffect(() => {
//   if (allUsers) {
//     setLocalUsers(allUsers);
//   }
// }, [allUsers]);


  useEffect(() => {
    if (data) {
      setProfile(data);

    } else if (!token) {
      setProfile(null);
    }
    // console.log("data comes from profile context =====" ,data);
    
  }, [data, token]);


  return (
    <ProfileContext.Provider value={{
      profile,
      loadingProfile,
      updateUserProfile,
      // changeRoleByAdmin,
      // getNewRole,
      // currentRole,
      data,
      allUsers,
      restoreUsers,
      softDelUsers,
      removeFromWishList,
      addToWishList,
    }}>
      {children}
    </ProfileContext.Provider>
  );
}
