'use client';

import { EXTENSIONS } from '@/core/components/constants/editor-extenstions';
import { useSpacesLayoutContext } from '@/core/components/layout/spaces/SpacesLayoutCtx';
import { Button } from '@/core/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import { ScrollArea } from '@/core/components/ui/scroll-area';
import { NavItem } from '@/lib/types';
import { EditorContent, useEditor } from '@tiptap/react';
import { Maximize2, Minimize2 } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';

interface ContentViewerProps {
  content: string;
  navItems: NavItem[];
  title?: string;
}

function ContentViewer({ content, navItems, title }: ContentViewerProps) {
  const { setSpacesNavItems } = useSpacesLayoutContext();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (setSpacesNavItems) {
      setSpacesNavItems(navItems);
    }
  }, [navItems, setSpacesNavItems]);

  const editor = useEditor({
    editable: false,
    content: content || getDefaultContent(),
    extensions: EXTENSIONS,
  });

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      contentRef.current?.requestFullscreen();
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

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  if (!editor) {
    return null;
  }

  return (
    <Card className="w-full max-w-3xl mx-auto my-8" ref={contentRef}>
      <CardHeader className="flex flex-row items-center justify-between">
        {title && <CardTitle>{title}</CardTitle>}
        <Button
          variant="outline"
          size="icon"
          onClick={toggleFullScreen}
          aria-label={
            isFullScreen ? 'Quitter le plein écran' : 'Afficher en plein écran'
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
            isFullScreen ? 'h-[calc(100vh-100px)]' : 'h-[calc(100vh-200px)]'
          }
        >
          <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
            <EditorContent editor={editor} />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function getDefaultContent() {
  return `
    <div class="text-center p-8">
      <h2 class="text-2xl font-bold mb-4">Bienvenue sur notre plateforme de contenu</h2>
      <p class="mb-6">Aucun contenu n'est disponible pour le moment. Revenez bientôt pour des mises à jour !</p>
      <ul class="space-y-2">
        <li>📚 Articles</li>
        <li>💡 Astuces</li>
        <li>🎨 Contenu interactif</li>
      </ul>
    </div>
  `;
}

export default ContentViewer;
