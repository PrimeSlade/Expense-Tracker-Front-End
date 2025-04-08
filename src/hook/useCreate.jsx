import axiosInstance from "axiosInstance";
import React, { useState } from "react";

export const useCreate = () => {
  const [error, setError] = useState(null);

  const create = async ({
    categories,
    note,
    created_at,
    cost,
    icon_name,
    transaction_type,
  }) => {
    try {
      const { data } = await axiosInstance.post(
        "/create",
        {
          categories: categories,
          note: note,
          created_at: created_at,
          cost: cost,
          icon_name: icon_name,
          transaction_type: transaction_type,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      return data;
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return { create, error };
};
