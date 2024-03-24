"use client";

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
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import CustomDialog from "@/components/CustomDialog";
import AddStudentForm from "./AddStudentForm";
import AddIcon from "@/components/icons/AddIcon";

export default function StudentsTable({ classId }: { classId: string }) {
  const students = useQuery(api.students.getStudents, { classId });

  return (
    <section className="mt-4 px-4">
      <Table>
        <TableCaption>
          {students?.length
            ? "Liste des étudiants"
            : "Pas d'étudiants inscrits"}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students?.map((s) => (
            <TableRow key={s._id}>
              <TableCell>{s.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className=" flex justify-center pt-8">
        <CustomDialog icon={<AddIcon />} title="Ajouter un étudiant">
          <AddStudentForm classId={classId as Id<"Classes">} />
        </CustomDialog>
      </div>
    </section>
  );
}
