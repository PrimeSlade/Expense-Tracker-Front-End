import { useState } from "react";
import { useAuthContext } from "./useAuthConext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    //for giving info
    setIsLoading(true);
    setError(null);

    //fetch
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    });

    const user = await res.json();
    console.log(user);

    //not ok
    if (user.error) {
      setIsLoading(false);
      setError(user.error);
    }
    if (user.id) {
      //save the user to local storage
      localStorage.setItem("user", JSON.stringify(user));

      //update the auth context
      dispatch({ type: "LOGIN", payload: user });
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};

export default useLogin;
