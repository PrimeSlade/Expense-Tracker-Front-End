import { ActiveContext } from "@/context/ActiveContext";
import React, { useContext, useEffect } from "react";

const SmartSave = () => {
  const { active, setActive } = useContext(ActiveContext);

  useEffect(() => {
    console.log(active);
    setActive("SmartSave");
  }, []);

  return <div>SmartSave</div>;
};

export default SmartSave;
