'use client';

import { useSpacesLayoutContext } from '@/core/components/layout/spaces/SpacesLayoutCtx';
import { AspectRatio } from '@/core/components/ui/aspect-ratio';
import { Badge } from '@/core/components/ui/badge';
import { Button } from '@/core/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import { ClassType } from '@/features/classe/domain/class-schema';
import { NavItem } from '@/lib/types';
import { cn } from '@/lib/utils';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect } from 'react';

interface UserSpaceClasseCardProps {
  classe: ClassType;
  userId: string;
  navItems: NavItem[];
  hostname: string;
}

export default function UserSpaceClasseCard({
  classe,
  userId,
  navItems,
  hostname,
}: UserSpaceClasseCardProps) {
  const { setSpacesNavItems } = useSpacesLayoutContext();

  useEffect(() => {
    if (setSpacesNavItems) {
      setSpacesNavItems(navItems);
    }
  }, [navItems, setSpacesNavItems]);

  return (
    <Card
      className={cn(
        'overflow-hidden',
        'hover:shadow-lg hover:scale-105 transition  duration-300 ease-in-out'
      )}
    >
      <CardHeader className=" object-cover">
        <AspectRatio ratio={16 / 9}>
          <img
            src={
              classe.imageUrl ?? '/images/mos-design-jzFbbG2WXv0-unsplash.jpg'
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
        <Button variant="outline" asChild className="w-full">
          <Link href={`/${hostname}/classes/${classe.id}?user=${userId}`}>
            <BookOpen className="w-4 h-4 mr-2" />
            Voir la classe
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
