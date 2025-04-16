import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";

const CateInput = ({ control, categories, errors, name }) => {
  return (
    <Controller
      name={`${name.toLowerCase()}`}
      control={control}
      render={({ field }) => (
        <div>
          <div className="font-bold text-white text-xl mb-4">{name}</div>
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
          {errors.category && (
            <div className="text-red-700 mt-2">{errors.category.message}</div>
          )}
        </div>
      )}
    />
  );
};

export default CateInput;
