import {  useEffect, useState } from "react";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import type { loginFields, logoutFlags } from "@/Utilities/types";
import type {  ILoginResponse } from "@/Utilities/interfaces";
import { toast } from "sonner";
import axios from "axios";
import { AuthContext } from "./contextCreations/AuthContex";

interface DecodedToken {
  id: string;
  exp: number;
  iat: number;
}




export default function AuthContextProvider({ children }: { children: ReactNode }) {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000",
  });

  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>("Bearer");
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  
const login = async (
  values: loginFields
): Promise<boolean> => {
  try {
    setLoading(true);
    const res = await axiosInstance.post<ILoginResponse>(`/auth/login`, values);

    const userRole = res.data?.data?.bearer;
    setRole(userRole);
    localStorage.setItem("role", userRole);
    console.log("userRole:", res.data?.data?.bearer);

    const credentials = res.data?.data?.credentials;

    const refreshToken = credentials.refresh_token;
    setRefreshToken(refreshToken);
    localStorage.setItem("refreshToken", refreshToken);

    const accessToken = credentials.access_token;
    setToken(accessToken);
    localStorage.setItem("token", accessToken);

    toast.success(res.data?.message);
    console.log({ login: res });

    return true; 
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      
      const cause = error?.response?.data?.cause;
      const validationMessage =
      cause?.validationErrors?.[0]?.issues?.[0]?.message;
      console.log(validationMessage || error?.response?.data?.message);
    }
    return false; 
    // toast.error(validationMessage || error?.response?.data?.message);
  } finally {
    setLoading(false);
  }
};

  const getAuthHeader = (): Record<string, string> => {
    if (!token) return {} as Record<string, string>;

    const signature = role === "System" ? "System" : "Bearer";
    return { Authorization: `${signature} ${token}` };
  };


  const getRefreshHeader = (): Record<string, string> => {
  
  const currentRefreshToken = refreshToken || localStorage.getItem("refreshToken");
  if (!currentRefreshToken) return {};
    const signature = role === "System" ? "System" : "Bearer";

  return { Authorization: `${signature} ${currentRefreshToken}` };
};

  const logout = async (values?: logoutFlags): Promise<void> => {
    try {
      const res = await axiosInstance.post(`/user/logout`, values, {
        headers: getAuthHeader(),
      });

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("role");

      setToken(null);
      setRefreshToken(null);
      setRole(null);
      setUserId(null);

      toast.success(res.data?.message);
      navigate?.("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (axios.isAxiosError(error)) {
          console.log({errorlogout:error});
          
        }
        
      }
      
      // const detailedError =
      //   error?.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;
      // const generalError = error?.response?.data?.message;
      // console.log({generalError,detailedError });
      
      // toast.error(detailedError || generalError || "logout issue ");
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRefresh = localStorage.getItem("refreshToken");
    const storedRole = localStorage.getItem("role");

    if (storedToken) {
      setToken(storedToken);
      try {
        const decoded = jwtDecode<DecodedToken>(storedToken);
        setUserId(decoded.id);
      } catch (error) {
        console.log("Invalid token", error);
        localStorage.removeItem("token");
        setToken(null);
        setUserId(null);
      }
    }

    if (storedRefresh) setRefreshToken(storedRefresh);
    if (storedRole) setRole(storedRole);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        userId,
        getAuthHeader,
        loading,
        login,
        logout,
        refreshToken,
        setRefreshToken,
        role,
        setRole,
        getRefreshHeader
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
