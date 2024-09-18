"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/core/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/core/components/ui/collapsible";
import { Switch } from "@/core/components/ui/switch";
import { BookOpen, BookText, Building, CheckSquare } from "lucide-react";
import { useVisibilityLogic } from "../../application/adapters/services/useVisibilityLogic";
import { Skeleton } from "@/core/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/core/components/ui/alert";
import { ScrollArea } from "@/core/components/ui/scroll-area";

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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gestion de la visibilité</CardTitle>
        <CardDescription>
          Contrôlez hiérarchiquement la visibilité de votre contenu éducatif.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[60vh] pr-4">
          {visibilityState.classes.map((item) => (
            <Collapsible key={item.id} className="mb-4">
              <CollapsibleItem
                icon={<Building className="h-4 w-4 text-blue-500" />}
                name={item.name}
                description={item.description}
                isPublished={item.publish}
                onToggle={() =>
                  toggleStateVisibility({
                    type: "classe",
                    typeId: item.id,
                    publish: !item.publish,
                  })
                }
              >
                {item.sequences.map((sequence) => (
                  <Collapsible key={sequence.id} className="ml-4 mt-2">
                    <CollapsibleItem
                      icon={<BookText className="h-4 w-4 text-green-500" />}
                      name={sequence.name}
                      description={sequence.description}
                      isPublished={sequence.publish}
                      onToggle={() =>
                        toggleStateVisibility({
                          type: "sequence",
                          typeId: sequence.id,
                          publish: !sequence.publish,
                        })
                      }
                    >
                      {sequence.courses.map((course) => (
                        <Collapsible key={course.id} className="ml-4 mt-2">
                          <CollapsibleItem
                            icon={
                              <BookOpen className="h-4 w-4 text-orange-500" />
                            }
                            name={course.name}
                            description={course.description}
                            isPublished={course.publish}
                            onToggle={() =>
                              toggleStateVisibility({
                                type: "cours",
                                typeId: course.id,
                                publish: !course.publish,
                              })
                            }
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
                                    type: "complement",
                                    typeId: complement.id,
                                    publish: !complement.publish,
                                  })
                                }
                              />
                            ))}
                          </CollapsibleItem>
                        </Collapsible>
                      ))}
                    </CollapsibleItem>
                  </Collapsible>
                ))}
              </CollapsibleItem>
            </Collapsible>
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
}

function CollapsibleItem({
  icon,
  name,
  description,
  isPublished,
  onToggle,
  children,
}: CollapsibleItemProps) {
  return (
    <>
      <div className="flex items-center justify-between py-2">
        <CollapsibleTrigger className="flex items-center space-x-2 hover:text-primary">
          {icon}
          <div>
            <h3 className="text-sm font-medium">{name}</h3>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </CollapsibleTrigger>
        <Switch
          checked={isPublished}
          onCheckedChange={onToggle}
          aria-label={`Basculer la visibilité de ${name}`}
        />
      </div>
      {children && <CollapsibleContent>{children}</CollapsibleContent>}
    </>
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
