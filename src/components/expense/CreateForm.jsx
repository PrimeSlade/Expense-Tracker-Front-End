import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateForm = () => {
  return (
    <div className="flex justify-center">
      <div className="border w-230 mt-7 rounded-xl h-200 bg-black">
        <div className="flex justify-around mt-7">
          <div>
            <div className="font-bold text-white text-xl mb-4">Cost</div>
            <Input
              type="email"
              placeholder="Cost"
              className={"bg-white font-bold"}
            />
          </div>
          <div>
            <div className="font-bold text-white text-xl mb-4">Type</div>
            <Select>
              <SelectTrigger className="w-[180px] bg-white font-bold">
                <SelectValue placeholder="Types" />
              </SelectTrigger>
              <SelectContent className={"font-bold"}>
                <SelectItem
                  value="Income"
                  className={"text-[var(--primary-color)]"}
                >
                  Income
                </SelectItem>
                <SelectItem value="Expense" className={"text-red-600"}>
                  Expense
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
