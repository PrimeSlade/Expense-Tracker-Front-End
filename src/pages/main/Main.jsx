import { useAuthContext } from "../../hook/useAuthConext";
import { useEffect } from "react";
import { Outlet } from "react-router";

import NavBar from "@/components/navbar/NavBar";

const Main = () => {
  return (
    <>
      <div className="grid grid-cols-[auto_1fr]">
        <div className="w-80">
          <NavBar />
        </div>
        <div className="md:w-full md:flex">
          <div className="md:w-250 md:h-180  m-auto rounded-xl bg-gray-100">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
