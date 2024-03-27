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
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import CustomDialog from "@/components/CustomDialog";
import AddStudentForm from "./AddStudentForm";
import AddIcon from "@/components/icons/AddIcon";
import { memo, useMemo } from "react";

export default function StudentsTable({ classId }: { classId: string }) {
  const students = useQuery(api.students.getStudents, { classId });
  const isStudents = useMemo(
    () => (students?.length ? true : false),
    [students]
  );

  return (
    <section className=" px-4">
      <Table>
        <TableCaption>Ajouter un étudiant</TableCaption>
        {isStudents && (
          <>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students?.map((s) => (
                <TableRow key={s._id} className="cursor-pointer">
                  <TableCell>{s.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </>
        )}
      </Table>
      <div className=" flex justify-center pt-4">
        <CustomDialog icon={<AddIcon />} title="Ajouter un étudiant">
          <AddStudentForm classId={classId as Id<"Classes">} />
        </CustomDialog>
      </div>
    </section>
  );
}
