import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import AlertBox from "@/components/alertbox/AlertBox";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "@/hook/useAuthConext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";

const List = ({ data, index }) => {
  const { user } = useAuthContext();
  const [activeId, setActiveId] = useState(null);

  const onActive = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id)); // have to use prev because useState is async
  };

  return (
    <div id={data.id} className="text-xl">
      <div className="flex justify-center">
        <div className="border grid grid-cols-1 p-10 mt-5 w-230 rounded-xl bg-white">
          <div
            className="flex justify-around"
            onClick={() => onActive(data.id)}
          >
            <div className="flex gap-3">
              <div>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <h2>{data.category}</h2>
            </div>
            <div className="font-bold">
              <span
                className={
                  data.transaction_type === "Income"
                    ? "text-[var(--primary-color)]"
                    : "text-red-600"
                }
              >
                {data.cost}
              </span>{" "}
              <span>{user.currency}</span>
            </div>
            <Badge variant="outline" className={"font-bold w-30"}>
              {data.transaction_type}
            </Badge>
            <div>{data.created_at}</div>
          </div>
          {/* I used Ai for animation.Ofc,I am not really good at making animation :> */}
          <div
            className={` text-sm transition-all duration-500 ease-out transform ${
              activeId !== data.id
                ? "opacity-0 scale-95 max-h-0 overflow-hidden "
                : "opacity-100 scale-100 max-h-[500px] mt-5"
            }`}
          >
            <div className="mt-3">{data.note}</div>
            <div className="flex justify-end gap-3">
              <AlertBox
                btn={"Delete"}
                btnClassName={"border border-white bg-red-700 hover:bg-red-900"}
                title={"Are you absolutely sure?"}
                description={"This action cannot be undone."}
                type={"button"}
              />
              <Button type="submit" className={"bg-black text-white"}>
                Edit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
