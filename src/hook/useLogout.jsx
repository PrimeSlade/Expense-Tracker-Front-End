import { useState } from "react";
import { useAuthContext } from "./useAuthConext";
import axiosInstance from "../../axiosInstance";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    try {
      await axiosInstance.post("/logout", {
        headers: { "Content-Type": "application/json" },
      });

      dispatch({ type: "LOGOUT" });

      localStorage.removeItem("user");
    } catch (error) {
      console.log(error);
      setError(error.response.error);
    }
  };

  return { logout };
};
