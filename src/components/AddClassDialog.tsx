import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

export default function AddClassDialog() {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button className="btn btn-primary">+</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une classe</DialogTitle>
            <DialogDescription>
              Remplissez les champs ci-dessous pour ajouter une classe
            </DialogDescription>
          </DialogHeader>
          <form>
            <label htmlFor="name">Nom</label>
            <input type="text" id="name" />
            <label htmlFor="description">Description</label>
            <textarea id="description" />
            <label htmlFor="imageUrl">URL de l'image</label>
            <input type="text" id="imageUrl" />
            <button type="submit" className="btn btn-primary">
              Ajouter
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
