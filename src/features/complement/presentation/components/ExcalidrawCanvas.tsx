import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  ExcalidrawImperativeAPI,
  ExcalidrawInitialDataState,
} from "@excalidraw/excalidraw/types/types";
import { serializeAsJSON, restore } from "@excalidraw/excalidraw";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  }
);

export function ExcalidrawCanvas({
  initialData,
  saveComplement,
}: {
  initialData: string;
  saveComplement: (content: string) => void;
}) {
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);
  const [appState, setAppState] = useState<ExcalidrawInitialDataState>({
    elements: [],
    appState: {},
    files: {},
  });

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

  const handleSave = () => {
    if (!excalidrawAPI) {
      return;
    }
    const elements = excalidrawAPI.getSceneElements();
    const appState = excalidrawAPI.getAppState();
    const files = excalidrawAPI.getFiles();

    const serializedData = serializeAsJSON(elements, appState, files, "local");
    saveComplement(serializedData);
  };

  return (
    <div
      className="excalidraw-container rounded-lg shadow-md shadow-slate-800"
      style={{ width: "100%", height: "100%" }}
    >
      <div className="w-full flex justify-center py-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
      </div>
      <Excalidraw
        theme="dark"
        initialData={appState}
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
        onChange={() => {
          // You can implement auto-save here if needed
        }}
      />
    </div>
  );
}
