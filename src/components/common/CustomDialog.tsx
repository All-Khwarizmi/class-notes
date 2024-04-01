import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import AddClassForm from "../../app/classes/AddClassForm";
import { Button } from "../ui/button";

export default function CustomDialog({
  icon,
  title,
  description = "",
  children,
  testId,
}: {
  title: string;
  description?: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  testId?: string;
}) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={"outline"}
            size={"icon"}
            data-testid={testId}
            className="p-0 "
          >
            {icon}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
}
