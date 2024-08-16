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
import useDeleteSequence from "@/features/complement/application/adapters/services/useDeleteSequence";
import { Sequence } from "../../domain/entities/cours-schemas";
import { TypographyH1 } from "@/core/components/common/Typography";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const { mutate: deleteSequence } = useDeleteSequence();
  return (
    <div className="w-full h-full py-8 px-4">
      <header className="pb-8">
        <TypographyH1 text="Sequences" />
      </header>
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
            <TableHead className="w-[200px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sequences.map((sequence) => {
            return (
              <TableRow
                className="cursor-pointer"
                key={sequence._id}
                onClick={() => {
                  router.push(
                    `/sequences/${sequence._id}?type=${sequenceType}`
                  );
                }}
              >
                <TableCell className="w-[200px]">{sequence.name}</TableCell>
                <TableCell className="w-[200px]">
                  {sequence.description}
                </TableCell>

                <TableCell className="w-[200px] ">
                  <Delete
                    className="cursor-pointer text-red-500"
                    onClick={() =>
                      deleteSequence({
                        sequenceId: sequence._id,
                        type: sequenceType,
                        userId,
                      })
                    }
                  />
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
        <div className="flex  justify-center w-full mt-8">
          <Link href={`/sequences/add`}>
            <Button>
              <Plus size={16} />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default SequencesListView;
