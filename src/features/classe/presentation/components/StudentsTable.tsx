"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/components/ui/table";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import CustomDialog from "@/core/components/common/CustomDialog";
import AddStudentForm from "./AddStudentForm";
import { useMemo } from "react";
import { Id } from "../../../../../convex/_generated/dataModel";

export default function StudentsTable({ classId }: { classId: string }) {
  //! TODO: refactor this to use the new api hook
  const students = useQuery(api.students.getStudents, { classId });
  const isStudents = useMemo(
    () => (students?.length ? true : false),
    [students]
  );

  return (
    <section className="flex flex-col  h-full pb-4">
      <Table>
        <TableCaption>Élèves</TableCaption>
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
      <div className=" flex justify-center pt-2">
        <CustomDialog
          buttonClassName={
            "flex items-center justify-center bg-transparent border border-gray-300 text-gray-300 hover:bg-gray-300 hover:text-white dark:hover:bg-gray-700 dark:text-gray-50 dark:border-gray-700"
          }
          title="Ajouter un étudiant"
        >
          <AddStudentForm classId={classId as Id<"Classes">} />
        </CustomDialog>
      </div>
    </section>
  );
}
