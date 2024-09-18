import {
  CardContent,
  CardFooter,
  Card,
  CardHeader,
} from "@/core/components/ui/card";
import { Settings, Trash } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import Link from "next/link";

interface CoursSequenceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  tags: string;
  path: string;
  showViewButton?: boolean;
  pathToView?: string;
  spacesMode?: boolean;
  deleteOption?: boolean;
  deleteSequence?: () => void;
}

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
}: CoursSequenceCardProps) {
  return (
    <Card className="max-w-xs overflow-hidden transition-shadow hover:shadow-md dark:bg-gray-800">
      <CardHeader className="p-0">
        <img
          alt={`${title} cover`}
          className="h-48 w-full object-cover"
          src={imageUrl}
        />
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        <div className="flex flex-wrap gap-1">
          {tags.split(",").map((tag) => (
            <span
              key={tag}
              className="bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-xs font-medium"
            >
              {tag.trim()}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        {showViewButton && (
          <Button asChild variant="outline" size="sm">
            <Link href={pathToView ?? "/sequences"}>View</Link>
          </Button>
        )}
        <div className="flex gap-2">
          {!spacesMode && (
            <Button asChild variant="ghost" size="icon">
              <Link href={path}>
                <Settings className="h-4 w-4" />
              </Link>
            </Button>
          )}
          {deleteOption && deleteSequence && (
            <Button
              variant="ghost"
              size="icon"
              onClick={deleteSequence}
              className="text-destructive hover:text-destructive/90"
            >
              <Trash className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
