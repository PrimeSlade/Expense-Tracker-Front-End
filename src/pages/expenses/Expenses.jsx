import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableList } from "@fortawesome/free-solid-svg-icons";
import CreateForm from "@/components/expense/CreateForm";
import { useFetchData } from "@/hook/useFetchData";
import List from "@/components/expense/List";

const Expenses = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [datas, setDatas] = useState();
  const { fetch, error } = useFetchData();
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetch();
      setDatas(data);
    };

    getData();
  }, []);

  return (
    <>
      <div>
        <div className="flex justify-end mt-5 mr-5">
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
          <CreateForm setIsHidden={setIsHidden} />
        </div>
        {!datas ? (
          <div className="font-bold text-4xl flex justify-center items-center mt-70">
            List Unavailable
          </div>
        ) : (
          datas.map((data, index) => {
            return (
              <List
                data={data}
                key={index}
                id={data.id}
                activeId={activeId}
                setActiveId={setActiveId}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default Expenses;
