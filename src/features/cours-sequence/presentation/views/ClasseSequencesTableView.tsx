"use client";
import Link from "next/link";
import { Plus, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { TableCaption, TableHeader } from "@/core/components/ui/table";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/core/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import { Sequence } from "../../domain/entities/cours-schemas";
import useAddClasseSequence from "../../application/adapters/services/useAddClasseSequence";
import CustomDialog from "@/core/components/common/CustomDialog";
import { useState } from "react";
import { toast } from "sonner";
function ClasseSequencesTableView(props: {
  sequences: Sequence[];
  classeId: string;
}) {
  const { setClasseSequenceOptions } = useAddClasseSequence();
  const [selectedSequence, setSelectedSequence] = useState<string>("");
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
                    <Link href={`/sequences/${sequence._id}`}>
                      <Link2 size={16} />
                    </Link>
                    <button
                      onClick={() => {
                        setClasseSequenceOptions({
                          classeId: props.classeId,
                          sequenceId: sequence._id,
                        });
                      }}
                      className={cn(
                        "bg-transparent rounded-md p-1 px-2 flex items-center ml-2 hover:bg-slate-400 border border-slate-400 hover:border-slate-400"
                      )}
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex justify-center py-4 gap-4">
        <CustomDialog
          title="Add a new sequence"
          description="Add a new sequence to the class"
        >
          <Select>
            <SelectTrigger>
              <SelectValue>Select a sequence</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {props.sequences.map((sequence) => (
                  <SelectItem key={sequence._id} value={sequence._id}>
                    {sequence.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <button
            onClick={handleSubmit}
            className={cn(
              "bg-transparent rounded-md p-1 px-2 flex items-center ml-2 hover:bg-slate-400 border border-slate-400 hover:border-slate-400"
            )}
          >
            <Plus size={12} />
          </button>
        </CustomDialog>
      </div>
    </>
  );
}

export default ClasseSequencesTableView;
