import { createContext, useState } from "react";

export const ActiveContext = createContext();

export const ActiveContextProvider = ({ children }) => {
  const [active, setActive] = useState("Home");

  return (
    <ActiveContext.Provider value={{ active, setActive }}>
      {children}
    </ActiveContext.Provider>
  );
};
