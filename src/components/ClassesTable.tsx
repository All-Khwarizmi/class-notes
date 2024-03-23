import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";
import AddClassDialog from "./AddClassDialog";
import { useRouter } from "next/navigation";

export default function ClassesTable() {
  const classes = useQuery(api.classes.getClasses);
  const router = useRouter();

  return (
    <section className="mt-12 px-4">
      <Table>
        <TableCaption>Voici vos classes</TableCaption>
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
                  src={c.imageUrl}
                  alt=""
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
        <AddClassDialog />
      </div>
    </section>
  );
}
