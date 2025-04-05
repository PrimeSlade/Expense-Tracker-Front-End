import NavBar from "../../components/navbar/NavBar";
import { useAuthContext } from "../../hook/useAuthConext";
import { useEffect } from "react";
import { Route, Routes } from "react-router";

const Main = () => {
  return (
    <>
      <div className="grid grid-cols-[auto_1fr]">
        <div className="w-80">
          <NavBar />
        </div>
        <div className="md:w-full md:flex">
          <div className="md:w-250 md:h-180  m-auto rounded-xl bg-gray-100">
            ok
            <Routes>
              {/* <Route path="/" element={<Home />} />
              <Route path="/" element={<Home />} />
              <Route path="/" element={<Home />} />
              <Route path="/" element={<Home />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
