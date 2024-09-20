import React from "react";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/core/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/core/components/ui/tooltip";

interface DeleteTableButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tooltipContent?: string;
}

const DeleteTableButton: React.FC<DeleteTableButtonProps> = ({
  className,
  tooltipContent = "Supprimer",
  ...props
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="destructive"
            size="icon"
            className={cn("h-8 w-8", className)}
            {...props}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Supprimer</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DeleteTableButton;
