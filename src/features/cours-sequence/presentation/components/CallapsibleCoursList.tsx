import { CaretSortIcon } from "@radix-ui/react-icons";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/core/components/ui/collapsible";
import { Cours } from "../../domain/entities/cours-schemas";
import { useState } from "react";
import CoursSequenceCard from "./CoursSequenceCard";

function CallapsibleCoursList({ cours }: { cours: Cours[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full">
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold">
            {cours.length} Cours in this sequence
          </h3>
          <CaretSortIcon />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cours.map((cours) => (
              <CoursSequenceCard
                key={cours._id}
                title={cours.name}
                description={cours.description}
                imageUrl={cours.imageUrl}
                tags={cours.category}
                path={`/cours/${cours._id}`}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

export default CallapsibleCoursList;
