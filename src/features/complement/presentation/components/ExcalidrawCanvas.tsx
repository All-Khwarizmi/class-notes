"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  ExcalidrawImperativeAPI,
  ExcalidrawInitialDataState,
} from "@excalidraw/excalidraw/types/types";
import { serializeAsJSON, restore } from "@excalidraw/excalidraw";
import { cn } from "@/lib/utils";
import { Button } from "@/core/components/ui/button";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { debounce } from "lodash";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  }
);
function hashCode(str: string): string {
  // Check if the string is a valid JSON
  try {
    JSON.parse(str);
  } catch (error) {
    return str;
  }
  return JSON.stringify(JSON.parse(str));
}


export function ExcalidrawCanvas({
  initialData,
  saveComplement,
}: {
  initialData: string;
  saveComplement: (content: string) => void;
}) {
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">(
    "saved"
  );
  const [firstChange, setFirstChange] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);
  const [prevElements, setPrevElements] = useState<string>("");
  const [appState, setAppState] = useState<ExcalidrawInitialDataState>({
    elements: [],
    appState: {},
    files: {},
  });

  useEffect(() => {
    setIsBrowser(true);
  }, []);
  useEffect(() => {
    if (initialData) {
      try {
        const restoredData = restore(
          JSON.parse(initialData) as ExcalidrawInitialDataState,
          null,
          null
        );
        setAppState(restoredData);
      } catch (error) {
        console.error("Error parsing Excalidraw data:", error);
      }
    }
  }, [initialData]);

  const saveData = useCallback(() => {
    if (!excalidrawAPI) {
      return;
    }
    setFirstChange(true);
    setSaveStatus("saving");
    const elements = excalidrawAPI.getSceneElements();
    const appState = excalidrawAPI.getAppState();
    const files = excalidrawAPI.getFiles();

    const serializedData = serializeAsJSON(elements, appState, files, "local");
    saveComplement(serializedData);
    setSaveStatus("saved");
  }, [excalidrawAPI, saveComplement]);

  const debouncedSave = useCallback(
    debounce(() => {
      setSaveStatus("saving");
      saveData();
      setSaveStatus("saved");
    }, 2000),
    [saveData, setSaveStatus]
  );
  const handleChange = useCallback(
    (elements: readonly ExcalidrawElement[], appState: any, files: any) => {
      // Is Scene Elements changed?
      const elementsHash = hashCode(JSON.stringify(elements));
    },
    [debouncedSave, firstChange]
  );

  if (!isBrowser) {
    return <LoadingSkeleton />;
  }

  return (
    <div
      className="excalidraw-container rounded-lg shadow-md shadow-slate-800"
      style={{ width: "100%", height: "90%" }}
    >
      <Excalidraw
        theme="dark"
        initialData={appState}
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
        onChange={() => {
          // You can implement auto-save here if needed
          handleChange(
            excalidrawAPI?.getSceneElements() || [],
            excalidrawAPI?.getAppState() || {},
            excalidrawAPI?.getFiles() || {}
          );
        }}
      />
      <div className="w-full flex justify-between py-4">
        <div
          className={cn(
            "px-4 py-2 rounded-lg",
            saveStatus === "saved" ? "bg-green-500" : "bg-red-500"
          )}
        >
          {saveStatus}
        </div>
        <Button onClick={saveData}>Save</Button>
      </div>
    </div>
  );
}
