import axiosInstance from "../../axiosInstance";
import React, { useState } from "react";

export const useDelete = () => {
  const [error, setError] = useState();

  const remove = async (id) => {
    try {
      const { data } = await axiosInstance.delete(`/lists/${id}`);

      return data;
    } catch (error) {
      console.log(error.response.data.error);
      setError(error.response.data.error);
    }
  };
  return { remove, error, setError };
};
