import axiosInstance from "../../axiosInstance";
import React, { useState } from "react";

export const useFetchAmount = () => {
  const [error, setError] = useState();

  const getAmount = async () => {
    try {
      const { data } = await axiosInstance.get("/user/amount");
      return data;
    } catch (error) {
      setError(error.response.data.error);
    }
  };
  return { getAmount, error, setError };
};
