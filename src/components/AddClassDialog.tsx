import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import AddClassForm from "./AddClassForm";
export default function AddClassDialog() {
  return (
    <>
      <Dialog>
        <DialogTrigger>+</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une classe</DialogTitle>
            <DialogDescription>
              Remplissez les champs ci-dessous pour ajouter une classe
            </DialogDescription>
          </DialogHeader>
          <AddClassForm />
        </DialogContent>
      </Dialog>
    </>
  );
}
