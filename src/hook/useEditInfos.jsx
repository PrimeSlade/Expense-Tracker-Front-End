import axiosInstance from "../../axiosInstance";
import React, { useState } from "react";

export const useEditInfos = () => {
  const [infoError, setInfoError] = useState();

  const editInfo = async (name, email) => {
    try {
      const { data } = await axiosInstance.put(
        "/user",
        {
          name: name,
          email: email,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      return data;
    } catch (error) {
      console.log(error);
      setInfoError(error.response.data.error);
    }
  };

  return { editInfo, infoError, setInfoError };
};
