import React, { useContext, useEffect, useState } from "react";
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
import { toast } from "sonner";
import ErrorBox from "./ErrorBox";
import { useEdit } from "@/hook/useEdit";
import { DataContext } from "@/context/DataContext";

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

const CreateForm = ({
  id,
  cost,
  type,
  category,
  note,
  setIsHidden,
  setIsEdit,
  mode = "create",
  btnName,
}) => {
  //date
  const [date, setDate] = useState(new Date());
  const { create, createError, setCreateError } = useCreate();
  const { edit, editError, setEditError } = useEdit();

  const { datas, setDatas } = useContext(DataContext);

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

  const {
    control,
    register,
    handleSubmit,
    reset, //will reset the default value
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cost: cost || "",
      type: type || "",
      category: category || "",
      note: note || "",
    },
  });

  const changeHidden = () => {
    if (mode === "create") {
      setIsHidden(true);
    } else if (mode === "edit") {
      setIsEdit(false);
    }
  };

  const onSubmit = async (data) => {
    const d = date.toDateString();

    let list;

    if (mode === "create") {
      list = await create(data.category, data.note, d, data.cost, data.type);
    } else {
      list = await edit(id, data.category, data.note, d, data.cost, data.type);
    }

    if (list?.id && mode === "create") {
      setIsHidden(true);
      setDatas((data) => [list, ...data]);
    } else {
      setIsEdit(false);
      const ds = [...datas];
      const index = datas.findIndex((d) => d.id === id);
      ds[index] = list;
      setDatas(ds);

      //Activate
      toast.success("Edit was successful");
    }
  };

  useEffect(() => {
    reset({
      cost: cost || "",
      type: type || "",
      category: category || "",
      note: note || "",
    });
  }, [cost, type, category, note, reset]);

  return (
    <>
      <form action="submit" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center mb-5">
          <div className="border w-230 mt-7 rounded-xl h-auto p-10 bg-black grid grid-cols-2 gap-5">
            <CostInput register={register} errors={errors} />
            <TypeInput control={control} errors={errors} />
            <CateInput
              control={control}
              categories={categories}
              errors={errors}
              name={"Category"}
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
                {btnName}
              </Button>
            </div>
          </div>
        </div>
        {(createError || editError) && (
          <ErrorBox
            error={mode === "create" ? createError : editError}
            setError={mode === "create" ? setCreateError : setEditError}
            errorText={"Error!"}
          />
        )}
      </form>
    </>
  );
};

export default CreateForm;
