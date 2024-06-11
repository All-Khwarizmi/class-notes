"use client";
import Link from "next/link";
import { ExternalLink, Plus } from "lucide-react";
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
import { Switch } from "@/core/components/ui/switch";
import VisibilitySwitch from "./VisibilitySwitch";

function ComplementsTable(props: {
  complements: Complement[];
  coursId: string;
}) {
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
            <TableHead className="w-[200px]">Publish Date</TableHead>
            <TableHead className="w-[200px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.complements.map((complement) => {
            return (
              <TableRow key={complement.id}>
                <TableCell className="w-[200px]">{complement.name}</TableCell>
                <TableCell className="w-[200px]">
                  {complement.description}
                </TableCell>
                <TableCell className="w-[200px]">{complement.type}</TableCell>
                <TableCell className="w-[200px]">
                  <VisibilitySwitch
                    userId="userId"
                    type="complement"
                    typeId={complement.id}
                  />
                </TableCell>
                <TableCell className="w-[200px]">
                  {complement.publishDate
                    ? new Date(complement.publishDate).toLocaleDateString()
                    : "Not published"}
                </TableCell>
                <TableCell className="w-[200px]">
                  <Link href={`/complements/${complement.id}`}>
                    <ExternalLink size={12} />
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* Add Competence button */}
      <div className="flex justify-center py-4">
        <Link
          href={`/complements/add/${props.coursId}`}
          className={cn(
            "bg-transparent rounded-md p-1 px-2 flex items-center ml-2 hover:bg-slate-400 border border-slate-400 hover:border-slate-400"
          )}
        >
          <Plus size={12} />
        </Link>
      </div>
    </div>
  );
}

export default ComplementsTable;
