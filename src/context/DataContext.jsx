import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [datas, setDatas] = useState([]);

  return (
    <DataContext.Provider value={{ datas, setDatas }}>
      {children}
    </DataContext.Provider>
  );
};
