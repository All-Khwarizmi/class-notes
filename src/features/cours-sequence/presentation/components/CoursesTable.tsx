"use client";
import Link from "next/link";
import {  Plus } from "lucide-react";
import { TableCaption, TableHeader } from "@/core/components/ui/table";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/core/components/ui/table";
import { Cours } from "../../domain/entities/cours-schemas";
import useDeleteCourse from "../../application/adapters/services/useDeleteCourse";
import { Button } from "@/core/components/ui/button";
import DeleteTableButton from "@/core/components/common/DeleteTableButton";
import { useRouter } from "next/navigation";

function CoursesTable(props: {
  courses: Cours[];
  userId: string;
  sequenceId: string;
}) {
  const router = useRouter();
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

            <TableHead className="w-[200px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.courses.map((course) => {
            return (
              <TableRow
               className="cursor-pointer"
                key={course._id}
                onClick={() => {
                  router.push(`/cours/${course._id}`);
                }}
              >
                <TableCell className="w-[200px]">{course.name}</TableCell>
                <TableCell className="w-[200px]">
                  {course.description}
                </TableCell>
                

                <TableCell className="w-[200px] ">
                  <div className="flex items-center  w-full h-full">
                    {" "}
                   
                    <DeleteTableButton
                      onClick={() => {
                        confirm(
                          "Are you sure you want to delete this complement?"
                        ) &&
                          deleteCourse({
                            coursId: course._id,
                          });
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <div className="flex  justify-center w-full mt-4">
        <Link href={`/cours/add/${props.sequenceId}`}>
          <Button>
            <Plus size={16} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default CoursesTable;
