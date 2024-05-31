import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/core/components/ui/collapsible";
import { Cours } from "../../domain/entities/cours-schemas";
import { useState } from "react";
import CoursSequenceCard from "./CoursSequenceCard";
import AfterMenuButton from "@/core/components/common/editor/AfterMenuButton";
import Link from "next/link";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

function CallapsibleCoursList(props: { cours: Cours[]; sequenceId: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full">
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold">
            {props.cours.length} Cours in this sequence
          </h3>

          <CaretSortIcon />
          <Link
            href={`/cours/add/${props.sequenceId}`}
            className={cn(
              "bg-transparent rounded-md p-1 px-2 flex items-center ml-2 hover:bg-slate-400 border border-slate-400 hover:border-slate-400"
            )}
          >
            <Plus size={12} />
          </Link>
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {props.cours.map((cours) => (
              <CoursSequenceCard
                key={cours._id}
                title={cours.name}
                description={cours.description}
                imageUrl={cours.imageUrl}
                tags={cours.category}
                path={`/cours/${cours._id}`}
                showViewButton={false}
                pathToView={`/sequences/show/${cours.sequenceId}`}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

export default CallapsibleCoursList;
