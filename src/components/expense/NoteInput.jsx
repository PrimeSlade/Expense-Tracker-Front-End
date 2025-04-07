import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const NoteInput = ({ register }) => {
  return (
    <div className="col-span-2">
      <div className="font-bold text-white text-xl mb-4">Note</div>
      <Textarea
        placeholder="Type your message here.(Optional)"
        className={"bg-white"}
        {...register("note")}
      />
    </div>
  );
};

export default NoteInput;
