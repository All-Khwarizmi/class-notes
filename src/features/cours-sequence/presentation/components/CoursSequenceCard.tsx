/**
 * v0 by Vercel.
 * @see https://v0.dev/t/st7u8l4epdA
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { CardContent, CardFooter, Card } from "@/core/components/ui/card";
import Link from "next/link";

export default function CoursSequenceCard({
  title,
  description,
  imageUrl,
  tags,
  path
}: {
  title: string;
  description: string;
  imageUrl: string;
  tags: string;
  path: string;
}) {
  return (
    <Card className="w-full max-w-md">
      <img
        alt="Product Image"
        className="rounded-t-lg object-cover w-full aspect-[3/2]"
        height={400}
        src={imageUrl}
        width={600}
      />
      <CardContent className="p-4 space-y-2">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.split(',').map((tag) => (
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
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          href={path}
        >
            View
        </Link>
      </CardFooter>
    </Card>
  );
}
