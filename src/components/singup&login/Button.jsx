import React from "react";

const Button = ({ disabled, btnName }) => {
  return (
    <div className="flex justify-center m-4">
      <button
        className="bg-[var(--primary-color)] text-white hover:bg-green-400 rounded-sm w-60 h-8"
        type="submit"
        disabled={disabled}
      >
        {btnName}
      </button>
    </div>
  );
};

export default Button;
