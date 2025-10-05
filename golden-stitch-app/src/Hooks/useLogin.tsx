import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios, { type AxiosResponse } from 'axios';
import { AuthContext } from '../Context/AuthContext';
import type { loginFields, logoutFlags } from '@/Utilities/types';
import { toast } from 'sonner';

export default function useLogin() {

    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { setToken } = useContext(AuthContext);
    const baseUrl = import.meta.env.VITE_BASE_URL;


    interface ILoginResponse {
        data: {
            credentials: {
                access_token: string;
                refresh_token: string;
            };
        };
        cause?: {
            validationErrors?: {
                issues?: { message: string }[];
            }[];
        };
    }

    const login = async (
        values: loginFields
    ): Promise<AxiosResponse<ILoginResponse> | undefined> => {
        try {
            setLoading(true);

            const res = await axios.post<ILoginResponse>(
                `${baseUrl}/auth/login`,
                values
            );
            const accessToken = res.data?.data?.credentials.access_token;

            setToken(accessToken);
            localStorage.setItem("token", accessToken);

            toast.success(res.data?.message);

            navigate("/");

            console.log({ login: res });
            // console.log({login:res.data?.data?.credentials});

            return res;
        } catch (error: any) {
            const cause = error?.response?.data?.cause;
            const validationMessage =
                cause?.validationErrors?.[0]?.issues?.[0]?.message;

            if (validationMessage) {
                toast.error(validationMessage);
            } else {
                toast.error(error?.response?.data?.message );
            }
        } finally {
            setLoading(false);
        }
    };
    const logout = async (
        values: logoutFlags
    ): Promise<AxiosResponse<ILoginResponse> | undefined> => {
        try {

            const res = await axios.post<ILoginResponse>(
                `${baseUrl}/user/logout`,
                values
            );
            

            localStorage.removeItem("token");

            toast.success(res.data?.message);

            navigate("/login");

            console.log({ login: res });
            // console.log({login:res.data?.data?.credentials});

            return res;
        } catch (error: any) {
            const cause = error?.response?.data?.cause;
            const validationMessage =
                cause?.validationErrors?.[0]?.issues?.[0]?.message;

            if (validationMessage) {
                toast.error(validationMessage);
            } else {
                toast.error(error?.response?.data?.message );
            }
        } 
    };







    return {
        login,
        loading
    }
}
