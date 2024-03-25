import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "convex/react";
import Image from "next/image";
import { api } from "../../../convex/_generated/api";
import CustomDialog from "../../components/CustomDialog";
import { useRouter } from "next/navigation";
import AddClassForm from "./AddClassForm";
import AddIcon from "../../components/icons/AddIcon";

export default function ClassesTable() {
  const classes = useQuery(api.classes.getClasses);
  const router = useRouter();

  return (
    <section className="mt-12 px-4">
      <Table>
        <TableCaption>Ajouter classe</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Image</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classes?.map((c) => (
            <TableRow
              onClick={() => {
                router.push(`/class/${c._id}`);
              }}
              key={c._id}
            >
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.description}</TableCell>
              <TableCell>
                <Image
                  className="img-class "
                  src={
                    c.imageUrl || "/images/mos-design-Io433E805vo-unsplash.jpg"
                  }
                  alt={`
                  Image de la classe: ${c.name}`}
                  width={32}
                  height={32}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center pt-4">
        {" "}
        <CustomDialog
          icon={<AddIcon />}
          title="Ajouter une classe"
          description="Ajouter une classe pour commencer à ajouter des étudiants"
          testId="add-class"
        >
          <AddClassForm />
        </CustomDialog>
      </div>
    </section>
  );
}
