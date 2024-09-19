import React from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

type ComplementSummary = {
  _id: string;
  complementMetadata: {
    name: string;
    description?: string;
    type: "Lesson" | "Exercise" | "Additional";
  };
  status: "pending" | "processing" | "completed" | "error";
  summary?: string;
};

export default function ComplementSummaryManager(props: {
  complementId: string;
  contentToSummarize: string;
}) {
  const complementSummary = useQuery(
    api.complement.getComplementSummaryByComplementId,
    {
      complementId: props.complementId,
    }
  );
  const createComplementSummary = useMutation(
    api.complement.createComplementSummary
  );

  const handleCreateSummary = async () => {
    try {
      console.log("Creating summary for complement", { props });
      await createComplementSummary({
        complementId: props.complementId,
        contentToSummarize: props.contentToSummarize,
        complementMetadata: {
          contentType: "Markup",
          name: "Summary",
          type: "Lesson",
        },
        status: "pending",
        generatedBy: "AI",
        updatedAt: Date.now(),
      });
      // Show success message
      console.log("Summary creation initiated");
    } catch (error) {
      console.error("Error creating complement summary:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Complement Summary Manager</h1>

      <button
        onClick={handleCreateSummary}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
      >
        Create New Summary
      </button>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Existing Summaries</h2>
        {complementSummary ? (
          <ul className="divide-y divide-gray-200">
            {complementSummary.map((summary: ComplementSummary) => (
              <li key={summary._id} className="py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {summary.complementMetadata.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {summary.complementMetadata.type}
                    </p>
                    <p className="text-sm text-gray-500">
                      Status: {summary.status}
                    </p>
                  </div>
                  <div className="max-w-md overflow-hidden">
                    <p className="text-sm text-gray-700 truncate">
                      {summary.summary || "No summary available"}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No summaries available</p>
        )}
      </div>
    </div>
  );
}
