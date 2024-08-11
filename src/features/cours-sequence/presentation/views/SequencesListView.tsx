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
import { Button } from "@/core/components/ui/button";
import VisibilitySwitch from "../components/VisibilitySwitch";
import useDeleteSequence from "@/features/complement/application/adapters/services/useDeleteSequence";
import { Sequence } from "../../domain/entities/cours-schemas";
function SequencesListView({
  sequences,
  spacesMode = false,
  userId,
  sequenceType,
  sequenceId,
}: {
  sequences: Sequence[];
  spacesMode?: boolean;
  userId: string;
  sequenceType: "template" | "sequence";
  sequenceId?: string;
}) {
  const { mutate: deleteSequence } = useDeleteSequence();
  return (
    <div className="w-full h-full py-4">
      <Table className="w-full">
        <TableCaption>
          {sequenceType === "sequence"
            ? "Add a sequence to your classe"
            : "Add  a sequence"}
        </TableCaption>
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
          {sequences.map((sequence) => {
            return (
              <TableRow key={sequence._id}>
                <TableCell className="w-[200px]">{sequence.name}</TableCell>
                <TableCell className="w-[200px]">
                  {sequence.description}
                </TableCell>
                <TableCell className="w-[200px]">
                  <VisibilitySwitch
                    userId={userId}
                    type="sequence"
                    typeId={sequence._id}
                  />
                </TableCell>
                <TableCell className="w-[200px]">
                  {sequence.createdAt
                    ? new Date(sequence.createdAt).toDateString()
                    : "Not published"}
                </TableCell>
                <TableCell className="w-[200px] ">
                  <div className="flex items-center justify-center w-full h-full">
                    <Link
                      href={`/sequences/${sequence._id}?type=${sequenceType}`}
                      className={cn(
                        "bg-transparent rounded-md p-1 px-2 flex items-center ml-2 hover:text-blue-400  "
                      )}
                    >
                      <ExternalLink size={16} />
                    </Link>
                    <button
                      onClick={() =>
                        deleteSequence({
                          sequenceId: sequence._id,
                          type: sequenceType,
                        })
                      }
                      className={cn(
                        "bg-transparent rounded-md p-1 px-2 flex items-center ml-2 hover:text-red-400  "
                      )}
                    >
                      <Delete size={16} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {sequenceType === "sequence" ? (
        <div className="flex  justify-center w-full mt-4">
          <Link href={`/classes/sequences/${sequenceId}`}>
            <Button variant={"outline"}>
              <Plus size={16} />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex  justify-center w-full mt-4">
          <Link href={`/sequences/add`}>
            <Button variant={"outline"}>
              <Plus size={16} />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default SequencesListView;
