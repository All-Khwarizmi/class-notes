"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/components/ui/table";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import CustomDialog from "@/core/components/common/CustomDialog";
import AddStudentForm from "./AddStudentForm";
import AddIcon from "@/core/components/icons/AddIcon";
import { useMemo } from "react";

export default function StudentsTable({ classId }: { classId: string }) {
  //! TODO: refactor this to use the new api hook
  const students = useQuery(api.students.getStudents, { classId });
  const isStudents = useMemo(
    () => (students?.length ? true : false),
    [students]
  );

  return (
    <section className="flex flex-col justify-between h-full px-4 py-4">
      <Table>
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
      <div className=" flex justify-between ">
        <footer className="flex h-full items-center">
          <h1 className="font-bold text-sm py-1 px-4 dark:bg-gray-600 rounded ">
            {students?.length} élèves
          </h1>
        </footer>
        <CustomDialog icon={<AddIcon />} title="Ajouter un étudiant">
          <AddStudentForm classId={classId as Id<"Classes">} />
        </CustomDialog>
      </div>
    </section>
  );
}
