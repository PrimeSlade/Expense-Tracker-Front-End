import { useAuthContext } from "../../hook/useAuthConext";

const Home = () => {
  const { dispatch } = useAuthContext();

  const data = async () => {
    try {
      const res = await fetch("http://localhost:3000/create", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);

      if (data.error) {
        //VERY IMPORTANT need to do with alert box for redirecting user to login page
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="font-bold underline">Home</div>
      <button onClick={data}>click</button>
    </>
  );
};

export default Home;
