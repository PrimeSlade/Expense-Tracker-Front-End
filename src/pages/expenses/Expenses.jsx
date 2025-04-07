import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableList } from "@fortawesome/free-solid-svg-icons";
import CreateForm from "@/components/expense/CreateForm";
import { useFetchData } from "@/hook/useFetchData";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "@/hook/useAuthConext";
import { Badge } from "@/components/ui/badge";

const Expenses = () => {
  const { user } = useAuthContext();
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
        {!datas ? (
          <div className="font-bold text-4xl flex justify-center items-center mt-70">
            List Unavailable
          </div>
        ) : (
          datas.map((d, i) => {
            return (
              <div id={d.id} key={i} className="text-xl">
                <div className="flex justify-center">
                  <div className="border flex justify-around p-10 mt-5 w-230 rounded-xl bg-white">
                    <div className="flex gap-3">
                      <div>
                        <FontAwesomeIcon icon={faUser} />
                      </div>
                      <h2>{d.categories}</h2>
                    </div>
                    <div>
                      {d.cost} {user.currency}
                    </div>
                    <Badge variant="outline" className={"font-bold w-30"}>
                      {d.transaction_type}
                    </Badge>
                    <div>{d.created_at}</div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Expenses;
