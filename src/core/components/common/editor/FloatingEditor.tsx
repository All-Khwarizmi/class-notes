"use client";

import React, { useState, useRef, useEffect } from "react";
import { EditorContent, FloatingMenu, useEditor } from "@tiptap/react";
import { EXTENSIONS } from "@/core/components/constants/editor-extenstions";
import { DebouncedFunc } from "lodash";
import FloatingMenuBar from "@/core/components/common/editor/FloatingMenuBar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { ScrollArea } from "@/core/components/ui/scroll-area";
import { Button } from "@/core/components/ui/button";
import { Maximize2, Minimize2 } from "lucide-react";
import AfterMenuBar from "./AfterMunuBar";

interface FloatingEditorProps {
  content: string;
  debounceUpdateFn: DebouncedFunc<(content: string) => void>;
  afterMenuBar?: boolean;
  children?: React.ReactNode;
  title?: string;
}

function FloatingEditor({
  content,
  debounceUpdateFn,
  afterMenuBar,
  children,
  title,
}: FloatingEditorProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const contentOrPlaceholder = content !== "" ? content : getDefaultContent();

  const editor = useEditor({
    extensions: EXTENSIONS,
    content: contentOrPlaceholder,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      debounceUpdateFn(content);
    },
  });

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      editorRef.current?.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  if (!editor) {
    return null;
  }

  return (
    <Card className="w-full max-w-4xl mx-auto my-8" ref={editorRef}>
      <CardHeader className="flex flex-row items-center justify-between">
        {title && <CardTitle>{title}</CardTitle>}
        <Button
          variant="outline"
          size="icon"
          onClick={toggleFullScreen}
          aria-label={
            isFullScreen ? "Quitter le plein écran" : "Afficher en plein écran"
          }
        >
          {isFullScreen ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea
          className={
            isFullScreen ? "h-[calc(100vh-100px)]" : "h-[calc(80vh-200px)]"
          }
        >
          <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
            <FloatingMenu
              editor={editor}
              tippyOptions={{
                duration: 300,
                offset: [0, 50],
                placement: "top",
              }}
              shouldShow={({ state, view }) => {
                const { selection } = state;
                const { empty } = selection;
                const right = view.endOfTextblock("right");
                const left = view.endOfTextblock("left");
                return !empty || (right && left);
              }}
            >
              <FloatingMenuBar editor={editor} />
            </FloatingMenu>
            <EditorContent editor={editor} />
          </div>
        </ScrollArea>
      </CardContent>
      {afterMenuBar && (
        <div className="flex flex-col gap-4 p-4">
          <AfterMenuBar editor={editor}>{children}</AfterMenuBar>
        </div>
      )}
    </Card>
  );
}

function getDefaultContent() {
  return `
    <h2 style="text-align: center">Bienvenue dans votre éditeur</h2>
    <p>Commencez à taper pour créer votre contenu. Essayez différentes options de formatage :</p>
    <ul>
      <li><strong>Gras</strong></li>
      <li><em>Italique</em></li>
      <li>Listes</li>
    </ul>
    <blockquote>Utilisez des citations pour les informations importantes.</blockquote>
  `;
}

export default FloatingEditor;
