import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const NoteInput = () => {
  const [input, setInput] = useState();

  return (
    <div className="col-span-2">
      <div className="font-bold text-white text-xl mb-4">Note</div>
      <Textarea
        placeholder="Type your message here."
        className={"bg-white"}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
    </div>
  );
};

export default NoteInput;
