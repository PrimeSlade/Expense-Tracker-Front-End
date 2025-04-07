import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableList } from "@fortawesome/free-solid-svg-icons";
import CreateForm from "@/components/expense/CreateForm";

const Expenses = () => {
  const [isHidden, setIsHidden] = useState(true);

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
