import NotFound from "@/app/not-found";
import ErrorDialog from "@/core/components/common/ErrorDialog";
import Dashboard from "@/core/components/icons/Dashboard";
import Sidebar from "@/core/components/layout/Sidebar";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { notesUsecases } from "@/features/notes/application/usecases/note-usecases";
import { NoteSchema } from "@/features/notes/domain/notes-schemas";
import NoteEditorView from "@/features/notes/presentation/views/NoteEditorView";
import { NavItem } from "@/lib/types";
import { isLeft } from "fp-ts/lib/Either";
import { File, Folder } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

async function NoteServerLayer(props: { slug: string }) {
  if (!props.slug) {
    return <NotFound />;
  }
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }

  const eitherNote = await notesUsecases.getNote({
    id: props.slug,
  });

  if (isLeft(eitherNote)) {
    return (
      <ErrorDialog
        message={`
        Failed to fetch note with id: ${props.slug}

        ${eitherNote.left.message}
        Code: ${eitherNote.left.code}
        `}
      />
    );
  }
  const parsedNote = {
    ...eitherNote.right,
    id: eitherNote.right._id,
    createdAt: eitherNote.right._creationTime,
  };
  const validatedNote = NoteSchema.safeParse(parsedNote);

  if (!validatedNote.success) {
    return (
      <ErrorDialog
        message={`
            Failed to validate note with id: ${props.slug}
    
            ${validatedNote.error}

            Code: APP203
            `}
      />
    );
  }
  const noteNavItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Dashboard(),
    },

    {
      title: "Folders",
      href: `/profile/notes/${authUser.right.userId}`,
      icon: <Folder size={16} />,
      isChidren: true,
      children: validatedNote.data.folders.map((folder) => {
        return {
          title: folder.name,
          href: `/notes/${folder.id}`,
          icon: <Folder size={16} />,
        };
      }),
    },
    {
      title: "Notes",
      href: `/notes/${authUser.right.userId}`,
      icon: <File size={16} />,
      isChidren: true,
      children: validatedNote.data.pathDictionary.map((note) => {
        return {
          title: note.name,
          href: `/notes/${note.id}`,
          icon: <File size={16} />,
        };
      }),
    },
  ];

  return (
    <>
      <Sidebar navItems={noteNavItems} />
      <section className="h-full flex-1  overflow-x-hidden">
        <div className="h-full py-8 px-6">
          <NoteEditorView note={validatedNote.data} />
        </div>
      </section>
    </>
  );
}

export default NoteServerLayer;
