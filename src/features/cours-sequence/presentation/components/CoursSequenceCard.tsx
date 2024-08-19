import {
  CardContent,
  CardFooter,
  Card,
  CardHeader,
} from "@/core/components/ui/card";
import { Settings, Trash } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CoursSequenceCard({
  title,
  description,
  imageUrl,
  tags,
  path,
  showViewButton,
  pathToView,
  spacesMode,
  deleteOption,
  deleteSequence,
}: {
  deleteOption?: boolean;
  deleteSequence?: () => void;
  title: string;
  description: string;
  imageUrl: string;
  tags: string;
  path: string;
  showViewButton?: boolean;
  pathToView?: string;
  spacesMode?: boolean;
}) {
  return (
    <Card className=" md:max-w-sm bg-slate-800">
      <CardHeader className="w-full">
        <img
          alt="Product Image"
          className="rounded-lg object-cover w-full aspect-[square]"
          height={400}
          src={imageUrl}
          width={600}
        />
      </CardHeader>
      <CardContent className="space-y-2">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-500 text-sm dark:text-gray-400">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.split(",").map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 rounded-full px-3 py-1 text-xs font-medium dark:bg-slate-900"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="py-4">
        <div className="flex gap-2 w-full">
          {showViewButton && (
            <div className="w-full flex justify-center">
              <Link href={pathToView ?? "/sequences"}>
                <Button>View</Button>
              </Link>
            </div>
          )}
          {!spacesMode && (
            <Link href={path} className=" ">
              <Settings />
            </Link>
          )}
          {deleteOption && deleteSequence && (
            <Trash
              size={28}
              onClick={deleteSequence}
              className={cn(" text-red-500 cursor-pointer ")}
            />
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
