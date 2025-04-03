import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Lists = ({ icon, text, onClick }) => {
  return (
    <>
      <li className="menu w-70 hover:text-[var(--primary-color)]">
        <div className="flex gap-2">
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
