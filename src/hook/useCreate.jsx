import axiosInstance from "../../axiosInstance";
import React, { useState } from "react";

export const useCreate = () => {
  const [createError, setCreateError] = useState(null);

  const create = async (category, note, created_at, cost, transaction_type) => {
    try {
      const { data } = await axiosInstance.post(
        "/lists/create",
        {
          category: category,
          note: note,
          created_at: created_at,
          cost: cost,
          transaction_type: transaction_type,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      return data;
    } catch (error) {
      console.log(error);
      setCreateError(error.response.data.error);
    }
  };

  return { create, createError, setCreateError };
};
