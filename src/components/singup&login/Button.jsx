import React from "react";

const Button = ({ disabled, btnName, variant = "primary" }) => {
  const variants = {
    primary: "bg-[var(--primary-color)] text-white hover:bg-green-800 w-60",
    secondary: " bg-red-600 text-white hover:bg-red-700 w-35",
  };
  return (
    <div className="flex justify-center m-4 ">
      <button
        className={`rounded-sm h-8  ${variants[variant]}`}
        type="submit"
        disabled={disabled}
      >
        {btnName}
      </button>
    </div>
  );
};

export default Button;
