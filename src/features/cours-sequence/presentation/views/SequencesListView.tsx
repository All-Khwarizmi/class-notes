import React from "react";
import { Sequence } from "../../domain/entities/cours-schemas";
import CoursSequenceCard from "../components/CoursSequenceCard";

function SequencesListView({ sequences }: { sequences: Sequence[] }) {
  return (
    <>
      <div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sequences.map((sequence) => (
            <CoursSequenceCard
              key={sequence._id}
              title={sequence.name}
              description={sequence.description}
              imageUrl={sequence.imageUrl}
              tags={sequence.category}
              path={`/sequences/${sequence._id}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default SequencesListView;
