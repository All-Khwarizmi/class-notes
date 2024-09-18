"use client";

import React from "react";
import Link from "next/link";
import { Plus, Loader2 } from "lucide-react";
import { isRight } from "fp-ts/lib/Either";
import { Button } from "@/core/components/ui/button";
import { Card, CardContent } from "@/core/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/core/components/ui/alert";
import useDeleteSequence from "@/features/complement/application/adapters/services/useDeleteSequence";
import useGetAllSequences from "../../application/adapters/services/useGetAllSequences";
import CoursSequenceCard from "../components/CoursSequenceCard";

interface SequencesListViewProps {
  spacesMode?: boolean;
  userId: string;
  sequenceType: "template" | "sequence";
  sequenceId?: string;
}

export default function SequencesListView({
  spacesMode = false,
  userId,
  sequenceType,
  sequenceId,
}: SequencesListViewProps) {
  const { data: sequences, isLoading, isError } = useGetAllSequences(userId);
  const { mutate: deleteSequence } = useDeleteSequence();

  if (isLoading) {
    return (
      <Card className="w-full h-[50vh] flex items-center justify-center">
        <CardContent>
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !sequences || !isRight(sequences)) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Erreur</AlertTitle>
        <AlertDescription>
          Une erreur s&apos;est produite lors du chargement des séquences.
          Veuillez réessayer plus tard.
        </AlertDescription>
      </Alert>
    );
  }

  const handleDeleteSequence = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette séquence ?")) {
      deleteSequence({
        sequenceId: id,
        userId,
        type: sequenceType,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Séquences</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sequences.right.map((sequence) => (
          <CoursSequenceCard
            key={sequence._id}
            title={sequence.name}
            description={sequence.description}
            imageUrl={sequence.imageUrl}
            tags={sequence.category}
            showViewButton={true}
            pathToView={`/sequences/${sequence._id}?type=${sequenceType}`}
            path={`/sequences/edit/${sequence._id}`}
            spacesMode={spacesMode}
            deleteOption={true}
            deleteSequence={() => handleDeleteSequence(sequence._id)}
          />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Button asChild>
          <Link
            href={
              sequenceType === "sequence"
                ? `/classes/sequences/${sequenceId}`
                : "/sequences/add"
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            {sequenceType === "sequence"
              ? "Ajouter une séquence"
              : "Ajouter un modèle"}
          </Link>
        </Button>
      </div>
    </div>
  );
}
