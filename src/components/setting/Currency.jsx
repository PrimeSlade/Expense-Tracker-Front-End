import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "@/hook/useAuthConext";
import CateInput from "../expense/CateInput";
import AlertBox from "../alertbox/AlertBox";
import { useUpdateCurrency } from "@/hook/useUpdateCurrency";
import ErrorBox from "@/components/expense/ErrorBox";
import { toast } from "sonner";

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
  const { update, error, setError } = useUpdateCurrency();

  const { user } = useAuthContext();

  const currencySchema = z.object({
    currency: z.enum(currencies, {
      errorMap: () => ({ message: "Select a valid currency" }),
    }),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(currencySchema),
    defaultValues: {
      currency: user.currency,
    },
  });

  const onSubmit = async (data) => {
    if (user.currency === data.currency) {
      setError(
        "Looks like your currency is still the same. Make some changes first!"
      );
      return;
    }
    const promise = async () => {
      return await update(data.currency);
    };

    toast.promise(promise(), {
      //promise not func that's why
      loading: "Uploading...",
      success: (data) => {
        return `Currency has been changed`;
      },
      error: "Error",
    });
  };

  return (
    <>
      <form action="submit" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex  flex-col">
          <div className="border-b w-100 font-bold mt-10 ">Currency</div>
          <CateInput
            control={control}
            categories={currencies}
            errors={errors}
            name={"Currency"}
          />
          <div className="flex justify-start w-85">
            <AlertBox
              btn={"Save Changes"}
              btnClassName={"border border-white mt-2"}
              title={"Are you absolutely sure?"}
              description={"This action cannot be undone."}
              type={"button"}
              onClick={() => {
                handleSubmit(onSubmit)(); //call back func
              }}
            />
          </div>
        </div>
      </form>
      {error && (
        <ErrorBox error={error} setError={setError} errorText={"Error!"} />
      )}
    </>
  );
};

export default Currency;
