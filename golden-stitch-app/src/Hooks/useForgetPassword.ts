import {  useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios, { type AxiosResponse } from 'axios';
import type { forgetPasswordField, OtpField, resetPassword } from '@/Utilities/types';
import { toast } from 'sonner';
import type { IForgetPasswordResponse } from '@/Utilities/interfaces';

export default function useForgetPassword() {

    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_BASE_URL;




    const sendForgetPassword = async (
        values: forgetPasswordField
    ): Promise<AxiosResponse<IForgetPasswordResponse> | undefined> => {
        try {
            setLoading(true);

            const res = await axios.patch<IForgetPasswordResponse>(
                `${baseUrl}/auth/send-forgot-password`,
                values
            );

            toast.success(res.data?.message);

            

            // console.log({ reset: res });

            return res;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                
                const cause = error?.response?.data?.cause;
                const validationMessage =
                    cause?.validationErrors?.[0]?.issues?.[0]?.message;
    
                if (validationMessage) {
                    toast.error(validationMessage);
                } else {
                    toast.error(error?.response?.data?.message );
                }
            }
        } finally {
            setLoading(false);
        }
    };
    const verifyForgetPassword = async (
        values: OtpField
    ): Promise<AxiosResponse<IForgetPasswordResponse> | undefined> => {
        try {
            setLoading(true);

            const res = await axios.patch<IForgetPasswordResponse>(
                `${baseUrl}/auth/verify-forgot-password`,
                values
            );

            toast.success(res.data?.message);

            // navigate("/create-new-password");

            console.log({ result: res });

            return res;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                
                const cause = error?.response?.data?.cause;
                const validationMessage =
                    cause?.validationErrors?.[0]?.issues?.[0]?.message;
    
                if (validationMessage) {
                    toast.error(validationMessage);
                } else {
                    toast.error(error?.response?.data?.message );
                }
            }
        } finally {
            setLoading(false);
        }
    };
    const resetPassword = async (
        values: resetPassword
    ): Promise<AxiosResponse<IForgetPasswordResponse> | undefined> => {
        try {
            setLoading(true);

            const res = await axios.patch<IForgetPasswordResponse>(
                `${baseUrl}/auth/reset-forgot-password`,
                values
            );

            toast.success(res.data?.message);

            navigate("/login");

            console.log({ result: res });

            return res;
        } catch (error: unknown)
        {
            if (axios.isAxiosError(error)) {
                
                const cause = error?.response?.data?.cause;
                const validationMessage =
                    cause?.validationErrors?.[0]?.issues?.[0]?.message;
    
                if (validationMessage) {
                    toast.error(validationMessage);
                } else {
                    toast.error(error?.response?.data?.message);
                }
            }
        } finally {
            setLoading(false);
        }
    };



    
    return {
        sendForgetPassword,
        verifyForgetPassword,
        resetPassword,
        loading,
    }
}
