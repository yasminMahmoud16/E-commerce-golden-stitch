import { useAxios } from "./useAxios";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "./useAppContexts";
import axios from "axios";
import { toast } from "sonner";

export default function useDashboardAdmin() {
    const axiosInstance = useAxios();
    const { getAuthHeader } = useAuthContext()

    const getAllDashboard = async () => {
        try {
            const res = await axiosInstance.get('/user/dashboard',
                {
                    headers: getAuthHeader()
                }
            );
            console.log({ dashRes: res });
            const users = res.data.data.result[0].value
            console.log({ users });
            return users;

        } catch (error) {
            if (axios.isAxiosError(error)) {
                
                console.log({ dashError: error });
    
                const detailedError = error?.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;
    
                const generalError = error?.response?.data?.message;
    
                const messageToShow = detailedError || generalError || "Something went wrong";
                toast.error(messageToShow);
            }
        }
    }


    const { data: users, isLoading, refetch } = useQuery({
        queryKey: ["getAllDashboard"],
        queryFn: getAllDashboard,
    });

    return {
        getAllDashboard,
        users,
        isLoading,
        refetch
    }
}
