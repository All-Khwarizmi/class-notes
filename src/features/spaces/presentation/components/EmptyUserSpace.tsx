'use client';

import { Button } from '@/core/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import { PlusCircle, Mail, AlertCircle, Eye } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface EmptyUserSpaceProps {
  isOwner: boolean;
  userName: string;
  userEmail?: string;
  contentType: 'classe' | 'séquence' | 'cours' | 'exercice';
}

export default function EmptyUserSpace({
  isOwner,
  userName,
  userEmail,
  contentType,
}: EmptyUserSpaceProps) {
  const contentTypeMap = {
    classe: {
      singular: 'classe',
      plural: 'classes',
      createLink: '/classes/new',
    },
    séquence: {
      singular: 'séquence',
      plural: 'séquences',
      createLink: '/sequences/new',
    },
    cours: {
      singular: 'cours',
      plural: 'cours',
      createLink: '/cours/new',
    },
    exercice: {
      singular: 'exercice',
      plural: 'exercices',
      createLink: '/exercices/new',
    },
  };

  const { singular, plural, createLink } = contentTypeMap[contentType];

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {isOwner
              ? `Vous n'avez pas de ${singular} visible`
              : `${userName} n'a pas de ${singular} visible`}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          {isOwner ? (
            <>
              <p className="text-muted-foreground">
                Vous n&apos;avez pas encore créé de {singular} ou rendu visible
                votre contenu. Commencez par créer{' '}
                {singular === 'classe' ? 'une' : 'un'} {singular} et gérez sa
                visibilité depuis votre tableau de bord.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild>
                  <Link href={createLink}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Créer {singular === 'classe' ? 'une' : 'un'} {singular}
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/dashboard">
                    <Eye className="mr-2 h-4 w-4" />
                    Gérer la visibilité
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-muted-foreground">
                {userName} n&apos;a pas encore rendu de {plural} visible ou
                n&apos;a pas encore créé de {singular}.
              </p>
              <div className="flex flex-col items-center gap-4">
                <AlertCircle
                  className="h-12 w-12 text-yellow-500"
                  aria-hidden="true"
                />
                <p>
                  Si vous pensez qu&apos;il s&apos;agit d&apos;une erreur, vous
                  pouvez contacter {userName} directement.
                </p>
                {userEmail && (
                  <Button asChild>
                    <Link href={`mailto:${userEmail}`}>
                      <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                      Contacter {userName}
                    </Link>
                  </Button>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
