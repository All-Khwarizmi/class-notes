import React from "react";
import Link from "next/link";
import { Settings, Trash, Eye } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import { Badge } from "@/core/components/ui/badge";
import { AspectRatio } from "@/core/components/ui/aspect-ratio";

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
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <img
            src={imageUrl}
            alt={`Couverture de ${title}`}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <h3 className="text-md font-semibold line-clamp-1">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        <div className="flex flex-wrap gap-1">
          {tags.split(",").map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag.trim()}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        {showViewButton && (
          <Button asChild variant="outline" size="sm">
            <Link href={pathToView ?? "/sequences"}>
              <Eye className="mr-2 h-4 w-4" />
              Voir
            </Link>
          </Button>
        )}
        <div className="flex gap-2">
          {!spacesMode && (
            <Button asChild variant="ghost" size="icon" aria-label="Paramètres">
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
              aria-label="Supprimer"
            >
              <Trash className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
