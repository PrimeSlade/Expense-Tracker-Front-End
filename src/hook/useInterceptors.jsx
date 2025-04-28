import axiosInstance from "../../axiosInstance";
import React, { useEffect } from "react";
import { useAuthContext } from "./useAuthConext";
import { toast } from "sonner";

export const useInterceptors = () => {
  const { user, dispatch } = useAuthContext();

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        const user = JSON?.parse(localStorage.getItem("user"));

        config.headers["Authorization"] = `Bearer ${user?.accessToken}`;

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // if (error.response.data.error === "Access token is not authorized") {
          // }
          console.log(error.response.data.error);

          toast.error("Session expired. Please log in again.");

          setTimeout(() => {
            dispatch({ type: "LOGOUT" });
            localStorage.removeItem("user");
          }, 3000);
        }

        // Reject the promise to propagate the error
        return Promise.reject(error);
      }
    );

    //memory management
    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, [user, dispatch]);
};
