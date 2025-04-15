import axiosInstance from "../../axiosInstance";
import React, { useState } from "react";

export const useEdit = () => {
  const [editError, setEditError] = useState(null);

  const edit = async (
    id,
    category,
    note,
    created_at,
    cost,
    transaction_type
  ) => {
    try {
      const { data } = await axiosInstance.put(
        `/lists/update/${id}`,
        {
          category: category,
          note: note,
          created_at: created_at,
          newCost: cost,
          transaction_type: transaction_type,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
      setEditError(error.response.data.error);
    }
  };
  return { edit, editError, setEditError };
};
