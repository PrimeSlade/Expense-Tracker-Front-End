import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "@/hook/useAuthConext";

const currencies = [
  "USD", // US Dollar
  "EUR", // Euro
  "CNY", // Chinese Yuan
  "JPY", // Japanese Yen
  "GBP", // British Pound
  "INR", // Indian Rupee
  "CAD", // Canadian Dollar
  "AUD", // Australian Dollar
  "THB", // Thai Baht
  "MMK", // Myanmar Kyat
];

const Currency = () => {
  const { user } = useAuthContext();

  const currencySchema = z.object({
    currency: z.enum(currencies, {
      errorMap: () => ({ message: "Select a valid currency" }),
    }),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(currencySchema),
    defaultValues: {
      currency: user.currency,
    },
  });

  return (
    <>
      <div className="border-b w-100 font-bold mt-10 mb-5">Currency</div>
    </>
  );
};

export default Currency;
