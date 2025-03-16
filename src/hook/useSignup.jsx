import { useState } from "react";
import { useNavigate } from "react-router";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();

  const signup = async (name, email, password) => {
    //for giving info
    setIsLoading(true);
    setError(null);

    //fetch
    const res = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, email: email, password: password }),
    });

    const user = await res.json();

    //not ok
    if (user.error) {
      setIsLoading(false);
      setError(user.error);
    }
    if (user.id) {
      console.log("ok");
      setIsLoading(false);
      navigate("/login");
    }
  };

  return { signup, isLoading, error };
};

export default useSignup;
