

import axios from "axios";
import { useAuthContext } from "./useAppContexts";
import { useState } from "react";

export function useAxios() {
    const [_role, setRole] = useState<string | null>("Bearer");
    const [_userId, setUserId] = useState<string | null>(null);
  const {
    setToken,
    setRefreshToken,
    getAuthHeader,
    getRefreshHeader,
  } = useAuthContext();

  const handleForceLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");

    setToken(null);
    setRefreshToken(null);
    setRole(null);
    setUserId(null);

    window.location.href = "/login";
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  let refreshing = false; //follow the res

  console.log(refreshing);
  
  const axiosInstance = axios.create({
    baseURL: "https://www.goldenstitchleathers.com/api" ,
    // baseURL: import.meta.env.VITE_BASE_URL || "",
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
        `https://www.goldenstitchleathers.com/api/user/refresh-token`,
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

      // check token expired
      const isTokenExpired =
        error.response?.status === 401 ||
        error.response?.data?.message?.toLowerCase()?.includes("jwt expired");

      // logout condition
      const logoutRes =
        error.response?.data?.message?.toLowerCase()?.includes("not registered account");

      if (logoutRes) {
        handleForceLogout();
        return Promise.reject(error);
      }

      // retry if token end
      if (isTokenExpired && !originalRequest._retry) {
        originalRequest._retry = true;
        refreshing = true;

        const newCredentials = await getNewCredentials();
        refreshing = false;

        if (newCredentials?.access_token) {
          const role = localStorage.getItem("role");
          const signature = role === "System" ? "System" : "Bearer";
          originalRequest.headers["Authorization"] = `${signature} ${newCredentials.access_token}`;

          return axiosInstance(originalRequest);
        } else {
          handleForceLogout();
          return Promise.reject(error);
        }
      }

      const jwtMsg = error?.response?.data?.message?.toLowerCase?.() || "";
      if (jwtMsg.includes("jwt expired")) {
        return Promise.reject({ ...error, silent: true });
      }

      return Promise.reject(error);
    }
  );

  // axiosInstance.interceptors.response.use(
  //   (response) => response,
  //   async (error) => {
  //     const originalRequest = error.config;
  //     // check token expired
  //     const isTokenExpired =
  //       error.response?.status === 401 ||
  //       error.response?.data?.message?.toLowerCase()?.includes("jwt expired");
  //       // error.response?.data?.message?.toLowerCase()?.includes("Not registered account");
  //     const logoutRes =

  //       error.response?.data?.message?.toLowerCase()?.includes("Not registered account");

  //     if (logoutRes) {
  //       localStorage.removeItem("token");
  //       localStorage.removeItem("refreshToken");
  //       localStorage.removeItem("role");

  //       setToken(null);
  //       setRefreshToken(null);
  //       setRole(null);
  //       setUserId(null);

  //       // 2. حولي مباشرة لصفحة اللوجين
  //       window.location.href = "/login";

  //       // 3. أوقف الكود
  //       return Promise.reject(error);
  //     }
  //     // retry if token end
  //     if (isTokenExpired && !originalRequest._retry) {
  //       originalRequest._retry = true;
  //       refreshing = true;

  //       const newCredentials = await getNewCredentials();
  //       refreshing = false;

  //       // refresh token success
        
  //       if (newCredentials?.access_token) {
  //         const role = localStorage.getItem("role");
  //         const signature = role === "System" ? "System" : "Bearer";
  //         originalRequest.headers["Authorization"] = `${signature} ${newCredentials.access_token}`;

  //         // req re-back
  //         return axiosInstance(originalRequest);
  //       } else {
  //         // silent error
  //         return Promise.reject({ ...error, silent: true });
  //       }
  //     }

  //     // don't show jwt 

  //     const jwtMsg = error?.response?.data?.message?.toLowerCase?.() || "";
  //     if (jwtMsg.includes("jwt expired")) {
  //       return Promise.reject({ ...error, silent: true });
  //     }
  //     // return author errors

  //     return Promise.reject(error);
  //   }
  // );



  return axiosInstance;
}
