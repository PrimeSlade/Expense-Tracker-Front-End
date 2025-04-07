import React, { useContext, useState } from "react";
import { useAuthContext } from "../../hook/useAuthConext";
import { IoReorderThreeSharp } from "react-icons/io5";
import {
  faChartSimple,
  faWallet,
  faSliders,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import Lists from "./Lists";
import AlertBox from "../alertbox/AlertBox";
import { useNavigate } from "react-router";
import { ActiveContext } from "@/context/ActiveContext";

const NavBar = () => {
  const { user } = useAuthContext();
  const { active, setActive } = useContext(ActiveContext);

  const navigate = useNavigate();

  const handleClick = (page) => {
    setActive(page);
    navigate(`/${page.toLowerCase()}`);
  };

  return (
    <>
      <div className="drawer md:drawer-open">
        <input id="my-drawer" type="checkbox" className="drawer-toggle " />
        <div className="drawer-content md:hidden ml-3">
          <label htmlFor="my-drawer" className="text-5xl">
            <IoReorderThreeSharp />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="bg-base-200 text-base-content min-h-full md:w-80 p-4 flex flex-col">
            <li>
              <div className="flex justify-center items-center flex-col">
                <div className="avatar flex justify-center">
                  <div className="w-24 rounded-full">
                    <img src={user.img_url} />
                  </div>
                </div>
                <h2 className="font-bold text-2xl text-[var(--primary-color)] hover:text-green-800">
                  {user.name}
                </h2>
              </div>
            </li>
            <Lists
              icon={faChartSimple}
              text={"Home"}
              onClick={() => handleClick("Home")}
              isActive={active === "Home"}
            />
            <Lists
              icon={faWallet}
              text={"Expenses"}
              onClick={() => handleClick("Expenses")}
              isActive={active === "Expenses"}
            />
            <Lists
              icon={faLightbulb}
              text={"Smart Save"}
              onClick={() => handleClick("SmartSave")}
              isActive={active === "SmartSave"}
            />
            <Lists
              icon={faSliders}
              text={"Setting"}
              onClick={() => handleClick("Setting")}
              isActive={active === "Setting"}
            />
            <AlertBox
              btn={"Log out"}
              title={"Are you absolutely sure?"}
              description={"This action cannot be undone."}
            />
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
