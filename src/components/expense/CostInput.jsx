import React from "react";
import { Input } from "@/components/ui/input";

const CostInput = () => {
  return (
    <div>
      <div className="font-bold text-white text-xl mb-4">Cost</div>
      <Input
        type="email"
        placeholder="Cost"
        className={"bg-white font-bold w-60"}
      />
    </div>
  );
};

export default CostInput;
