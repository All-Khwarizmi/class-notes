"use client";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import useDeleteSequence from "@/features/complement/application/adapters/services/useDeleteSequence";
import {
  HeaderTypographyH1,
  TypographyH1,
} from "@/core/components/common/Typography";
import CoursSequenceCard from "../components/CoursSequenceCard";
import useGetAllSequences from "../../application/adapters/services/useGetAllSequences";
import { isRight } from "fp-ts/lib/Either";
function SequencesListView({
  spacesMode = false,
  userId,
  sequenceType,
  sequenceId,
}: {
  spacesMode?: boolean;
  userId: string;
  sequenceType: "template" | "sequence";
  sequenceId?: string;
}) {
  const { data: sequences } = useGetAllSequences(userId);
  const { mutate: deleteSequence } = useDeleteSequence();
  if (sequences && isRight(sequences)) {
    return (
      <div className="w-full h-full px-4">
        <HeaderTypographyH1 text="Sequences" />
        <section className="grid grid-cols-1  gap-4 sm:grid-cols-3   lg:grid-cols-5">
          {sequences.right.map((sequence) => (
            <CoursSequenceCard
              deleteOption={true}
              deleteSequence={() => {
                const confirmation = window.confirm(
                  "Are you sure you want to delete this sequence?"
                );
                if (confirmation) {
                  deleteSequence({
                    sequenceId: sequence._id,
                    userId,
                    type: sequenceType,
                  });
                }
              }}
              key={sequence._id}
              title={sequence.name}
              description={sequence.description}
              imageUrl={sequence.imageUrl}
              tags={sequence.category}
              showViewButton={true}
              pathToView={`/sequences/${sequence._id}?type=${sequenceType}`}
              path={`/sequences/edit/${sequence._id}`}
              spacesMode={spacesMode}
            />
          ))}
        </section>

        {sequenceType === "sequence" ? (
          <div className="flex  justify-center w-full mt-4">
            <Link href={`/classes/sequences/${sequenceId}`}>
              <Button variant={"outline"}>
                <Plus size={16} />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex  justify-center w-full mt-8">
            <Link href={`/sequences/add`}>
              <Button>
                <Plus size={16} />
              </Button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default SequencesListView;
