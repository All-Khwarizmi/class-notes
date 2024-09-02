"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Complement } from "../../domain/complement-schemas";
import UpdateComplement from "../components/UpdateComplement";
import { Eye } from "lucide-react";
import Link from "next/link";
import AfterMenuButton from "@/core/components/common/editor/AfterMenuButton";
import useUpdateComplement from "../../application/adapters/services/useUpdateComplement";
import FloatingEditor from "@/core/components/common/editor/FloatingEditor";
import dynamic from "next/dynamic";
import { exportToCanvas } from "@excalidraw/excalidraw";
import {
  AppState,
  ExcalidrawImperativeAPI,
  ExcalidrawInitialDataState,
} from "@excalidraw/excalidraw/types/types";
import { serializeAsJSON } from "@excalidraw/excalidraw";
import { restoreAppState } from "@excalidraw/excalidraw";
import { DebouncedFunc } from "lodash";
import { Button } from "@/core/components/ui/button";
const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  }
);

function fromStringToAppState(data: string): ExcalidrawInitialDataState {
  // Check if the string is of the right format
  if (!data.startsWith("{")) {
    return {
      elements: [],
      appState: {},
    };
  }
  return {
    elements: JSON.parse(data).elements,
    appState: JSON.parse(data).appState,
  };
}

function fromAppStateToString(appState: ExcalidrawInitialDataState): string {
  return JSON.stringify(appState);
}

function deserialize(data: string): string {
  // Check if the string is of the right format
  if (!data.startsWith("{")) {
    throw new Error("Invalid data format");
  }
  return JSON.stringify(JSON.parse(data));
}

export function ExcalidrawCanvas({
  initialData,
  saveComplement,
}: {
  initialData: string;
  saveComplement: DebouncedFunc<(content: string) => void>;
}) {
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);
  const [appState, setAppState] = useState<ExcalidrawInitialDataState>(
    fromStringToAppState(initialData)
  );

  useEffect(() => {
    if (initialData === "") {
      console.log("Initial data is empty");
      const localData = window.localStorage.getItem("excalidraw-data");
      if (localData) {
        console.log("Local data is not empty");
        setAppState(JSON.parse(localData));
      }
      console.log("Local data is empty");
    }
    console.log("Initial data is not empty");
  }, [initialData]);

  // Make a function to save the complement to the database periodically
  //   const saveComplementPeriodically = useCallback(() => {
  //     setInterval(() => {
  //       if (excalidrawAPI) {
  //         const elements = excalidrawAPI.getSceneElements();
  //         if (!elements || !elements.length) {
  //           return;
  //         }
  //         const app = serializeAsJSON(
  //           elements,
  //           excalidrawAPI.getAppState(),
  //           excalidrawAPI.getFiles(),
  //           "database"
  //         );
  //         const appString = fromAppStateToString(appState);
  //         const appDeserialized = deserialize(app);
  //         if (appString === appDeserialized) {
  //           return;
  //         }
  //         console.log({
  //           appString,
  //           appDeserialized,
  //         });
  //         setAppState(fromStringToAppState(app));
  //         window.localStorage.setItem("excalidraw-data", appDeserialized);
  //         saveComplement(appDeserialized);
  //       }
  //     }, 1000);
  //   }, [excalidrawAPI, saveComplement, appState]);
  //   Call the function to save the complement periodically
  //   useEffect(() => {
  //     saveComplementPeriodically();
  //   }, [saveComplementPeriodically]);

  const handleExport = () => {
    if (!excalidrawAPI) {
      return;
    }
    const elements = excalidrawAPI.getSceneElements();
    if (!elements || !elements.length) {
      return;
    }

    const app = serializeAsJSON(
      elements,
      excalidrawAPI.getAppState(),
      excalidrawAPI.getFiles(),
      "local"
    );

    // Compare the elements with the appState
    const appString = fromAppStateToString(appState);
    const appDeserialized = deserialize(app);
    if (appString === appDeserialized) {
      console.log("No changes", {
        appString,
        appDeserialized,
      });
      return;
    }

    setAppState(fromStringToAppState(app));
    window.localStorage.setItem("excalidraw-data", appDeserialized);
    saveComplement(appDeserialized);
  };

  return (
    <div
      className="excalidraw-container rounded-lg  shadow-md shadow-slate-800"
      style={{ width: "100%", height: "50%" }}
    >
      <Excalidraw
        theme="dark"
        initialData={appState}
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
        onChange={(appState) => {}}
      />
      <div className="w-full flex justify-center py-8">
        <Button onClick={handleExport}>Save</Button>
      </div>
    </div>
  );
}
