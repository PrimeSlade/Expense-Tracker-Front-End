import NavBar from "../../components/navbar/NavBar";
import { useAuthContext } from "../../hook/useAuthConext";
import { useEffect } from "react";

const Home = () => {
  return (
    <>
      <div className="grid grid-cols-[auto_1fr]">
        <div className="w-80">
          <NavBar />
        </div>
        <div className="w-full flex">
          <div className="w-250 md:h-180  m-auto rounded-xl bg-gray-100">
            ok
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
