import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/components/ui/table";

import { Category, Competence } from "../../domain/entities/schemas";
import { Button } from "@/core/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function CompetencesTable({
  competences,
  categories,
  userId,
}: {
  competences: Competence[];
  categories: Category[];
  userId: string;
}) {
  return (
    <>
      <Table>
        <TableCaption>Competences</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>

            <TableHead>Competence</TableHead>

            <TableHead>Description</TableHead>

            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {competences.map((competence) => {
            return (
              <TableRow key={competence._id}>
                <TableCell>{competence.category}</TableCell>
                <TableCell>{competence.name}</TableCell>
                <TableCell>{competence.description}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* Add Competence button */}
      <div className="flex justify-center py-4">
        <Link  href={"/competences/add"}>
          <Button >
            <Plus size={20} />
          </Button>
        </Link>
      </div>
    </>
  );
}
