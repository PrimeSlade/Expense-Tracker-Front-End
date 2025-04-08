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
  const [activeId, setActiveId] = useState(null);
  const { fetch, error } = useFetchData();

  const onActive = (id) => {
    setActiveId(activeId === null ? id : null);
  };

  console.log(activeId);

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
                  <div className="border grid grid-cols-1 p-10 mt-5 w-230 rounded-xl bg-white">
                    <div
                      className="flex justify-around"
                      onClick={() => onActive(d.id)}
                    >
                      <div className="flex gap-3">
                        <div>
                          <FontAwesomeIcon icon={faUser} />
                        </div>
                        <h2>{d.categories}</h2>
                      </div>
                      <div className="font-bold">
                        <span
                          className={
                            d.transaction_type === "Income"
                              ? "text-[var(--primary-color)]"
                              : "text-red-600"
                          }
                        >
                          {d.cost}
                        </span>{" "}
                        <span>{user.currency}</span>
                      </div>
                      <Badge variant="outline" className={"font-bold w-30"}>
                        {d.transaction_type}
                      </Badge>
                      <div>{d.created_at}</div>
                    </div>
                    {/* I used Ai for animation.Ofc,I am not really good at making animation :> */}
                    <div
                      className={` text-md transition-all duration-500 ease-out transform ${
                        activeId !== d.id
                          ? "opacity-0 scale-95 max-h-0 overflow-hidden "
                          : "opacity-100 scale-100 max-h-[500px] mt-5"
                      }`}
                    >
                      <div>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Laborum ipsam repudiandae nihil maxime voluptatem
                        quae blanditiis voluptatibus earum, provident ab hic
                        quod, saepe quisquam eligendi! Esse exercitationem ab
                        nisi molestiae.
                      </div>
                    </div>
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
