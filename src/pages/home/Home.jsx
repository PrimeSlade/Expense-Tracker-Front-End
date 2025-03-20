const Home = () => {
  const data = async () => {
    try {
      const res = await fetch("http://localhost:3000/create", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
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
