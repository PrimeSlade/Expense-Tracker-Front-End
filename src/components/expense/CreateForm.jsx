import React, { useState } from "react";
import CostInput from "./CostInput";
import CateInput from "./CateInput";
import DateInput from "./DateInput";
import TypeInput from "./TypeInput";
import NoteInput from "./NoteInput";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AlertBox from "../alertbox/AlertBox";

const categories = [
  "Income",
  "Rent",
  "Utilities",
  "Groceries",
  "Transportation",
  "Insurance",
  "Dining Out",
  "Snacks",
  "Household Supplies",
  "Phone & Internet",
  "Streaming Services",
  "Software & Apps",
  "Work Expenses",
  "Debt Payments",
  "Savings & Investments",
  "Bank Fees",
  "Entertainment",
  "Shopping",
  "Health & Fitness",
  "Education",
  "Gifts & Donations",
  "Travel",
  "Emergency",
  "Kids & Pets",
];

const formSchema = z.object({
  cost: z.number().positive("Cost must be positive"),
  type: z.enum(["Income", "Expense"], {
    errorMap: () => ({ message: "Select a valid type" }),
  }),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Select a valid category" }),
  }),
  note: z.string().optional(),
});

const CreateForm = ({ cost, type, category, note, setIsHidden }) => {
  //date
  const [date, setDate] = useState(new Date());

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cost: cost || "",
      type: type || "",
      categories: category || "",
      note: note || "",
    },
  });

  const changeHidden = () => {
    setIsHidden(true);
  };

  const submit = (data) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex justify-center">
          <div className="border w-230 mt-7 rounded-xl h-auto p-10 bg-black grid grid-cols-2 gap-5">
            <CostInput register={register} errors={errors} />
            <TypeInput control={control} errors={errors} />
            <CateInput
              control={control}
              categories={categories}
              errors={errors}
            />
            <DateInput date={date} setDate={setDate} />
            <NoteInput register={register} />
            <div className="flex justify-end col-span-2 gap-3">
              <AlertBox
                btn={"Cancel"}
                btnClassName={"border border-white hover:border-red-600"}
                title={"Are you absolutely sure?"}
                description={"This action cannot be undone."}
                onClick={changeHidden}
                type={"button"}
              />

              <Button
                type="submit"
                className={
                  "bg-white text-black hover:bg-gray-500 hover:text-white"
                }
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateForm;
