/**
 * v0 by Vercel.
 * @see https://v0.dev/t/st7u8l4epdA
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { CardContent, CardFooter, Card } from "@/core/components/ui/card";
import Link from "next/link";
import { Eye, PenIcon } from "lucide-react";
import AfterMenuButton from "@/core/components/common/editor/AfterMenuButton";

export default function CoursSequenceCard({
  title,
  description,
  imageUrl,
  tags,
  path,
  showViewButton,
  pathToView,
  spacesMode,
}: {
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
    <Card className=" max-w-sm">
      <img
        alt="Product Image"
        className="rounded-t-lg object-cover w-full aspect-[3/2]"
        height={400}
        src={imageUrl}
        width={600}
      />
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
        <div className="flex gap-2">
         {
          !spacesMode && (
            <AfterMenuButton
              addButton={true}
              path={`/sequences/${path}`}
              icon={<PenIcon size={12} />}
            />
          )
         }
          {showViewButton && (
            <AfterMenuButton
              addButton={true}
              path={pathToView ?? "/sequences"}
              icon={<Eye size={12} />}
            />
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
