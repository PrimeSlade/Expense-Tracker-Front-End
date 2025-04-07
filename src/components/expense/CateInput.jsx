import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";

const CateAndDateInput = ({ control, categories }) => {
  return (
    <Controller
      name="category"
      control={control}
      render={({ field }) => (
        <div>
          <div className="font-bold text-white text-xl mb-4">Categories</div>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="w-[180px] bg-white font-bold">
              <SelectValue placeholder="Categories" />
            </SelectTrigger>
            <SelectContent className={"font-bold"}>
              {categories.map((category, i) => (
                <SelectItem key={i} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    />
  );
};

export default CateAndDateInput;
