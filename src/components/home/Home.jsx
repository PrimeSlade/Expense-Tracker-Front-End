import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const data = async () => {
      const res = await fetch("http://localhost:3000", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
    };

    data();
  }, []);
  return <div className="font-bold underline">Home</div>;
};

export default Home;
