import { useInterceptors } from "@/hook/useInterceptors";
import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useInterceptors(dispatch);

  //TODO: might cause an error
  //setting initial value when page is mounted
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    dispatch({ type: "LOGIN", payload: user });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
