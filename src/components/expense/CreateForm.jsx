import React from "react";
import CostInput from "./CostInput";
import CateInput from "./CateInput";
import DateInput from "./DateInput";
import TypeInput from "./TypeInput";

const CreateForm = () => {
  return (
    <div className="flex justify-center">
      <div className="border w-230 mt-7 rounded-xl h-auto p-10 bg-black grid grid-cols-2 gap-5">
        <CostInput />
        <TypeInput />
        <CateInput />
        <DateInput />
      </div>
    </div>
  );
};

export default CreateForm;
