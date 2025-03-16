import { useState } from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eyesOn, setEyesOn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center sm:h-screen">
      <form onSubmit={handleSubmit}>
        <div className="border-1 pt-10 pl-20 pr-20 pb-10 rounded-2xl border-white shadow-none sm:shadow-md">
          <h1 className="font-bold text-2xl flex justify-center text-green-600">
            Log Into Your Account
          </h1>

          <div className="m-1 ">
            <h2>Email</h2>
            <input
              value={email}
              type="text"
              placeholder="Enter your email"
              className="border-gray-300 border rounded-md h-8 w-80 pl-4 pt-5 pb-5 focus:outline-none focus:border-green-600"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="m-1 relative">
            <h2>Password</h2>
            <input
              value={password}
              type={eyesOn ? "text" : "password"}
              placeholder="Enter your password"
              className="border-gray-300 border rounded-md h-8 w-80 pl-4 pt-5 pb-5 focus:outline-none focus:border-green-600"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            {!eyesOn ? (
              <FontAwesomeIcon
                icon={faEye}
                className="absolute right-3 top-1/2 pt-1"
                onClick={() => {
                  setEyesOn(true);
                }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faEyeSlash}
                className="absolute right-3 top-1/2 pt-1"
                onClick={() => {
                  setEyesOn(false);
                }}
              />
            )}
          </div>
          <div className="flex justify-center m-4">
            <button
              className="bg-green-600 text-white hover:bg-green-400 rounded-sm w-60 h-8"
              type="submit"
            >
              Create an Account
            </button>
          </div>
          <Link to={"/signup"}>
            <div className="flex justify-center">
              Don't have an account{" "}
              <h3 className="ml-2 font-bold  text-green-600">Sign up</h3>
            </div>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
