import { useFetchAmount } from "@/hook/useFetchAmount";
import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [datas, setDatas] = useState([]);
  const [amount, setAmount] = useState();

  const { getAmount, error, setError } = useFetchAmount();

  useEffect(() => {
    const data = async () => {
      const cost = await getAmount();
      setAmount(cost);
    };

    data();
  }, [datas]);

  return (
    <DataContext.Provider value={{ datas, setDatas, amount }}>
      {children}
    </DataContext.Provider>
  );
};
