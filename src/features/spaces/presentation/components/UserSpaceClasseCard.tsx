"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useLayoutContext } from "@/core/components/layout/ExperimentalLayoutCtx";
import { Button } from "@/core/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Badge } from "@/core/components/ui/badge";
import { ClassType } from "@/features/classe/domain/class-schema";
import { NavItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Users, Calendar, BookOpen } from "lucide-react";
import { AspectRatio } from "@/core/components/ui/aspect-ratio";

interface UserSpaceClasseCardProps {
  classe: ClassType;
  userId: string;
  navItems: NavItem[];
}

export default function UserSpaceClasseCard({
  classe,
  userId,
  navItems,
}: UserSpaceClasseCardProps) {
  const { setSpacesNavItems, setIsSpaces } = useLayoutContext();

  useEffect(() => {
    if (setSpacesNavItems && setIsSpaces) {
      setSpacesNavItems(navItems);
      setIsSpaces(true);
    }
  }, [navItems, setSpacesNavItems, setIsSpaces]);

  return (
    <Card
      className={cn(
        "overflow-hidden",
        "hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out"
      )}
    >
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <img
            src={
              classe.imageUrl ?? "/images/mos-design-jzFbbG2WXv0-unsplash.jpg"
            }
            alt={`Image de la classe ${classe.name}`}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold mb-2">
          {classe.name}
        </CardTitle>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {classe.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {classe.educationLevel && (
            <Badge variant="secondary">{classe.educationLevel}</Badge>
          )}
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          {/* <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{classe.students?.length || 0} étudiants</span>
          </div> */}
          {/* <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{new Date(classe.).toLocaleDateString()}</span>
          </div> */}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/spaces/classes/${classe.id}?user=${userId}`}>
            <BookOpen className="w-4 h-4 mr-2" />
            Voir la classe
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
