import { useLocation, useNavigate } from "react-router-dom";
import { useAxios } from "./useAxios";
import type { changePasswordFields } from "@/Utilities/types";
import { toast } from "sonner";
import type { AxiosResponse } from "axios";
import { useAuthContext } from "./useAppContexts";
import axios from "axios";
export default function usePassword() {
    const axiosInstance = useAxios()
    const { getAuthHeader } = useAuthContext()
    // open as admin or user 
    const navigate = useNavigate();
    const isLocation = useLocation();
    const checkAdminPath = isLocation.pathname === "/admin/change-password"
    const handelCancelClick = () => {
        if (checkAdminPath) {

            navigate("/admin/account-setting")
        } else {

            navigate("/account-setting")
        }
    };


    // API for change password

    const changePassword = async (values: changePasswordFields): Promise<AxiosResponse<changePasswordFields> | undefined> => {
        try {
            const res = await axiosInstance.patch("/user/password", values, {
                headers: getAuthHeader()
            })
            console.log(res);
            if (res.data.message === "Done") {
                localStorage.removeItem("token");
                navigate("/login");
            }
            return res
        } catch (error) {

            if (axios.isAxiosError(error)) {

                console.log({ changePasswordError: error });
    
                const detailedError = error?.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;
    
                const generalError = error?.response?.data?.message;
    
                const messageToShow = detailedError || generalError || "Something went wrong";
                toast.error(messageToShow);
            }
                

        }
    };






    return {

        handelCancelClick,
        changePassword

    }
}
