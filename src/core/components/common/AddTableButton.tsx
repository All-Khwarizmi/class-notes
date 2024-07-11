import { cn } from "@/lib/utils";
import {  Plus } from "lucide-react";
import React from "react";
interface Props extends React.HTMLAttributes<HTMLButtonElement> {}
const AddTableButton: React.FC<Props> = (props) => {
  return (
    <button
      {...props}
      className={cn(
        "bg-green-500 rounded-md p-1 px-2 flex text-white items-center ml-2 hover:bg-green-600"
      )}
    >
      <Plus size={14} />
    </button>
  );
};

export default AddTableButton;
