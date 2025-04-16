import { useNavigate } from "react-router";
import axiosInstance from "../../axiosInstance";
import React, { useState } from "react";
import { useAuthContext } from "./useAuthConext";

export const useUpdateCurrency = () => {
  const [error, setError] = useState();
  const naviagate = useNavigate();
  const { user, dispatch } = useAuthContext();

  const update = async (currency) => {
    try {
      const { data } = await axiosInstance.patch(
        "/user/currency/update",
        {
          newCurrency: currency,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
      naviagate("/expenses");

      return data;
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    }
  };

  return { update, error, setError };
};
