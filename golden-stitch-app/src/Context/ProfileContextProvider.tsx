import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useAxios } from "@/Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthContext } from "@/Hooks/useAppContexts";
// import { ProfileContext } from "./contextCreations/ProfileContext";
import type { FormDataUpdate } from "@/Utilities/types";
import axios from "axios";
import { ProfileContext } from "./contextCreations/ProductContext";




export default function ProfileContextProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState< Record<string, string> |null>(null);
  // const {cartRefresh} =useCartContext()
  const { token, getAuthHeader } = useAuthContext();
  const axiosInstance = useAxios();

  // const queryClient = useQueryClient();

  const getProfile = async () => {
    if (!token) return null;

    try {
      const res = await axiosInstance.get("/user", {
        headers: getAuthHeader(),
      });
      const user = res.data.data.user;
      console.log("Fetched user with Bearer:", user);
      return user;
    } catch (err) {
      // if (err.response?.data.message === "invalid signature" ) {
      //   try {
      //     const res = await axiosInstance.get("/user", {
      //       headers: getAuthHeader(),
      //     });
      //     const user = res.data.data.user;
      //     console.log("Fetched user with System:", user);
      //     return user;


      //   } catch (innerErr) {
      //     console.log("Profile fetch error (System attempt):", innerErr);
      //     return null;
      //   }
      // }

      console.log("Profile fetch error:", err);

      return null;
    }
  };


  const { data, refetch: refetchProfile
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
      console.log("Updated user:", res.data);
      // setUpdate(res.data);
      setProfile(res.data.data.user);
      toast.success(res.data.message)
      return res.data.data.user;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occurred");
        console.log("Axios Error:", error);
      } else {
        console.error("Unexpected error:", error);
        toast.error("Unexpected error");
      }
      return null;
      // console.log({ updateError: error });
      // toast.error(error?.response?.data.message)
    }
  };

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
        console.log(res);
      }

    } catch (err) {
      console.log(err, 'wish context error');

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

        console.log({ Remove: res });
      }
    } catch (err) {
      console.log(err, 'wish context error');

    }
  }


  useEffect(() => {
    if (data) {
      setProfile(data);

    } else if (!token) {
      setProfile(null);
    }
    console.log("data comes from profile context =====" ,data);
    
  }, [data, token]);


  return (
    <ProfileContext.Provider value={{
      profile
      , updateUserProfile,
      data,
      removeFromWishList,
      addToWishList
    }}>
      {children}
    </ProfileContext.Provider>
  );
}
