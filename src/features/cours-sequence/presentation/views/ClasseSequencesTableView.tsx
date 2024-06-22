"use client";
import { Plus, Delete } from "lucide-react";
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


function ClasseSequencesTableView(props: {
  sequences: Sequence[];
  classeSequences: ClasseSequence[];
  classeId: string;
}) {
  const { setClasseSequenceOptions } = useAddClasseSequence();
  const [selectedSequence, setSelectedSequence] = useState<string>("");
  const { mutate: deleteSequence } = useDeleteSequence();
  const handleDelete = async (sequenceId: string) => {
    await deleteSequence({
      sequenceId,
      type: "sequence",
    });
  };
  function handleSubmit() {
    if (!selectedSequence) {
      toast.error("Please select a sequence");
      return;
    }
    setClasseSequenceOptions({
      classeId: props.classeId,
      sequenceId: selectedSequence,
    });
  }
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
            <TableHead className="w-[200px]">Description</TableHead>
            <TableHead className="w-[200px]">Nbr of Cours</TableHead>
            <TableHead className="w-[200px]"> Last Modified </TableHead>

            <TableHead className="w-[200px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.sequences.map((sequence) => {
            return (
              <TableRow key={sequence._id}>
                <TableCell className="w-[200px]">{sequence.name}</TableCell>
                <TableCell className="w-[200px]">
                  {sequence.description}
                </TableCell>
                <TableCell className="w-[200px]">
                  {sequence.coursIds.length}
                </TableCell>
                <TableCell className="w-[200px]">
                  {sequence.createdAt}
                </TableCell>
                <TableCell className="w-[200px]">
                  <div className={cn("flex items-center gap-4")}>
                    {/* <Link href={`/sequences/${sequence._id}?type=sequence`}>
                      <ExternalLink size={16} />
                    </Link> */}
                    {props.classeSequences.find(
                      (classeSequence) =>
                        classeSequence.originalSequenceId === sequence._id
                    ) ? (
                      <button
                        onClick={() => handleDelete(sequence._id)}
                        className={cn(
                          "bg-red-500 rounded-md p-1 px-2 flex items-center ml-2 hover:bg-red-600"
                        )}
                      >
                        <Delete size={12} />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setClasseSequenceOptions({
                            classeId: props.classeId,
                            sequenceId: sequence._id,
                          });
                        }}
                        className={cn(
                          "bg-green-500 rounded-md p-1 px-2 flex items-center ml-2 hover:bg-green-600"
                        )}
                      >
                        <Plus size={12} />
                      </button>
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

export default ClasseSequencesTableView;
