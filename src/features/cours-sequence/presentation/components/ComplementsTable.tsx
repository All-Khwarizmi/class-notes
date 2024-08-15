"use client";
import Link from "next/link";
import { Delete, ExternalLink, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Complement } from "@/features/complement/domain/complement-schemas";
import { TableCaption, TableHeader } from "@/core/components/ui/table";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/core/components/ui/table";
import useDeleteComplement from "@/features/complement/application/adapters/services/useDeleteComplement";
import { Button } from "@/core/components/ui/button";
import { useRouter } from "next/navigation";
import DeleteTableButton from "@/core/components/common/DeleteTableButton";

function ComplementsTable(props: {
  complements: Complement[];
  coursId: string;
  userId: string;
}) {
  const router = useRouter();
  const { mutate: deleteComplement, isPending: isDeleting } =
    useDeleteComplement();
  return (
    <div className="w-full h-full py-4">
      <Table className="w-full">
        <TableCaption>Add resources to your course</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>

            <TableHead className="w-[200px]">Description</TableHead>

            <TableHead className="w-[200px]">Type</TableHead>
            <TableHead className="w-[200px]"> Publish </TableHead>
            <TableHead className="w-[200px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.complements.map((complement) => {
            return (
              <TableRow
                key={complement.id}
                className="cursor-pointer"
                onClick={() => {
                  router.push(`/complements/${complement.id}`);
                }}
              >
                <TableCell className="w-[200px]">{complement.name}</TableCell>
                <TableCell className="w-[200px]">
                  {complement.description}
                </TableCell>
                <TableCell className="w-[200px]">{complement.type}</TableCell>

                <TableCell className="w-[200px] ">
                  <div className="flex items-center w-full h-full">
                    {" "}
                    <DeleteTableButton
                      onClick={() => {
                        confirm(
                          "Are you sure you want to delete this complement?"
                        ) &&
                          deleteComplement({
                            id: complement.id,
                          });
                      }}
                    ></DeleteTableButton>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* Add Competence button */}
      <div className="flex justify-center py-4">
        <Link href={`/complements/add/${props.coursId}`}>
          <Button>
            <Plus size={16} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ComplementsTable;
