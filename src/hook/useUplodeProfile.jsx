import axiosInstance from "../../axiosInstance";
import React, { useState } from "react";
import { useAuthContext } from "./useAuthConext";

export const useUplodeProfile = () => {
  const [profileError, setProfileError] = useState();
  const { user, dispatch } = useAuthContext();

  const uplodePfp = async (file) => {
    const formData = new FormData();
    formData.append("img", file);

    try {
      const { data } = await axiosInstance.post(
        "/user/profile/upload",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });

      return data;
    } catch (error) {
      console.log(error);
      setProfileError(error.response.data.error);
    }
  };
  return { uplodePfp, profileError, setProfileError };
};
