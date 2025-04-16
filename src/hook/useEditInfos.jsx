import axiosInstance from "../../axiosInstance";
import React, { useState } from "react";
import { useAuthContext } from "./useAuthConext";

export const useEditInfos = () => {
  const [infoError, setInfoError] = useState();
  const { user, dispatch } = useAuthContext();

  const editInfo = async (name, email) => {
    try {
      const { data } = await axiosInstance.put(
        "/user/update",
        {
          name: name,
          email: email,
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
      setInfoError(error.response.data.error);
    }
  };

  return { editInfo, infoError, setInfoError };
};
