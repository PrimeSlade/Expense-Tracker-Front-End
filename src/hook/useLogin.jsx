import { useState } from "react";
import { useAuthContext } from "./useAuthConext";
import { useNavigate } from "react-router";
import axiosInstance from "../../axiosInstance";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      //for giving info
      setIsLoading(true);
      setError(null);

      const { data } = await axiosInstance.post(
        "/api/auth/login",
        {
          email: email,
          password: password,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      //save the user to local storage
      localStorage.setItem("user", JSON.stringify(data));

      //update the auth context
      dispatch({ type: "LOGIN", payload: data });
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.error);
    }
  };

  return { login, isLoading, error };
};

export default useLogin;
