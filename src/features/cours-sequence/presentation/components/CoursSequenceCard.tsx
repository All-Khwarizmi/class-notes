/**
 * v0 by Vercel.
 * @see https://v0.dev/t/st7u8l4epdA
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  CardContent,
  CardFooter,
  Card,
  CardHeader,
} from "@/core/components/ui/card";
import {  Settings, Trash } from "lucide-react";
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
    <Card className=" md:max-w-sm">
      <CardHeader className="">
        <img
          alt="Product Image"
          className="rounded-t-lg object-cover w-full aspect-[3/2]"
          height={400}
          src={imageUrl}
          width={600}
        />
      </CardHeader>
      <CardContent className="p-4 space-y-2 ">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.split(",").map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 rounded-full px-3 py-1 text-xs font-medium dark:bg-gray-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <div className="flex gap-2 w-full">
          {showViewButton && (
            <div className="flex justify-center w-full h-full">
              <Button variant="outline" className="">
                <Link href={pathToView ?? "/sequences"}>View Sequence</Link>
              </Button>
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
