import axios from "axios";
import { useAuthContext } from "./useAppContexts";

export function useAxios() {
  const {
    // token,
    // refreshToken,
    setToken,
    setRefreshToken,
    // role,
    // logout,
    getAuthHeader,
    getRefreshHeader

  } = useAuthContext();

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000",
  });

  const getNewCredentials = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/refresh-token`,
        {},
        {
          headers:
            // Authorization: `${role === "System" ? "System" : "Bearer"} ${refreshToken}`,
            getRefreshHeader()

        }
      );

      console.log({ refresh: res });


      const credentials = res.data?.data?.credentials
      const newAccessToken = res.data?.data?.credentials.access_token;
      const newRefreshToken = res.data?.data?.credentials.refresh_token;

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
        
        console.log("❌ Refresh token failed", error?.response?.data);
  
        const detailedError = error?.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;
        const generalError = error?.response?.data?.message;
        console.log(detailedError || generalError || "get new credentials issue ");
        return detailedError || generalError || "get new credentials issue "
      }

    }
  };


  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      const isTokenExpired =
        error.response?.status === 401 ||
        error.response?.status === 500 ||
        error.response?.data?.message === "jwt expired";

      if (isTokenExpired && !originalRequest._retry) {
        originalRequest._retry = true;
        const newToken = await getNewCredentials();

        if (newToken) {
          originalRequest.headers["Authorization"] = getAuthHeader().Authorization;
          return axiosInstance(originalRequest);
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
}
