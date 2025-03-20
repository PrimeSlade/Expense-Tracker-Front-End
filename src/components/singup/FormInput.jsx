import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FormInput = ({
  title,
  type,
  placeholder,
  toggleIcon,
  onToggle,
  ...rest
}) => {
  return (
    <div className="m-1">
      <label htmlFor="" className="font-bold">
        {title}
        <span className="text-red-600">*</span>
      </label>
      <div className="border-1 border-gray-300 rounded-lg flex px-4 py-2 mb-4 items-center hover:border-[var(--primary-color)]">
        <input
          type={type}
          placeholder={placeholder}
          className="flex-grow outline-none"
          {...rest}
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

export default FormInput;
