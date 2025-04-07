import React from "react";
import CostInput from "./CostInput";
import CateInput from "./CateInput";
import DateInput from "./DateInput";
import TypeInput from "./TypeInput";
import NoteInput from "./NoteInput";
import { Button } from "../ui/button";

const CreateForm = () => {
  return (
    <div className="flex justify-center">
      <div className="border w-230 mt-7 rounded-xl h-auto p-10 bg-black grid grid-cols-2 gap-5">
        <CostInput />
        <TypeInput />
        <CateInput />
        <DateInput />
        <NoteInput />
        <div className="flex justify-end col-span-2 gap-3">
          <Button className={" border border-white hover:border-red-600"}>
            Cancel
          </Button>
          <Button
            className={"bg-white text-black hover:bg-gray-500 hover:text-white"}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
