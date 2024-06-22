"use client";
import Link from "next/link";
import { Delete, ExternalLink, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { TableCaption, TableHeader } from "@/core/components/ui/table";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/core/components/ui/table";
import VisibilitySwitch from "./VisibilitySwitch";
import { Cours } from "../../domain/entities/cours-schemas";
import useDeleteCourse from "../../application/adapters/services/useDeleteCourse";
import { Button } from "@/core/components/ui/button";

function CoursesTable(props: {
  courses: Cours[];
  userId: string;
  sequenceId: string;
}) {
  const { mutate: deleteCourse } = useDeleteCourse();
  return (
    <div className="w-full h-full py-4">
      <Table className="w-full">
        <TableCaption>Add courses to your sequence</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>

            <TableHead className="w-[200px]">Description</TableHead>
            <TableHead className="w-[200px]"> Publish </TableHead>
            <TableHead className="w-[200px]">Publish Date</TableHead>
            <TableHead className="w-[200px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.courses.map((course) => {
            return (
              <TableRow key={course._id}>
                <TableCell className="w-[200px]">{course.name}</TableCell>
                <TableCell className="w-[200px]">
                  {course.description}
                </TableCell>
                <TableCell className="w-[200px]">
                  <VisibilitySwitch
                    userId={props.userId}
                    type="cours"
                    typeId={course._id}
                  />
                </TableCell>
                <TableCell className="w-[200px]">
                  {course.createdAt
                    ? new Date(course.createdAt).toDateString()
                    : "Not published"}
                </TableCell>
                <TableCell className="w-[200px] ">
                  <div className="flex items-center justify-center w-full h-full">
                    {" "}
                    <Link
                      className={cn(
                        "bg-transparent rounded-md p-1 px-2 flex items-center ml-2 hover:text-blue-400  "
                      )}
                      href={`/cours/${course._id}`}
                    >
                      <ExternalLink size={12} />
                    </Link>
                    <button
                      className={cn(
                        "bg-transparent rounded-md p-1 px-2 flex items-center ml-2 hover:text-red-400  "
                      )}
                      onClick={() => {
                        confirm(
                          "Are you sure you want to delete this complement?"
                        ) &&
                          deleteCourse({
                            coursId: course._id,
                          });
                      }}
                    >
                      <Delete size={14} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Link href={`/cours/add/${props.sequenceId}`}>
        <Button variant={"outline"}>
          <Plus size={16} />
        </Button>
      </Link>
    </div>
  );
}

export default CoursesTable;
