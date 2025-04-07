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

const formSchema = z.object({
  cost: z.number().positive("Cost must be positive"),
  note: z.string().optional(),
});

const CreateForm = () => {
  const [date, setDate] = useState(new Date());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cost: "",
      note: "",
    },
  });

  const submit = (data) => {
    console.log(data);
    console.log("ok");
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex justify-center">
          <div className="border w-230 mt-7 rounded-xl h-auto p-10 bg-black grid grid-cols-2 gap-5">
            <CostInput register={register} />
            <TypeInput />
            <CateInput />
            <DateInput date={date} setDate={setDate} />
            <NoteInput register={register} />
            <div className="flex justify-end col-span-2 gap-3">
              <Button
                type="button"
                className={" border border-white hover:border-red-600"}
              >
                Cancel
              </Button>
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
