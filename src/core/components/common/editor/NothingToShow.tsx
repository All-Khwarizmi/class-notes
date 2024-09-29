'use client';

import { Button } from '@/core/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import { FrownIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { SUPPORT_EMAIL } from '../../constants/support';

export default function NothingToShow() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex flex-col items-center space-y-4">
            <FrownIcon className="h-16 w-16 text-muted-foreground" />
            <span className="text-2xl font-semibold text-center">
              Désolé, il n&apos;y a rien à afficher ici.
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Il semble que le contenu que vous attendiez n&apos;ait pas encore
            été publié. Veuillez contacter la personne qui vous a fourni ce lien
            pour vous assurer que le contenu souhaité a été rendu disponible.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline" asChild>
            <Link href={`mailto:${SUPPORT_EMAIL}`}>Contacter le support</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
