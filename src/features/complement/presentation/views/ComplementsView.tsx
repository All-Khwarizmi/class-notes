"use client";
import React from "react";
import { Complement } from "../../domain/complement-schemas";
import ComplementsTable from "@/features/cours-sequence/presentation/components/ComplementsTable";

function ComplementsView(props: {
  complements: Complement[];
  coursId: string;
  userId: string;
}) {
  return (
    <>
      <ComplementsTable
        complements={props.complements}
        coursId={props.coursId}
        userId={props.userId}
      />
    </>
  );
}

export default ComplementsView;
