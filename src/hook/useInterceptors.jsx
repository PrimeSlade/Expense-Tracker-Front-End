import axiosInstance from "../../axiosInstance";
import React, { useEffect } from "react";
import { useAuthContext } from "./useAuthConext";
import { toast } from "sonner";

export const useInterceptors = () => {
  const { dispatch } = useAuthContext();

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        const oldUser = JSON?.parse(localStorage.getItem("user"));

        config.headers["Authorization"] = `Bearer ${oldUser?.accessToken}`;

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const original = error.config;

        if (
          error.response?.status === 401 &&
          error.response.data.error === "Access token is not authorized"
        ) {
          try {
            const { data } = await axiosInstance.post("/api/auth/refresh");

            const oldData = JSON?.parse(localStorage.getItem("user"));
            const newUser = { ...oldData, accessToken: data.accessToken };

            localStorage.setItem("user", JSON.stringify(newUser));
            dispatch({ type: "LOGIN", payload: newUser });

            original.headers["Authorization"] = `Bearer ${data.accessToken}`;

            //retry it again
            return axiosInstance(original);
          } catch (refreshError) {
            //if refresh token is invalid

            toast.error("Session expired. Please log in again.");

            setTimeout(() => {
              dispatch({ type: "LOGOUT" });
              localStorage.removeItem("user");
            }, 3000);

            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    //memory management
    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, [dispatch]);
};
