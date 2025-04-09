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
import { useCreate } from "@/hook/useCreate";

import {
  faMoneyBillWave,
  faHome,
  faPlug,
  faShoppingCart,
  faCar,
  faShieldAlt,
  faUtensils,
  faCookie,
  faCouch,
  faPhoneAlt,
  faTv,
  faLaptop,
  faBriefcase,
  faCreditCard,
  faPiggyBank,
  faBuilding,
  faVideo,
  faStore,
  faDumbbell,
  faBookOpen,
  faGift,
  faPlane,
  faAmbulance,
  faPaw,
} from "@fortawesome/free-solid-svg-icons";
import ErrorBox from "./ErrorBox";

// const categories = [
//   { name: "Income", iconName: faMoneyBillWave },
//   { name: "Rent", iconName: faHome },
//   { name: "Utilities", iconName: faPlug },
//   { name: "Groceries", iconName: faShoppingCart },
//   { name: "Transportation", iconName: faCar },
//   { name: "Insurance", iconName: faShieldAlt },
//   { name: "Dining Out", iconName: faUtensils },
//   { name: "Snacks", iconName: faCookie },
//   { name: "Household Supplies", iconName: faCouch },
//   { name: "Phone & Internet", iconName: faPhoneAlt },
//   { name: "Streaming Services", iconName: faTv },
//   { name: "Software & Apps", iconName: faLaptop },
//   { name: "Work Expenses", iconName: faBriefcase },
//   { name: "Debt Payments", iconName: faCreditCard },
//   { name: "Savings & Investments", iconName: faPiggyBank },
//   { name: "Bank Fees", iconName: faBuilding },
//   { name: "Entertainment", iconName: faVideo },
//   { name: "Shopping", iconName: faStore },
//   { name: "Health & Fitness", iconName: faDumbbell },
//   { name: "Education", iconName: faBookOpen },
//   { name: "Gifts & Donations", iconName: faGift },
//   { name: "Travel", iconName: faPlane },
//   { name: "Emergency", iconName: faAmbulance },
//   { name: "Kids & Pets", iconName: faPaw },
// ];

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
  const { create, error, setError } = useCreate();

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

  const submit = async (data) => {
    const d = date.toDateString();
    const list = await create(
      data.category,
      data.note,
      d,
      data.cost,
      data.type
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex justify-center mb-5">
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

            {error && (
              <ErrorBox
                error={error}
                setError={setError}
                errorText={"Error!"}
              />
            )}
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
