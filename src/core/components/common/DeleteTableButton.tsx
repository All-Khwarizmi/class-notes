import { cn } from "@/lib/utils";
import { Delete } from "lucide-react";
import React from "react";
interface Props extends React.HTMLAttributes<HTMLButtonElement> {}
const DeleteTableButton: React.FC<Props> = (props) => {
  return (
    <button
      {...props}
      className={cn(
        "bg-red-500 rounded-md p-1 px-2 flex items-center text-white hover:bg-red-600"
      )}
    >
      <Delete size={14} />
    </button>
  );
};

export default DeleteTableButton;
