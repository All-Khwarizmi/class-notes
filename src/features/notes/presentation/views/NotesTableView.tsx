'use client';

import DeleteTableButton from '@/core/components/common/DeleteTableButton';
import { Button } from '@/core/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import { Input } from '@/core/components/ui/input';
import { ScrollArea } from '@/core/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/core/components/ui/table';
import { cn } from '@/lib/utils';
import { Plus, X, Check, Search, File } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

import useAddNote from '../../application/adapters/services/useAddProfileNote';
import useDeleteNote from '../../application/adapters/services/useDeleteNote';
import { Note } from '../../domain/notes-schemas';

function NotesTableView({
  notes,
  parentId,
}: {
  notes: Note[];
  parentId: string;
}) {
  const [localNotes, setLocalNotes] = useState<Note[]>(notes);
  const [isFileFormVisible, setIsFileFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { setNoteOptions } = useAddNote();
  const {
    mutate: deleteNote,
    isPending: isDeletingNote,
    isSuccess: isNoteDeleted,
    isError: isNoteDeleteError,
    error: noteDeleteError,
  } = useDeleteNote();
  const router = useRouter();

  useEffect(() => {
    if (isNoteDeleteError) {
      toast.error('Error while deleting note', {
        description: noteDeleteError.message,
      });
    }
  }, [isNoteDeleteError, noteDeleteError]);

  const filteredNotes = localNotes.filter((note) =>
    note.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleSubmit(note: Omit<Note, 'id' | 'createdBy'>) {
    const newNote = {
      ...note,
      parentId: parentId,
      createdBy: parentId,
    };
    setNoteOptions(newNote);
    setIsFileFormVisible(false);
    setLocalNotes([...localNotes, { ...newNote, id: Date.now().toString() }]);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button onClick={() => setIsFileFormVisible(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Note
          </Button>
        </div>
        <ScrollArea className="h-[400px] px-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Modifié</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isFileFormVisible && (
                <NoteItemFormRow
                  handleSubmit={handleSubmit}
                  setOpen={setIsFileFormVisible}
                />
              )}
              {filteredNotes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No notes found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredNotes.map((note) => (
                  <TableRow
                    key={note.id}
                    className="items-center justify-center"
                  >
                    <TableCell className="font-medium">{note.name}</TableCell>
                    <TableCell>{note.description}</TableCell>
                    <TableCell>
                      {new Date(
                        note.lastModified ?? Date.now()
                      ).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right flex justify-end gap-2 items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/notes/${note.id}`)}
                      >
                        <File className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <DeleteTableButton
                        onClick={() => {
                          if (
                            confirm('Are you sure you want to delete this nte?')
                          ) {
                            deleteNote({
                              noteId: note.id,
                              pathToRevalidate: `/profile/notes/${note.id}`,
                            });
                            setLocalNotes(
                              localNotes.filter((n) => n.id !== note.id)
                            );
                          }
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function NoteItemFormRow({
  handleSubmit,
  setOpen,
}: {
  handleSubmit: (note: Omit<Note, 'id' | 'createdBy'>) => void;
  setOpen: (value: boolean) => void;
}) {
  const [localNote, setLocalNote] = useState<Omit<Note, 'id' | 'createdBy'>>({
    name: '',
    description: '',
    type: 'Item',
    parentId: '1',
    createdAt: Date.now(),
    content: '',
    contentType: 'Markup',
    fullPath: '',
    pathDictionary: [],
    folders: [],
    keywords: [],
    lastModified: Date.now(),
  });

  return (
    <TableRow>
      <TableCell>
        <Input
          value={localNote.name}
          onChange={(e) => setLocalNote({ ...localNote, name: e.target.value })}
          placeholder="Name"
        />
      </TableCell>
      <TableCell>
        <Input
          value={localNote.description}
          onChange={(e) =>
            setLocalNote({ ...localNote, description: e.target.value })
          }
          placeholder="Description"
        />
      </TableCell>
      <TableCell>
        <Select
          onValueChange={(value) =>
            setLocalNote({ ...localNote, contentType: value as 'Markup' })
          }
          value={localNote.contentType}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Markup">Markup</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="text-right">
        <Button
          size="sm"
          onClick={() => handleSubmit(localNote)}
          disabled={!localNote.name}
        >
          <Check className="mr-2 h-4 w-4" />
          Save
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default NotesTableView;
