"use client";
import Link from "next/link";
import { ExternalLink, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { TableCaption, TableHeader } from "@/core/components/ui/table";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/core/components/ui/table";
import { Switch } from "@/core/components/ui/switch";
function NotesTableView() {
  return (
    <>
      {/* Add a table to display notes */}
      <div className="w-full h-full py-4">
        <Table className="w-full">
          <TableCaption>Add resources to your course</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead className="w-[200px]">Description</TableHead>
              <TableHead className="w-[200px]">Type</TableHead>
              <TableHead className="w-[200px]"> Last Modified </TableHead>

              <TableHead className="w-[200px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Add a row to display a note */}
            <TableRow>
              <TableCell className="w-[200px]">Note name</TableCell>
              <TableCell className="w-[200px]">Note description</TableCell>
              <TableCell className="w-[200px]">Note type</TableCell>
              <TableCell className="w-[200px]">
                <Switch checked={true} />
              </TableCell>
              <TableCell className="w-[200px]">
                <p>Last modified date</p>
              </TableCell>
              <TableCell className="w-[200px]">
                <Link href={`/complements/noteId`}>
                  <ExternalLink size={12} />
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default NotesTableView;
