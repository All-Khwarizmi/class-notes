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
export default function ClassesTable() {
  const classes = useQuery(api.classes.getClasses);

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
            <TableRow key={c._id}>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.description}</TableCell>
              <TableCell>
                <Image
                  className="img-class "
                  src="/images/fredrik-ohlander-s9NttXGehL4-unsplash.jpg"
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
