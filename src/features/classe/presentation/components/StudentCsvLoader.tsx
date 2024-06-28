import { Button } from "@/core/components/ui/button";
import React, { useState } from "react";
import {
  useCSVReader,
  lightenDarkenColor,
  formatFileSize,
} from "react-papaparse";
import { Id } from "../../../../../convex/_generated/dataModel";
import useAddStudent from "../../application/adapters/services/useAddStudent";
import useAddManyStudents from "../../application/adapters/services/useAddManyStudents";

const GREY = "#CCC";
const GREY_DIM = "#686868";
const DEFAULT_REMOVE_HOVER_COLOR = "#A01919";
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
  DEFAULT_REMOVE_HOVER_COLOR,
  40
);

function CSVReader(props: {
  classeId: string;

  refetchCompoundEvaluations: () => void;
}) {
  const { mutate: addManyStudents } = useAddManyStudents();
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);
  const [removeHoverColor, setRemoveHoverColor] = useState(
    DEFAULT_REMOVE_HOVER_COLOR
  );
  const [students, setStudents] = useState<string[]>([]);

  return (
    <CSVReader
      onUploadAccepted={(results: any) => {
        const studentNames = results.data.map((row: any) =>
          Object.values(row).join(" ")
        );
        setStudents(studentNames);
        setZoneHover(false);
      }}
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
        <div className="p-4">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
              zoneHover ? "border-gray-500" : "border-gray-300"
            }`}
          >
            {acceptedFile ? (
              <div className="relative flex flex-col items-center">
                <div className="flex flex-col items-center bg-gradient-to-b from-gray-300 to-gray-200 rounded-lg p-4 w-32 h-32">
                  <div className="text-xs bg-gray-100 rounded px-2 py-1 mb-2">
                    {formatFileSize(acceptedFile.size)}
                  </div>
                  <div className="text-sm bg-gray-100 rounded px-2 py-1">
                    {acceptedFile.name}
                  </div>
                </div>
                <div className="absolute bottom-3 w-full px-2">
                  <ProgressBar className="w-full" />
                </div>
                <div
                  {...getRemoveFileProps()}
                  className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center text-white bg-red-600 rounded-full cursor-pointer hover:bg-red-700 transition-colors"
                  onMouseOver={() =>
                    setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT)
                  }
                  onMouseOut={() =>
                    setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR)
                  }
                >
                  <Remove color={removeHoverColor} />
                </div>
              </div>
            ) : (
              "Drop CSV file here or click to upload"
            )}
          </div>

          {students.length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Uploaded Students</h2>
              <ul className="list-disc pl-5">
                {students.map((student, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <li className="mb-1">{student}</li>{" "}
                    <span
                      onClick={() =>
                        setStudents(students.filter((_, i) => i !== index))
                      }
                      className="text-red-500 cursor-pointer"
                    >
                      Delete
                    </span>
                  </div>
                ))}
              </ul>
              <div className="flex justify-between items-center mt-4">
                <Button
                  onClick={() => {
                    addManyStudents(
                      {
                        students: students.map((name) => ({
                          name,
                          classId: props.classeId,
                        })),
                      },
                      {
                        onSuccess: () => {
                          props.refetchCompoundEvaluations();
                          setStudents([]);
                        },
                      }
                    );

                    setStudents([]);
                  }}
                  className="mt-4"
                >
                  Save Students
                </Button>
                <Button
                  onClick={() => setStudents([])}
                  className="mt-4 bg-red-500"
                >
                  Clear
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </CSVReader>
  );
}

export default CSVReader;
