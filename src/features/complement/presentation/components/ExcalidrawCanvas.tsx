'use client';

import { Button } from '@/core/components/ui/button';
import { cn } from '@/lib/utils';
import { serializeAsJSON, restore } from '@excalidraw/excalidraw';
import {
  ExcalidrawImperativeAPI,
  ExcalidrawInitialDataState,
} from '@excalidraw/excalidraw/types/types';
import { debounce } from 'lodash';
import { Loader2, Save } from 'lucide-react';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { toast } from 'sonner';

const Excalidraw = dynamic(
  async () => (await import('@excalidraw/excalidraw')).Excalidraw,
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[90vh] flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    ),
  }
);

interface ExcalidrawCanvasProps {
  initialData: string;
  saveComplement: (content: string) => void;
}

export function ExcalidrawCanvas({
  initialData,
  saveComplement,
}: ExcalidrawCanvasProps) {
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>(
    'saved'
  );
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);
  const [appState, setAppState] = useState<ExcalidrawInitialDataState>({
    elements: [],
    appState: {},
    files: {},
  });
  const theme = useTheme();
  const lastSerializedData = useRef('');

  useEffect(() => {
    console.log('Initial data received');
    if (initialData) {
      try {
        const restoredData = restore(
          JSON.parse(initialData) as ExcalidrawInitialDataState,
          null,
          null
        );
        setAppState(restoredData);
        lastSerializedData.current = initialData;
        console.log('Data restored successfully');
      } catch (error) {
        console.error('Error parsing Excalidraw data:', error);
      }
    }
  }, [initialData]);

  const saveData = useCallback(() => {
    console.log('saveData called');
    if (!excalidrawAPI) {
      console.log('excalidrawAPI not available');
      return;
    }

    setSaveStatus('saving');
    const elements = excalidrawAPI.getSceneElements();
    const appState = excalidrawAPI.getAppState();
    const files = excalidrawAPI.getFiles();

    const serializedData = serializeAsJSON(elements, appState, files, 'local');
    console.log('New serialized data:');

    saveComplement(serializedData);
    lastSerializedData.current = serializedData;
    setSaveStatus('saved');
    toast.success('Vos modifications ont été enregistrées avec succès.');
  }, [excalidrawAPI, saveComplement]);

  const handleChange = useCallback(() => {
    if (!excalidrawAPI) return;

    const elements = excalidrawAPI.getSceneElements();
    const appState = excalidrawAPI.getAppState();
    const files = excalidrawAPI.getFiles();
    const serializedData = serializeAsJSON(elements, appState, files, 'local');

    if (serializedData !== lastSerializedData.current) {
      console.log('Change detected');
      setSaveStatus('unsaved');
    }
  }, [excalidrawAPI]);

  // Debounce the handleChange function to avoid excessive calls
  const debouncedHandleChange = useCallback(debounce(handleChange, 500), [
    handleChange,
  ]);

  return (
    <div className="flex flex-col w-full h-[88vh] rounded-lg overflow-hidden border border-border">
      <div className="flex-grow">
        <Excalidraw
          theme={theme.resolvedTheme === 'dark' ? 'dark' : 'light'}
          initialData={appState}
          excalidrawAPI={(api) => {
            console.log('Excalidraw API set');
            setExcalidrawAPI(api);
          }}
          onChange={debouncedHandleChange}
        />
      </div>
      <div className="flex justify-between items-center p-4 bg-background">
        <div className="flex items-center space-x-2">
          <div
            className={cn(
              'w-3 h-3 rounded-full transition-colors duration-300',
              saveStatus === 'saved'
                ? 'bg-green-500'
                : saveStatus === 'saving'
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
            )}
            title={
              saveStatus === 'saved'
                ? 'Sauvegardé'
                : saveStatus === 'saving'
                  ? 'Sauvegarde en cours...'
                  : 'Non sauvegardé'
            }
          />
          <span className="text-sm text-muted-foreground">
            {saveStatus === 'saved'
              ? 'Sauvegardé'
              : saveStatus === 'saving'
                ? 'Sauvegarde en cours...'
                : 'Non sauvegardé'}
          </span>
        </div>
        <Button
          onClick={saveData}
          disabled={saveStatus === 'saving' || saveStatus === 'saved'}
        >
          {saveStatus === 'saving' ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sauvegarde...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Sauvegarder
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
