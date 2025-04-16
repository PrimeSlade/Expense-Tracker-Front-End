import axiosInstance from "../../axiosInstance";
import React, { useState } from "react";
import { useAuthContext } from "./useAuthConext";

export const useEditPassword = () => {
  const [passError, setPassError] = useState();
  const { user, dispatch } = useAuthContext();

  const editPass = async (oldPassword, newPassword) => {
    try {
      const { data } = await axiosInstance.put(
        "/user/password",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      //will trigger after 3s
      setTimeout(() => {
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("user");
      }, 2000);

      return data;
    } catch (error) {
      console.log(error);
      setPassError(error.response.data.error);
    }
  };

  return { editPass, passError, setPassError };
};
