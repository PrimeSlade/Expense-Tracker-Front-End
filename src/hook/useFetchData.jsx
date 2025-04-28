import { useState } from "react";
import axiosInstance from "../../axiosInstance";

export const useFetchData = () => {
  const [error, setError] = useState();

  const fetch = async () => {
    try {
      const { data } = await axiosInstance.get("/lists/view");
      return data;
    } catch (error) {
      setError(error?.response?.data?.error);
    }
  };

  return { fetch, error, setError };
};
