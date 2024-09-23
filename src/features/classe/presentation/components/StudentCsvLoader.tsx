"use client";

import React, { useState } from "react";
import { useCSVReader, formatFileSize } from "react-papaparse";
import { Button } from "@/core/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { ScrollArea } from "@/core/components/ui/scroll-area";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/core/components/ui/alert";
import { Trash2, Upload, Save, X } from "lucide-react";
import useAddManyStudents from "../../application/adapters/services/useAddManyStudents";

interface CSVReaderProps {
  classeId: string;
  refetchCompoundEvaluations: () => void;
}

export default function CSVReader({
  classeId,
  refetchCompoundEvaluations,
}: CSVReaderProps) {
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);
  const [students, setStudents] = useState<string[]>([]);
  const { mutate: addManyStudents, isPending, isError } = useAddManyStudents();

  const handleUpload = (results: any) => {
    const studentNames = results.data
      .slice(1) // Skip header row
      .map((row: any) => row[0]?.trim()) // Select only the first column and trim whitespace
      .filter((name: string) => name !== ""); // Remove empty rows
    setStudents(studentNames);
    setZoneHover(false);
  };

  const handleSaveStudents = () => {
    addManyStudents(
      {
        students: students.map((name) => ({
          name,
          classId: classeId,
        })),
      },
      {
        onSuccess: () => {
          refetchCompoundEvaluations();
          setStudents([]);
        },
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Importer des étudiants depuis un CSV</CardTitle>
      </CardHeader>
      <CardContent>
        <CSVReader
          onUploadAccepted={handleUpload}
          onDragOver={(event: React.DragEvent) => {
            event.preventDefault();
            setZoneHover(true);
          }}
          onDragLeave={(event: React.DragEvent) => {
            event.preventDefault();
            setZoneHover(false);
          }}
        >
          {({
            getRootProps,
            acceptedFile,
            ProgressBar,
            getRemoveFileProps,
            Remove,
          }: any) => (
            <div>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  zoneHover ? "border-primary" : "border-muted"
                }`}
              >
                {acceptedFile ? (
                  <div className="relative flex flex-col items-center">
                    <div className="flex flex-col items-center bg-muted rounded-lg p-4 w-32 h-32">
                      <div className="text-xs bg-background rounded px-2 py-1 mb-2">
                        {formatFileSize(acceptedFile.size)}
                      </div>
                      <div className="text-sm bg-background rounded px-2 py-1 text-center">
                        {acceptedFile.name}
                      </div>
                    </div>
                    <div className="absolute bottom-3 w-full px-2">
                      <ProgressBar />
                    </div>
                    <Button
                      {...getRemoveFileProps()}
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Supprimer le fichier</span>
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2">
                      Déposez un fichier CSV ici ou cliquez pour télécharger
                    </p>
                  </div>
                )}
              </div>

              {students.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Étudiants téléchargés
                  </h3>
                  <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                    <ul className="space-y-2">
                      {students.map((student, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span>{student}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              setStudents(
                                students.filter((_, i) => i !== index)
                              )
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Supprimer {student}</span>
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                  <div className="flex justify-between items-center mt-4">
                    <Button onClick={handleSaveStudents} disabled={isPending}>
                      <Save className="mr-2 h-4 w-4" />
                      Enregistrer les étudiants
                    </Button>
                    <Button variant="outline" onClick={() => setStudents([])}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Effacer tout
                    </Button>
                  </div>
                </div>
              )}

              {isError && (
                <Alert variant="destructive" className="mt-4">
                  <AlertTitle>Erreur</AlertTitle>
                  <AlertDescription>
                    Une erreur s&apos;est produite lors de l&apos;ajout des
                    étudiants. Veuillez réessayer.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CSVReader>
      </CardContent>
    </Card>
  );
}
