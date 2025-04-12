import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableList } from "@fortawesome/free-solid-svg-icons";
import CreateForm from "@/components/expense/CreateForm";
import { useFetchData } from "@/hook/useFetchData";
import List from "@/components/expense/List";
import ErrorBox from "@/components/expense/ErrorBox";
import { Toaster } from "sonner";
import { DataContext } from "@/context/DataContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Expenses = () => {
  //data
  const { datas, setDatas } = useContext(DataContext);

  //temp data (for sorting)
  const [sortDatas, setSortDatas] = useState(datas);

  //sort value
  const [sortValue, setSortValue] = useState("default");

  const { fetch, error, setError } = useFetchData();

  //form
  const [isHidden, setIsHidden] = useState(true);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetch();

      if (data) {
        setDatas(data);
      }
    };

    getData();
  }, []);

  //sorting
  const handleChange = (value) => {
    setSortValue(value);

    let sorted = [...datas];

    if (value === "trx") {
      console.log("trx");
      sorted = sorted.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else if (value === "income") {
      console.log("income");
      sorted = sorted
        .filter((d) => d.transaction_type === "Income")
        .sort((a, b) => b.cost - a.cost);
    } else if (value === "expense") {
      console.log("expense");
      sorted = sorted
        .filter((d) => d.transaction_type === "Expense")
        .sort((a, b) => b.cost - a.cost);
    }
    setSortDatas(sorted);
  };

  //for keeping update
  useEffect(() => {
    handleChange(sortValue);
  }, [datas]);

  return (
    <>
      <div>
        <div className="flex justify-end mt-5 mr-10 gap-2">
          <div>
            <Select value={sortValue} onValueChange={handleChange}>
              <SelectTrigger className="min-w-[80px] border-black">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="default">Sort</SelectItem>
                  <SelectItem value="trx">Recent Transactions</SelectItem>
                  <SelectItem value="income">Top Incomes</SelectItem>
                  <SelectItem value="expense">Top Expenses</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={() => {
              setIsHidden(false);
            }}
          >
            <FontAwesomeIcon icon={faTableList} />
          </Button>
        </div>
        <div
          className={`transition-all duration-300 ease-out transform ${
            isHidden
              ? "opacity-0 scale-95 max-h-0 overflow-hidden"
              : "opacity-100 scale-100 max-h-[500px]"
          }`}
        >
          <CreateForm setIsHidden={setIsHidden} btnName={"Create"} />
        </div>
        {datas.length === 0 ? (
          <div className="font-bold text-4xl flex justify-center items-center mt-70">
            List Unavailable
          </div>
        ) : (
          (sortValue === "default" ? datas : sortDatas).map((data, index) => (
            <List
              data={data}
              key={index}
              id={data.id}
              activeId={activeId}
              setActiveId={setActiveId}
            />
          ))
        )}
      </div>
      {/* Error box */}
      {error && (
        <ErrorBox setError={setError} error={error} errorText={"Error!"} />
      )}
      <Toaster richColors />
    </>
  );
};

export default Expenses;
