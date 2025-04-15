import axiosInstance from "../../axiosInstance";
import React, { useState } from "react";

export const useEditPassword = () => {
  const [passError, setPassError] = useState();

  const editPass = async (oldPassword, newPassword) => {
    try {
      const { data } = await axiosInstance.put(
        "/password",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      return data;
    } catch (error) {
      console.log(error);
      setPassError(error.response.data.error);
    }
  };

  return { editPass, passError, setPassError };
};
