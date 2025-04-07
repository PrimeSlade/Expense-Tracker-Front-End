import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";

const TypeInput = ({ control }) => {
  return (
    <Controller
      name="type"
      control={control}
      render={({ field }) => (
        <div>
          <div className="font-bold text-white text-xl mb-4">Type</div>
          <Select value={field.value} onValueChange={field.onChange}>
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
      )}
    />
  );
};

export default TypeInput;
