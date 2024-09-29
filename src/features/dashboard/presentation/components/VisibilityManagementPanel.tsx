'use client';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/core/components/ui/alert';
import { Badge } from '@/core/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/core/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/core/components/ui/collapsible';
import { ScrollArea } from '@/core/components/ui/scroll-area';
import { Skeleton } from '@/core/components/ui/skeleton';
import { Switch } from '@/core/components/ui/switch';
import {
  BookOpen,
  BookText,
  Building,
  CheckSquare,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import React, { useState } from 'react';

import { useVisibilityLogic } from '../../application/adapters/services/useVisibilityLogic';

interface VisibilityManagementComponentProps {
  userId: string;
}

export default function VisibilityManagementComponent({
  userId,
}: VisibilityManagementComponentProps) {
  const { visibilityState, isLoading, isError, error, toggleStateVisibility } =
    useVisibilityLogic({ userId });

  if (isLoading) {
    return <VisibilityManagementSkeleton />;
  }

  if (isError && error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Erreur</AlertTitle>
        <AlertDescription>
          Une erreur s&apos;est produite lors de la récupération des données de
          visibilité. {error.message}
        </AlertDescription>
      </Alert>
    );
  }

  if (!visibilityState) {
    return null;
  }

  return (
    <Card className="w-full mt-4">
      <CardHeader>
        <CardTitle>Gestion de la visibilité</CardTitle>
        <CardDescription className="truncate">
          Contrôlez hiérarchiquement la visibilité de votre contenu éducatif.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className=" pr-4 overflow-x-auto">
          {visibilityState.classes.map((item) => (
            <CollapsibleItem
              key={item.id}
              icon={<Building className="h-4 w-4 text-blue-500" />}
              name={item.name}
              description={item.description}
              isPublished={item.publish}
              onToggle={() =>
                toggleStateVisibility({
                  type: 'classe',
                  typeId: item.id,
                  publish: !item.publish,
                })
              }
              type="classe"
            >
              {item.sequences.map((sequence) => (
                <CollapsibleItem
                  key={sequence.id}
                  icon={<BookText className="h-4 w-4 text-green-500" />}
                  name={sequence.name}
                  description={sequence.description}
                  isPublished={sequence.publish}
                  onToggle={() =>
                    toggleStateVisibility({
                      type: 'sequence',
                      typeId: sequence.id,
                      publish: !sequence.publish,
                    })
                  }
                  type="séquence"
                >
                  {sequence.courses.map((course) => (
                    <CollapsibleItem
                      key={course.id}
                      icon={<BookOpen className="h-4 w-4 text-orange-500" />}
                      name={course.name}
                      description={course.description}
                      isPublished={course.publish}
                      onToggle={() =>
                        toggleStateVisibility({
                          type: 'cours',
                          typeId: course.id,
                          publish: !course.publish,
                        })
                      }
                      type="cours"
                    >
                      {course.complements.map((complement) => (
                        <CollapsibleItem
                          key={complement.id}
                          icon={
                            <CheckSquare className="h-4 w-4 text-red-500" />
                          }
                          name={complement.name}
                          description={complement.description}
                          isPublished={complement.publish}
                          onToggle={() =>
                            toggleStateVisibility({
                              type: 'complement',
                              typeId: complement.id,
                              publish: !complement.publish,
                            })
                          }
                          type="complément"
                        />
                      ))}
                    </CollapsibleItem>
                  ))}
                </CollapsibleItem>
              ))}
            </CollapsibleItem>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

interface CollapsibleItemProps {
  icon: React.ReactNode;
  name: string;
  description: string;
  isPublished: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
  type: string;
}

function CollapsibleItem({
  icon,
  name,
  description,
  isPublished,
  onToggle,
  children,
  type,
}: CollapsibleItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="mb-4 border rounded-md p-2"
    >
      <div className="flex items-center justify-between py-2">
        <CollapsibleTrigger className="flex items-center space-x-2 hover:text-primary">
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
          {icon}
          <div>
            <h3 className="text-sm font-medium">{name}</h3>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </CollapsibleTrigger>
        <div className="flex items-center space-x-2">
          <Badge variant={isPublished ? 'default' : 'secondary'}>
            {isPublished ? 'Publié' : 'Non publié'}
          </Badge>
          <Switch
            checked={isPublished}
            onCheckedChange={onToggle}
            aria-label={`Basculer la visibilité de ${name}`}
          />
        </div>
      </div>
      <CollapsibleContent className="mt-2">
        {children && (
          <div className="ml-6 border-l-2 border-muted pl-4 space-y-2">
            {children}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}

function VisibilityManagementSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader>
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-4 w-[300px]" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
