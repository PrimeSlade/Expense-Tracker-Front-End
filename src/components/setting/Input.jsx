import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Input } from "@/components/ui/input";

//Continue
const InputForm = ({
  type,
  title,
  placeholder,
  toggleIcon,
  register,
  schema,
  onToggle,
}) => {
  return (
    <div>
      <label className="text-black text-sm mb-4">{title}</label>
      <div className="border-1 border-gray-300 rounded-lg flex px-4 py-1 mb-2 items-center hover:border-[var(--primary-color)]">
        <Input
          type={type}
          placeholder={placeholder}
          className={"border-none shadow-none font-bold w-70 p-0"}
          {...register(`${schema}`)}
        />

        {toggleIcon && (
          <FontAwesomeIcon
            icon={toggleIcon}
            onClick={onToggle}
            className="cursor-pointer text-gray-500 hover:text-[var(--primary-color)]"
          />
        )}
      </div>
    </div>
  );
};

export default InputForm;
