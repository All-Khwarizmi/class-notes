"use client";

import React, { useEffect } from "react";
import { Sequence } from "../../domain/entities/cours-schemas";
import CoursSequenceCard from "../components/CoursSequenceCard";
import { Button } from "@/core/components/ui/button";
import Link from "next/link";
import { NavItem } from "@/lib/types";
import { useLayoutContext } from "@/core/components/layout/ExperimentalLayoutCtx";

function SequencesListViewSpaces({
  sequences,
  spacesMode = false,
  userId,
  navItems,
}: {
  sequences: Sequence[];
  spacesMode?: boolean;
  userId: string;
  navItems: NavItem[];
}) {
  const { setSpacesNavItems, setIsSpaces } = useLayoutContext();
  useEffect(() => {
    if (setSpacesNavItems && setIsSpaces) {
      setSpacesNavItems(navItems);
      setIsSpaces(true);
    }
  }, [navItems, setSpacesNavItems, setIsSpaces]);
  return (
    <>
      <div className=" h-full w-full flex flex-col gap-4 justify-between pb-12 px-4">
        <div className="grid grid-cols-1  gap-4 sm:grid-cols-2   lg:grid-cols-4">
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
