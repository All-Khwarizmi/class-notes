"use client";
import { cn } from "@/lib/utils";
import { TableCaption, TableHeader } from "@/core/components/ui/table";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/core/components/ui/table";
import DeleteTableButton from "@/core/components/common/DeleteTableButton";
import AddTableButton from "@/core/components/common/AddTableButton";
import { useClasseSequencesLogic } from "../hooks/useClasseSequencesLogic";
import { isRight } from "fp-ts/lib/Either";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import { useRouter } from "next/navigation";

function ClasseSequencesTableView(props: { classeId: string; userId: string }) {
  const {
    loading,
    handleDelete,
    addClasseSequence,
    baseSequences: sequences,
    classeSequences,
  } = useClasseSequencesLogic({
    classeId: props.classeId,
    userId: props.userId,
  });
  const router = useRouter();
  if (loading) {
    return <LoadingSkeleton />;
  }
  if (
    sequences &&
    isRight(sequences) &&
    classeSequences &&
    isRight(classeSequences)
  ) {
    return (
      <>
        <Table className="w-full">
          <TableCaption>
            Add a note or a folder to the profile, or click on the note to view
            it.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead className="w-[200px]">Nbr of Cours</TableHead>
              <TableHead className="w-[200px]"> Last Modified </TableHead>

              <TableHead className="w-[200px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sequences.right.map((sequence) => {
              const classeSequence = classeSequences.right.find(
                (classeSequence) =>
                  classeSequence.originalSequenceId === sequence._id
              );
              return (
                <TableRow
                  key={sequence._id}
                  className="cursor-pointer"
                  onClick={() => {
                    if (classeSequence) {
                      router.push(
                        `/sequences/${classeSequence._id}?type=sequence`
                      );
                    }
                  }}
                >
                  <TableCell className="w-[200px]">{sequence.name}</TableCell>

                  <TableCell className="w-[200px]">
                    {sequence.coursIds.length}
                  </TableCell>
                  <TableCell className="w-[200px]">
                    {new Date(sequence.createdAt).toDateString()}
                  </TableCell>
                  <TableCell className="w-[200px]">
                    <div className={cn("flex items-center gap-4")}>
                      {classeSequence ? (
                        <DeleteTableButton
                          onClick={() => handleDelete(classeSequence._id)}
                        />
                      ) : (
                        <AddTableButton
                          onClick={() => {
                            addClasseSequence({
                              classeId: props.classeId,
                              sequenceId: sequence._id,
                              userId: props.userId,
                            });
                          }}
                        />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </>
    );
  }
}

export default ClasseSequencesTableView;
