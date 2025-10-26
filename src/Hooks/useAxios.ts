

import axios from "axios";
import { useAuthContext } from "./useAppContexts";

export function useAxios() {
  const {
    setToken,
    setRefreshToken,
    getAuthHeader,
    getRefreshHeader,
  } = useAuthContext();

  const axiosInstance = axios.create({
    baseURL:"http://54.221.212.74/api" ,
    // baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000",
  });
  // console.log({axiosInstance});
  

  axiosInstance.interceptors.request.use(
    (config) => {
      const authHeader = getAuthHeader();
      if (authHeader?.Authorization) {
        config.headers.Authorization = authHeader.Authorization;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const getNewCredentials = async () => {
    // alert stop
    const refreshHeader = getRefreshHeader();
    if (!refreshHeader?.Authorization) return null;
    try {
      const res = await axios.post(
        `http://54.221.212.74/api/user/refresh-token`,
        {},
        { headers: getRefreshHeader() }
      );

      // console.log({ refresh: res });

      const credentials = res.data?.data?.credentials;
      const newAccessToken = credentials?.access_token;
      const newRefreshToken = credentials?.refresh_token;

      if (newAccessToken) {
        setToken(newAccessToken);
        localStorage.setItem("token", newAccessToken);
      }

      if (newRefreshToken) {
        setRefreshToken(newRefreshToken);
        localStorage.setItem("refreshToken", newRefreshToken);
      }

      return credentials;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // console.log("❌ Refresh token failed", error?.response?.data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // const _msg =
        //   error?.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message ||
        //   error?.response?.data?.message ||
        //   "get new credentials issue";

        
        
        // console.log(msg);
        return null;
      }
    }
  };

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      const isTokenExpired =
        error.response?.status === 401 ||
        error.response?.data?.message?.toLowerCase()?.includes("jwt expired");

      if (isTokenExpired && !originalRequest._retry) {
        originalRequest._retry = true;
        const newCredentials = await getNewCredentials();

        if (newCredentials?.access_token) {
          const role = localStorage.getItem("role");
          const signature = role === "System" ? "System" : "Bearer";
          originalRequest.headers["Authorization"] = `${signature} ${newCredentials.access_token}`;

          return axiosInstance(originalRequest);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          return Promise.resolve({ data: null }); 
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
}
