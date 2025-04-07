import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableList } from "@fortawesome/free-solid-svg-icons";
import CreateForm from "@/components/expense/CreateForm";
import { useFetchData } from "@/hook/useFetchData";

const Expenses = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [datas, setDatas] = useState();
  console.log(datas);

  const { fetch, error } = useFetchData();

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
        {!isHidden && <CreateForm setIsHidden={setIsHidden} />}
      </div>
    </>
  );
};

export default Expenses;
