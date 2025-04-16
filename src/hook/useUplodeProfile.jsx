import axiosInstance from "../../axiosInstance";
import React, { useState } from "react";

export const useUplodeProfile = () => {
  const [profileError, setProfileError] = useState();

  const uplodePfp = async (file) => {
    const formData = new formData();
    formData.append("img", file);

    try {
      const { data } = axiosInstance.post("/user/profile/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      return data;
    } catch (error) {
      console.log(error);
      setProfileError(error.response.data.error);
    }
  };
  return { uplodePfp, profileError, setProfileError };
};
