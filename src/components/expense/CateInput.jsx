import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const CateAndDateInput = () => {
  return (
    <div>
      <div className="font-bold text-white text-xl mb-4">Categories</div>
      <Select>
        <SelectTrigger className="w-[180px] bg-white font-bold">
          <SelectValue placeholder="Categories" />
        </SelectTrigger>
        <SelectContent className={"font-bold"}>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CateAndDateInput;
