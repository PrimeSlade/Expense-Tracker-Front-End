import React from "react";
import { Input } from "@/components/ui/input";

const CostInput = ({ register, errors }) => {
  return (
    <div>
      <div className="font-bold text-white text-xl mb-4">Cost</div>
      <Input
        type="text"
        placeholder="Cost"
        className={"bg-white font-bold w-60"}
        {...register("cost", { valueAsNumber: true })}
      />
      {errors.cost && (
        <div className="text-red-700 mt-2">{errors.cost.message}</div>
      )}
    </div>
  );
};

export default CostInput;
