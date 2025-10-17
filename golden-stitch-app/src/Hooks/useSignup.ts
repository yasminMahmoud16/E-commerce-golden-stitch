import type { signupFields } from '@/Utilities/types';
import axios, { type AxiosResponse } from 'axios'
import { useState } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router-dom';
import { toast } from 'sonner';

export default function useSignup() {
    const [loading, setLoading] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

    const baseUrl = import.meta.env.VITE_BASE_URL;
    interface ISignupResponse {
        data?: {
            message: string;


        };
        message:string
        cause?: {
            validationErrors?: {
                issues?: { message: string }[];
            }[];
        };
    }
        interface IConfirmAccountField {
            email: string;
            otp:string
        };


    const navigate: NavigateFunction = useNavigate()
    const signup = async (
        values: signupFields
    ): Promise<AxiosResponse<ISignupResponse> | undefined> => {
        try {
            setLoading(true);

            const res = await axios.post<ISignupResponse>(
                `${baseUrl}/auth/signup`,
                values
            );

            toast.success(res.data?.message);

            navigate("/confirm-account");
            //   setTimeout(() => {
            //   }, 2000);

            return res;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                
                const cause = error?.response?.data?.cause;
                const validationMessage =
                    cause?.validationErrors?.[0]?.issues?.[0]?.message;
    
                if (validationMessage) {
                    // console.log(validationMessage);
                    
                    toast.error(validationMessage);
                } else {
                    // console.log(error?.response?.data);
                    toast.error(error?.response?.data?.message || "Signup failed");
                }
            }
        } finally {
            setLoading(false);
        }
    };
    const confirmAccount = async (values:IConfirmAccountField) => {
        try {
            setConfirmLoading(true);

            const res = await axios.patch<ISignupResponse>(
                `${baseUrl}/auth/confirm-email`,
                values
            );

            toast.success(res.data?.message);

            navigate("/login");


            return res;
        } catch (error ) {
            if (axios.isAxiosError(error)) {
                
                const cause = error?.response?.data?.cause;
                const validationMessage =
                    cause?.validationErrors?.[0]?.issues?.[0]?.message;
    
                if (validationMessage) {
                    toast.error(validationMessage);
                } else {
                    toast.error(error?.response?.data?.message || "Signup failed");
                }
            }
        } finally {
            setConfirmLoading(false);
        }
    };

    return {
        signup,
        loading,
        confirmAccount,
        confirmLoading
    }
}
