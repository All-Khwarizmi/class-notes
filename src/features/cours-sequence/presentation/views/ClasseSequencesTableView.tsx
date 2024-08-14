"use client";
import { Plus, Delete, Link2, Link as LucideLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { TableCaption, TableHeader } from "@/core/components/ui/table";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/core/components/ui/table";

import { ClasseSequence, Sequence } from "../../domain/entities/cours-schemas";
import useAddClasseSequence from "../../application/adapters/services/useAddClasseSequence";
import { useState } from "react";
import { toast } from "sonner";
import useDeleteSequence from "@/features/complement/application/adapters/services/useDeleteSequence";
import Link from "next/link";
import DeleteTableButton from "@/core/components/common/DeleteTableButton";
import AddTableButton from "@/core/components/common/AddTableButton";
import { useClasseSequencesLogic } from "../hooks/useClasseSequencesLogic";
import { isRight } from "fp-ts/lib/Either";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";

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
                <TableRow key={sequence._id}>
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
                        <>
                          <Link
                            className="cursor-pointer "
                            href={`/sequences/${classeSequence._id}?type=sequence`}
                            legacyBehavior
                          >
                            <LucideLink size={12} />
                          </Link>
                          <DeleteTableButton
                            onClick={() => handleDelete(classeSequence._id)}
                          />
                        </>
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
        {/* <div className="flex justify-center py-4 gap-4">
        <CustomDialog
          title="Add a new sequence"
          description="Add a new sequence to the class"
          buttonClassName="bg-green-500 hover:bg-green-600"
        >
          <Select
            onValueChange={(value) => {
              setSelectedSequence((value) => {
                const name = props.sequences.find(
                  (sequence) => sequence._id === value
                )!._id;

                return name;
              });
            }}
            value={selectedSequence}
          >
            <SelectTrigger>
              <SelectValue>Select a sequence</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {props.sequences.map((sequence) => {
                  const isAlreadyAdded = props.classeSequences.find(
                    (classeSequence) =>
                      classeSequence.originalSequenceId === sequence._id
                  );
                  if (isAlreadyAdded) {
                    return null;
                  }
                  return (
                    <SelectItem key={sequence._id} value={sequence._id}>
                      {sequence.name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div>
            <Button onClick={handleSubmit}>Assign sequence</Button>
          </div>
        </CustomDialog>
      </div> */}
      </>
    );
  }
}

export default ClasseSequencesTableView;
