import React from "react";
import { Sequence } from "../../domain/entities/cours-schemas";
import CoursSequenceCard from "../components/CoursSequenceCard";
import { Button } from "@/core/components/ui/button";
import Link from "next/link";

function SequencesListViewSpaces({
  sequences,
  spacesMode = false,
  userId,
}: {
  sequences: Sequence[];
  spacesMode?: boolean;
  userId: string;
}) {
  return (
    <>
      <div className=" h-full w-full flex flex-col gap-4 justify-between pb-12 px-4">
        <div className="grid grid-cols-1  gap-4 sm:grid-cols-3  lg:grid-cols-5">
          {sequences.map((sequence) => (
            <CoursSequenceCard
              key={sequence._id}
              title={sequence.name}
              description={sequence.description}
              imageUrl={sequence.imageUrl}
              tags={sequence.category}
              showViewButton={true}
              pathToView={`/spaces/sequences/${sequence._id}?user=${userId}`}
              path={`/sequences/${sequence._id}`}
              spacesMode={spacesMode}
            />
          ))}
        </div>
        {!spacesMode && (
          <div className="flex justify-center pb-8">
            <Button className="" variant={"default"}>
              <Link href="/sequences/add">Add Sequence</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default SequencesListViewSpaces;
