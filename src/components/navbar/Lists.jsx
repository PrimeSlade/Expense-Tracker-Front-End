import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Lists = ({ icon, text, onClick, isActive }) => {
  return (
    <>
      <li
        className={`menu w-70 hover:text-[var(--primary-color)] ${
          isActive ? "text-[var(--primary-color)]" : ""
        }`}
      >
        <div>
          <div>
            <FontAwesomeIcon icon={icon} />
          </div>
          <h2 className="font-bold text-lg " onClick={onClick}>
            {text}
          </h2>
        </div>
      </li>
    </>
  );
};

export default Lists;
