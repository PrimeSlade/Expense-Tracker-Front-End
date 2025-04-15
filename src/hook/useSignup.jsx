import { useState } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../../axiosInstance";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();

  const signup = async (name, email, password, confirmPassword) => {
    //for giving info
    setIsLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Password and ConfrimPassword must be the same");
      return;
    }

    try {
      const { data } = await axiosInstance.post(
        "/api/auth/signup",
        {
          name: name,
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setIsLoading(true);
      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.error);
    }
  };

  return { signup, isLoading, error };
};

export default useSignup;
