import { useState } from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrimPassword, setConfirmPassword] = useState("");
  const [eyesOn, setEyesOn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center sm:h-screen">
      <form onSubmit={handleSubmit}>
        <div className="border-1 pt-15 pl-20 pr-20 pb-20 rounded-2xl border-white shadow-none sm:shadow-md">
          <h1 className="font-bold text-2xl flex justify-center text-green-600">
            Create Your Account
          </h1>
          <div className="m-1">
            <h2>Username</h2>
            <input
              value={name}
              type="text"
              placeholder="Enter your name"
              className="border-gray-300 border rounded-md h-8 w-80 pl-4 pt-5 pb-5 focus:outline-none focus:border-green-600"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className="m-1">
            <h2>Confirm Password</h2>
            <input
              value={confrimPassword}
              type="password"
              placeholder="Confirm your password"
              className="border-gray-300 border rounded-md h-8 w-80 pl-4 pt-5 pb-5 focus:outline-none focus:border-green-600"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center m-4">
            <button
              className="bg-green-600 text-white hover:bg-green-400 rounded-sm w-60 h-8"
              type="submit"
            >
              Create an Account
            </button>
          </div>
          <Link to={"/login"}>
            <div className="flex justify-center">
              Already have an account{" "}
              <h3 className="ml-2 font-bold  text-green-600">Login</h3>
            </div>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
