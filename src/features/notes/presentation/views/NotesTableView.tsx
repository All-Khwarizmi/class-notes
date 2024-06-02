"use client";
import Link from "next/link";
import { ExternalLink, Folder, Plus, File } from "lucide-react";
import { cn } from "@/lib/utils";
import { TableCaption, TableHeader } from "@/core/components/ui/table";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/core/components/ui/table";
import { Note } from "../../domain/notes-schemas";
import { useMemo, useState } from "react";
import { Input } from "@/core/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
function NotesTableView(props: { notes: Note[]; parentId: string }) {
  const [localNotes, setLocalNotes] = useState<Note[]>(props.notes);
  const [isFileFormVisible, setIsFileFormVisible] = useState(false);
  const [isFolderFormVisible, setIsFolderFormVisible] = useState(false);

  function handleSubmit(note: Omit<Note, "id" | "createdBy">) {
    console.log("Note", note);
  }

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
            {localNotes.map((note) => {
              return (
                <TableRow key={note.id}>
                  <TableCell className="w-[200px]">{note.name}</TableCell>
                  <TableCell className="w-[200px]">
                    {note.description}
                  </TableCell>
                  <TableCell className="w-[200px]">
                    {note.type === "Folder" ? (
                      <Folder size={12} />
                    ) : (
                      <File size={12} />
                    )}
                  </TableCell>
                  <TableCell className="w-[200px]">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="w-[200px]">
                    <Link href={`/notes/${note.id}`}>
                      <ExternalLink size={12} />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
            {isFileFormVisible && (
              <NoteItemFormRow handleSubmit={handleSubmit} />
            )}
            {isFolderFormVisible && (
              <NoteFolderFormRow handleSubmit={handleSubmit} />
            )}
          </TableBody>
        </Table>
        <div className="flex justify-center py-4 gap-4">
          <button
            onClick={() => {
              setIsFolderFormVisible(true);
            }}
            className={cn(
              "bg-transparent rounded-md p-1 px-2 flex items-center ml-2 hover:bg-slate-400 border border-slate-400 hover:border-slate-400"
            )}
          >
            <Folder size={12} />
          </button>
          <button
            onClick={() => {
              setIsFileFormVisible(true);
            }}
            className={cn(
              "bg-transparent rounded-md p-1 px-2 flex items-center ml-2 hover:bg-slate-400 border border-slate-400 hover:border-slate-400"
            )}
          >
            <File size={12} />
          </button>
        </div>
      </div>
    </>
  );
}

export default NotesTableView;

function NoteItemFormRow(props: {
  handleSubmit: (note: Omit<Note, "id" | "createdBy">) => void;
}) {
  const [localNotes, setLocalNotes] = useState<Omit<Note, "id" | "createdBy">>({
    name: "",
    description: "",
    type: "Item",
    parentId: "1",
    createdAt: Date.now(),
    content: "",
    contentType: "Markup",
    fullPath: "",
    pathDictionary: [],
    folders: [],
    keywords: [],
  });
  function onChangeNoteName(event: React.ChangeEvent<HTMLInputElement>) {
    setLocalNotes({ ...localNotes, name: event.target.value });
  }

  function onChangeNoteDescription(event: React.ChangeEvent<HTMLInputElement>) {
    setLocalNotes({ ...localNotes, description: event.target.value });
  }

  function onChangeNoteType(value: string) {
    if (value !== "Diagram" && value !== "Flowchart" && value !== "Markup") {
      console.log("Invalid content type", value);
      return;
    }
    setLocalNotes({ ...localNotes, contentType: value });
  }

  return (
    <TableRow>
      <TableCell>
        <Input
          value={localNotes.name}
          onChange={onChangeNoteName}
          type="text"
          placeholder="Name"
          className="border border-slate-400 rounded-md p-1"
        />
      </TableCell>
      <TableCell>
        <Input
          value={localNotes.description}
          onChange={onChangeNoteDescription}
          type="text"
          placeholder="Description"
          className="border border-slate-400 rounded-md p-1"
        />
      </TableCell>
      <TableCell>
        <Select
          onValueChange={onChangeNoteType}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a type" defaultValue={localNotes.type} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Diagram">Diagram</SelectItem>
              <SelectItem value="Flowchart">Flowchart</SelectItem>
              <SelectItem value="Markup">Markup</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </TableCell>

      <TableCell>
        <button
          onClick={() => props.handleSubmit(localNotes)}
          className={cn(
            "bg-transparent rounded-md p-1 px-2 flex items-center ml-2 hover:bg-slate-400 border border-slate-400 hover:border-slate-400"
          )}
        >
          <Plus size={12} />
        </button>
      </TableCell>
    </TableRow>
  );
}

function NoteFolderFormRow(props: {
  handleSubmit: (note: Omit<Note, "id" | "createdBy">) => void;
}) {
  const [localNotes, setLocalNotes] = useState<Omit<Note, "id" | "createdBy">>({
    name: "",
    description: "",
    type: "Folder",
    parentId: "1",
    createdAt: Date.now(),
    content: "",
    contentType: "Markup",
    fullPath: "",
    pathDictionary: [],
    folders: [],
    keywords: [],
  });

  function onChangeNoteName(event: React.ChangeEvent<HTMLInputElement>) {
    setLocalNotes({ ...localNotes, name: event.target.value });
  }

  function onChangeNoteDescription(event: React.ChangeEvent<HTMLInputElement>) {
    setLocalNotes({ ...localNotes, description: event.target.value });
  }

  return (
    <TableRow>
      <TableCell>
        <Input
          value={localNotes.name}
          onChange={onChangeNoteName}
          type="text"
          placeholder="Name"
          className="border border-slate-400 rounded-md p-1"
        />
      </TableCell>
      <TableCell>
        <Input
          value={localNotes.description}
          onChange={onChangeNoteDescription}
          type="text"
          placeholder="Description"
          className="border border-slate-400 rounded-md p-1"
        />
      </TableCell>

      <TableCell>
        <button
          onClick={() => props.handleSubmit(localNotes)}
          className={cn(
            "bg-transparent rounded-md p-1 px-2 flex items-center ml-2 hover:bg-slate-400 border border-slate-400 hover:border-slate-400"
          )}
        >
          <Plus size={12} />
        </button>
      </TableCell>
    </TableRow>
  );
}
