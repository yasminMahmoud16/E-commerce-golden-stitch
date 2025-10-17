import {  useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAxios } from './useAxios';
import Swal from "sweetalert2";
import type { AxiosResponse } from 'axios';
// import useDashboardAdmin from './useDashboardAdmin';
import { toast } from 'sonner';
import { useAuthContext } from './useAppContexts';
import axios from 'axios';

export default function useGlobal() {
    // const { refetch } = useDashboardAdmin()
    const axiosInstance = useAxios()
    const [openPopup, setOpenPopup] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [isViewPassword, setIsViewPassword] = useState(false);
    const [isViewConfirm, setIsViewConfirm] = useState(false);
    const [isViewCurrent, setIsViewCurrent] = useState(false);
    const handleTogglePassword = () => setIsViewPassword((prev) => !prev);
    const handleToggleConfirm = () => setIsViewConfirm((prev) => !prev);
    const handleToggleCurrent = () => setIsViewCurrent((prev) => !prev);

    const { getAuthHeader } = useAuthContext()



    // deleteAccount 
    const deleteAccount = async (id?: string): Promise<AxiosResponse<string, string, {}> | undefined> => {
        try {
            const deleteEndPoint = id ? `/user/${id}/freeze-account` : `/user/freeze-account`;
            const res = await axiosInstance.delete(deleteEndPoint, { headers: getAuthHeader() })
            console.log({ delRes: res });

            if (res.data.message === "Done") {

                Swal.fire({
                    title: "The Account Deleted Successfully",
                    icon: "success",
                    draggable: true,
                    background: "#182129",
                    color: "#ffff",
                    confirmButtonColor: "#6B4129"
                });
                // refetch()

                // if (!id) {
                //     localStorage.removeItem("token");
                //     setTimeout(() => {

                //         navigate("/register");
                //     }, 2000)
                // }
            }


            return res


        } catch (error) {
            if (axios.isAxiosError(error)) {
                
                console.log({ delError: error });
                const detailedError = error?.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;
    
                const generalError = error?.response?.data?.message;
    
                const messageToShow = detailedError || generalError || "delete account issue ";
                toast.error(messageToShow);
            }
        }
    }
    // const hardDeleteAccount = async (id: string): Promise<AxiosResponse<string, any, {}> | undefined> => {
    //     try {
    //         const deleteEndPoint = `/user/${id}`
    //         const res = await axiosInstance.delete(deleteEndPoint, { headers: getAuthHeader() })
    //         console.log({ delRes: res });

    //         if (res.data.message === "Done") {

    //             Swal.fire({
    //                 title: "The Account Deleted Successfully",
    //                 icon: "success",
    //                 draggable: true,
    //                 background: "#182129",
    //                 color: "#ffff",
    //                 confirmButtonColor: "#6B4129"
    //             });
    //             refetch()

    //             // if (!id) {
    //             //     localStorage.removeItem("token");
    //             //     setTimeout(() => {

    //             //         navigate("/register");
    //             //     },2000)
    //             // }
    //         }


    //         return res


    //     } catch (error) {
    //         console.log({ delError: error });
    //     }
    // };
    return {
        openPopup,
        setOpenPopup,
        navigate,
        location,
        isViewPassword,
        isViewConfirm,
        isViewCurrent,
        handleTogglePassword,
        handleToggleConfirm,
        handleToggleCurrent,
        deleteAccount
    }
}
